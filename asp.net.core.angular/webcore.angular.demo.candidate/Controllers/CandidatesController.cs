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
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class CandidatesController : AbstractApiController<Candidate, RepositoryInterface<Candidate>>
    {
        public CandidatesController(RepositoryInterface<Candidate> repository) : base(repository)
        {

        }
    }
}