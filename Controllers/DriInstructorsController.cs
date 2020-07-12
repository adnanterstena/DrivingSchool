using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DrivingSchool.Data;
using DrivingSchool.Models;
using Microsoft.AspNetCore.Authorization;

namespace DrivingSchool.Controllers
{
    //Get data with auth (MVSJwtTokens.AuthSchemes)
    [Authorize(AuthenticationSchemes = MVSJwtTokens.AuthSchemes)]
    [Route("api/DrivingInstructors")]
    [ApiController]
    public class DriInstructorsController : ControllerBase
    {
        private readonly DrivingInstructorsContents _context;

        public DriInstructorsController(DrivingInstructorsContents context)
        {
            _context = context;
        }

        // GET: api/DrivingInstructors
        [HttpGet]
        public async Task<IEnumerable<DrivingInstructors>> GetDrivingInstructors()
        {
            return await _context.DrivingInstructors.ToListAsync();
        }      


        // POST: api/DrivingInstructors
        [HttpPost]
        public async Task<object> PostDrivingInstructors([FromBody] DrivingInstructors drivingInstructors)
        {
           
            _context.DrivingInstructors.Add(drivingInstructors);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/DrivingInstructors/5
        [HttpDelete("{id}")]
        public async Task<object> DeleteDrivingInstructors(int id)
        {
            var drivingInstructors = await _context.DrivingInstructors.FindAsync(id);
            if (drivingInstructors == null)
            {
                return NotFound();
            }

            _context.DrivingInstructors.Remove(drivingInstructors);
            await _context.SaveChangesAsync();

            return drivingInstructors;
        }

    }
}
