using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DrivingSchool.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DrivingSchool.Controllers
{

    [ApiController]
    [Route("identity/")]
    public class IdentityController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public IdentityController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        //Register
        [Route("Register")]
        [HttpPost]
        public async Task<Object> RegisterAsync(string emailAdd, string pass)
        {

            var user = new ApplicationUser { UserName = emailAdd, Email = emailAdd };
            var result = await _userManager.CreateAsync(user, pass);

            if (result.Succeeded)
            {
                return await SignInAsync(new UserLogin { emailAdd = emailAdd, pass = pass }) ;
            }
            else
            {
                return BadRequest();
            }
        }
  

        //To get token
        [Route("SignIn")]
        [HttpPost]
        public async Task<Object> SignInAsync([FromBody] UserLogin userL)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(userL.emailAdd);
            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, userL.pass, false);

            if (signInResult.Succeeded)
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(MVSJwtTokens.key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.Email)
                };

                var token = new JwtSecurityToken(
                        MVSJwtTokens.Issuer,
                        MVSJwtTokens.Audience,
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: creds
                    );

           

                var results = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                };

                return results;
            }
            return BadRequest();
        }           

    }
}
