using DrivingSchool.Models;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchool.Data
{
    public class DrivingInstructorsContents : DbContext
    {
        public DbSet<DrivingInstructors> DrivingInstructors { get; set; }

        public DrivingInstructorsContents(DbContextOptions<DrivingInstructorsContents> options) : base(options)
        {

        }
    }
}
