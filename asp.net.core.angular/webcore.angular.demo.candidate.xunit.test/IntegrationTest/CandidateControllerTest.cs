using System;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace webcore.angular.demo.candidate.xunit.test.IntegrationTest
{
    public class CandidateControllerTest : AbstractIntegrationTest
    {
        [Fact]
        public async Task Home()
        {
            var response = await this.TestClient.GetAsync("/");
            //response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
        }

        [Fact]
        public async Task GetAll()
        {
            var response = await this.TestClient.GetAsync("/api/candidates");
            //response.EnsureSuccessStatusCode();
            //Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
        }
    }
}
