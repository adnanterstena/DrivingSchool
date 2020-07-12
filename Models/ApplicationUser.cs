using Microsoft.AspNetCore.Identity;

namespace DrivingSchool.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base() { }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
}
