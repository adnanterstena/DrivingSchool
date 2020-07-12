using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace DrivingSchool.Models
{
    public class MVSJwtTokens
    {
        public const string Issuer = "MVS";
        public const string Audience = "http://localhost:3000";
        public const string key = "1234567890123456"; //must have more than 16 characters

        public const string AuthSchemes = "Identity.Application" + "," + JwtBearerDefaults.AuthenticationScheme;
    }
}
