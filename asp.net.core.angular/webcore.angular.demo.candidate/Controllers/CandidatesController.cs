using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webcore.angular.demo.candidate.Models;
using webcore.angular.demo.candidate.Models.Repository;

namespace webcore.angular.demo.candidate.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class CandidatesController : AbstractApiController<Candidate, CandidateRepository>
    {
        public CandidatesController(CandidateRepository repository) : base(repository)
        {

        }
    }
}