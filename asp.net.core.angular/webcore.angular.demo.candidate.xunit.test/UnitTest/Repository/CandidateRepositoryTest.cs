using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Models;
using webcore.angular.demo.candidate.Models.Repository;
using Xunit;

namespace webcore.angular.demo.candidate.xunit.test.UnitTest.Repository
{
    public class CandidateRepositoryTest
    {
        private List<Candidate> _list;
        public CandidateRepositoryTest()
        {
            _list = new List<Candidate>()
            {
                new Candidate(){ Id=1, Firstname="Luis",  Lastname="Perez",  Experience=9, Position="Dev", Date= new DateTime(2015, 3, 10, 2, 15, 10), Avatar=""  },
                new Candidate(){ Id=2, Firstname="Juan",  Lastname="Perez",  Experience=1, Position="Dev", Date= new DateTime(2015, 3, 10, 2, 15, 10), Avatar=""  },
                new Candidate(){ Id=3, Firstname="Mirta", Lastname="Perez",  Experience=3, Position="Dev", Date= new DateTime(2015, 3, 10, 2, 15, 10), Avatar="" },
                new Candidate(){ Id=4, Firstname="Mary",  Lastname="Diesmo", Experience=5, Position="Dev", Date= new DateTime(2015, 3, 10, 2, 15, 10), Avatar="" },
                new Candidate(){ Id=5, Firstname="Meli",  Lastname="Rosal",  Experience=5, Position="Dev", Date= new DateTime(2015, 3, 10, 2, 15, 10), Avatar="" }
            };

            
        }

        private ApplicationDbContext NewDbContext(string dbname="")
        {
            dbname = (String.IsNullOrEmpty(dbname)) ? Guid.NewGuid().ToString() : dbname;

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: dbname)
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                .EnableSensitiveDataLogging(true)
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task EmptyListCandidates()
        {
            using (var _dbContext = NewDbContext())
            {
                // Arrange 
                var _target = new CandidateRepository(_dbContext);

                // Act
                var response = await _target.List();

                // Assert
                Assert.NotNull(response);
                Assert.Empty(response);
            }
        }


        [Fact]
        public async Task NoEmptyListCandidates()
        {
            using (var _dbContext = NewDbContext())
            {
                // Arrange 
                _dbContext.AddRange(_list);
                await _dbContext.SaveChangesAsync();
                var _target = new CandidateRepository(_dbContext);

                // Act
                var response = await _target.List();

                // Assert
                Assert.NotNull(response);
                Assert.Equal(5, response.Count);
            }
        }


        [Fact]
        public async Task AddCandidates()
        {
            using (var _dbContext = NewDbContext())
            {
                // Arrange 
                var _target = new CandidateRepository(_dbContext);

                // Act
                var response = await _target.Create(new Candidate() { Firstname = "Luis", Lastname = "Perez", Experience = 9, Position = "Dev", Date = new DateTime(2015, 3, 10, 2, 15, 10), Avatar = "" });

                // Assert
                Assert.NotNull(response);
                Assert.Single(await _target.List());
                Assert.Equal("Luis", response.Firstname);
            }
        }

        [Fact]
        public async Task DeleteCandidates()
        {
            using (var _dbContext = NewDbContext())
            {
                // Arrange  
                _dbContext.AddRange(_list);
                await _dbContext.SaveChangesAsync();
                var _target = new CandidateRepository(_dbContext);

                // Act
                var entity = await _target.Delete(2);
                var response = await _target.List();

                // Assert
                Assert.NotNull(response);
                Assert.Equal("Juan", entity.Firstname);
                Assert.Equal(4, response.Count);
            }            
        }

        [Fact]
        public async Task UpdateCandidates()
        {
            using (var _dbContext = NewDbContext())
            {
                // Arrange  
                _dbContext.AddRange(_list);
                await _dbContext.SaveChangesAsync();
                var _target = new CandidateRepository(_dbContext);

                // Act
                var entity = await _target.Update(new Candidate() { Id = 5, Firstname = "Lucia", Lastname = "Perez", Experience = 3, Position = "Dis", Date = new DateTime(2015, 3, 10, 2, 15, 10), Avatar = "" });
                var response = await _target.List();

                // Assert
                Assert.NotNull(response);
                Assert.Equal(entity.Firstname, response[2].Firstname);
                Assert.Equal("Lucia", response[2].Firstname);
                Assert.Equal("Dis", response[2].Position);
            }
        }
    }
}
