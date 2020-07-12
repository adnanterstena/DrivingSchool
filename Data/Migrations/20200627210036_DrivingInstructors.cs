using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DrivingSchool.Data.Migrations
{
    public partial class DrivingInstructors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DrivingInstructors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Characteristics = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    PostDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrivingInstructors", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrivingInstructors");
        }
    }
}
