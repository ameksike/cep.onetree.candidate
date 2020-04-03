using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;

namespace webcore.angular.demo.candidate.Services
{
    public interface IdentityServiceInterface
    {

        string GetSecretKey();
        AccountToken BuildToken(AccountUser User);
        Task<bool> isValid(AccountUser User);

    }
}
