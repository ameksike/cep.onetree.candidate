using Microsoft.EntityFrameworkCore.Migrations;

namespace webcore.angular.demo.candidate.Migrations
{
    public partial class RefactoringCandidateModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CandidateId",
                table: "Candidate",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Candidate",
                newName: "CandidateId");
        }
    }
}
