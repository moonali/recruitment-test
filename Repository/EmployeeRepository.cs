using InterviewTest.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Repository
{
    
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DatabaseContext _context;
        public EmployeeRepository(DatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<object> GetEmployee()
        {
            List<Employee> query = (from e in _context.Employees
                                         orderby e.Id descending
                                         select e).ToList();
            for (int i = 0; i < query.Count; i++)
            {
                if (query[i].Name.StartsWith('E'))
                {
                    query[i].Value = (query[i].Value + 1);
                }
                else if (query[i].Name.StartsWith('G'))
                {
                    query[i].Value = (query[i].Value + 10);
                }
                else
                {
                    query[i].Value = (query[i].Value + 100);
                }

            }

            return query;
        }
        public Employee GetEmployeeByID(int Id)
        {
            return _context.Employees.Find(Id);
        }

        public void InsertEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
           
        }  

        public void UpdateEmployee(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
        }
        public void DeleteEmployee(int Id)
        {
            var DeleteEmp = _context.Employees.Find(Id);
            _context.Employees.Remove(DeleteEmp);
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
