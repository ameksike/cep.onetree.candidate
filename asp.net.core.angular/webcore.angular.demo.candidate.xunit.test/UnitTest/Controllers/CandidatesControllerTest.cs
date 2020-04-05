using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using webcore.angular.demo.candidate.Controllers;
using webcore.angular.demo.candidate.Models;
using webcore.angular.demo.candidate.Models.Repository;
using Xunit;

namespace webcore.angular.demo.candidate.xunit.test.UnitTest.Controllers
{
    public delegate void MySelect(int x);
    public class CandidatesControllerTest
    {
        private CandidatesController _controller;
        private List<Candidate> _list;

        public CandidatesControllerTest()
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
        
        [Fact]
        public async Task GetAllCandidates()
        {
            // Arrange  
            var _moqCandidateRepository = new Mock<RepositoryInterface<Candidate>>();
            _moqCandidateRepository.Setup(o => o.List()).ReturnsAsync(_list);
            _controller = new CandidatesController(_moqCandidateRepository.Object);

            // Act
            var result = await _controller.Get();

            // Assert                   
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<Candidate>>(okResult.Value);
            Assert.Equal("Luis", returnValue[0].Firstname);
            Assert.Equal(5, returnValue.Count);
        }

        [Fact]
        public async Task GetCandidateById()
        {
            // Arrange  
            var index = 4;
            var _moqCandidateRepository = new Mock<RepositoryInterface<Candidate>>();
            _moqCandidateRepository.Setup(o => o.Select(index)).ReturnsAsync(_list[index-1]);

            _controller = new CandidatesController(_moqCandidateRepository.Object);

            // Act
            var result = await _controller.Get(index);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Candidate>(okResult.Value);
            Assert.Equal("Mary", returnValue.Firstname);
        }


        [Fact]
        public async Task DeleteCandidateById()
        {
            // Arrange  
            var _index = 3;
            var _moqCandidateRepository = new Mock<RepositoryInterface<Candidate>>();
            _moqCandidateRepository.Setup(o => o.List()).ReturnsAsync(_list);
            _moqCandidateRepository.Setup(o => o.Delete(_index)).ReturnsAsync( () => {
                var entity = (from x in _list where x.Id == _index select x).ToList().FirstOrDefault();
                if (!_list.Remove(entity))
                    return null;
                return entity;                
            });
            _controller = new CandidatesController(_moqCandidateRepository.Object);

            // Act
            var result = await _controller.Delete(_index);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Candidate>(okResult.Value);
            Assert.NotNull(returnValue);
            Assert.Equal("Mirta", returnValue.Firstname);
            Assert.Equal(4, _list.Count);
        }

        [Fact]
        public async Task CreateCandidate()
        {
            // Arrange  
            var _entity = new Candidate() { Firstname = "Julia", Lastname = "Perez", Experience = 3, Position = "Des", Date = new DateTime(2015, 3, 10, 2, 15, 10), Avatar = "" };
            var _moqCandidateRepository = new Mock<RepositoryInterface<Candidate>>();
            _moqCandidateRepository.Setup(o => o.List()).ReturnsAsync(_list);
            _moqCandidateRepository.Setup(o => o.Create(_entity)).ReturnsAsync(() => {
                _entity.Id = _list.Count;
                _list.Add(_entity);
                return _entity;
            });
            _controller = new CandidatesController(_moqCandidateRepository.Object);

            // Act
            var result = await _controller.Post(_entity);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Candidate>(okResult.Value);
            Assert.NotNull(returnValue);
            Assert.Equal("Julia", returnValue.Firstname);
            Assert.Equal(6, _list.Count);
        }


        [Fact]
        public async Task UpdateCandidateById()
        {
            // Arrange  
            var _index  = 5;
            var _entity = new Candidate() { Id=_index, Firstname = "Tatiana", Lastname = "Perez", Experience = 3, Position = "Des", Date = new DateTime(2015, 3, 10, 2, 15, 10), Avatar = "" };
            var _moqCandidateRepository = new Mock<RepositoryInterface<Candidate>>();
            _moqCandidateRepository.Setup(o => o.List()).ReturnsAsync(_list);
            _moqCandidateRepository.Setup(o => o.Update(_entity)).ReturnsAsync(() => {
                var pos = _list.IndexOf(_list.Where(i => i.Id == _entity.Id).First());
                if (pos == -1) return null;
                _list[pos] = _entity;
                return _entity;
            });
            _controller = new CandidatesController(_moqCandidateRepository.Object);

            // Act
            var result = await _controller.Put(_index, _entity);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Candidate>(okResult.Value);
            Assert.NotNull(returnValue);
            Assert.Equal("Tatiana", returnValue.Firstname);
            Assert.Equal(_list[4].Position, returnValue.Position);
            Assert.Equal(_list[4].Firstname, returnValue.Firstname);
        }
    }
}
