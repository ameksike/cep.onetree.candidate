using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace webcore.angular.demo.candidate.xunit.test.IntegrationTest
{
    public abstract class AbstractIntegrationTest
    {
        public HttpClient TestClient { get; set; }
        public AbstractIntegrationTest()
        {
            var server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            this.TestClient = server.CreateClient();
        }
    }
}
