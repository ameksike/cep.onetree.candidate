using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;

namespace webcore.angular.demo.candidate.Services
{
    public interface AccountServiceInterface
    {
        Task<bool> Create(AccountUser model);
        Task<bool> Update(AccountUser model);
        Task<bool> Delete(AccountUser model);
        Task<AccountUser> Select(AccountUser model);
        Task<List<AccountUser>> List();
    }
}
