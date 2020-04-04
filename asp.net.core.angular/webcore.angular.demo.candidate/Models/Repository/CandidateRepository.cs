using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webcore.angular.demo.candidate.Models.Repository
{
    public class CandidateRepository : RepositoryAbstract<Candidate, ApplicationDbContext>
    {
        public CandidateRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
