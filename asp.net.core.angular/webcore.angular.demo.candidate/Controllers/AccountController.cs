using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webcore.angular.demo.candidate.Models;
using webcore.angular.demo.candidate.Services;

namespace webcore.angular.demo.candidate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IdentityServiceInterface _identityService;
        private readonly AccountServiceInterface _accountService;

        public AccountController(
            IdentityServiceInterface identityService,
            AccountServiceInterface accountService
        )
        {
            _accountService = accountService;
            _identityService = identityService;
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] AccountUser model)
        {
            if (ModelState.IsValid)
            {
                if ( await _accountService.Create(model) )
                {
                    return Ok(_identityService.BuildToken(model)); 
                }
                else
                {
                    return BadRequest("Username or password invalid");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}