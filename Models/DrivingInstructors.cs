using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingSchool.Models
{
    [Table("DrivingInstructors")]
    public class DrivingInstructors
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Surname { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string Characteristics { get; set; }

        [DisplayName("Post Date")]
        [DataType(DataType.DateTime)]
        public DateTime PostDate { get; set; }


    }
}
