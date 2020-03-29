using Microsoft.EntityFrameworkCore.Migrations;

namespace webcore.angular.demo.candidate.Migrations
{
    public partial class CandidateAddFieldAvatar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Candidate",
                type: "varchar(200)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Candidate");
        }
    }
}
