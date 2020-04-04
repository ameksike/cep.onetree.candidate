﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webcore.angular.demo.candidate.Models.Repository
{
    public interface RepositoryInterface<T> where T : class, EntityInterface
    {
        Task<List<T>> List();
        Task<T> Select(int id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
        bool Exists(int id);
    }
}
