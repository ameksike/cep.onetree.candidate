using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;

namespace webcore.angular.demo.candidate.Services
{
    public class IdentityService : IdentityServiceInterface
    {
        private readonly IConfiguration _configuration;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public IdentityService(
            IConfiguration configuration,
            SignInManager<ApplicationUser> signInManager
        )
        {
            _configuration = configuration;
            _signInManager = signInManager;
        }
        public AccountToken BuildToken(AccountUser User)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, User.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.GetSecretKey()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(7);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: "yourdomain.com",
               audience: "yourdomain.com",
               claims: claims,
               expires: expiration,
               signingCredentials: creds
            );

            return new AccountToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration.ToString()
            };
        }

        public string GetSecretKey()
        {
            return _configuration["APP_SECRET_KEY"];
        }

        public async Task<bool> isValid(AccountUser User)
        {
            var result = await _signInManager.PasswordSignInAsync(User.Email, User.Password, isPersistent: false, lockoutOnFailure: false);
            return result.Succeeded;
        }
    }
}
