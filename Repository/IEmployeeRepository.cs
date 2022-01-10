using InterviewTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Repository
{
   public interface IEmployeeRepository
    {
        IEnumerable<object> GetEmployee();
        Employee GetEmployeeByID(int Id);
        void InsertEmployee(Employee employee);
        void DeleteEmployee(int Id);
        void UpdateEmployee(Employee employee);
        Task Save();
    }
}
