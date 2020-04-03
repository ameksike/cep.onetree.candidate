using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;

namespace webcore.angular.demo.candidate.Services
{
    public class AccountService: AccountServiceInterface
    {

        private readonly IdentityServiceInterface _identityService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountService(IdentityServiceInterface identityService, UserManager<ApplicationUser> userManager)
        {
            _identityService = identityService;
            _userManager = userManager;
        }

        public async Task<bool> Create(AccountUser model) {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            return result.Succeeded;
        }

        public Task<bool> Delete(AccountUser model)
        {
            throw new NotImplementedException();
        }

        public Task<List<AccountUser>> List()
        {
            throw new NotImplementedException();
        }

        public Task<AccountUser> Select(AccountUser model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(AccountUser model)
        {
            throw new NotImplementedException();
        }
    }
}
