using InterviewTest.Model;
using InterviewTest.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesCrudController : Controller
    {
        private readonly IEmployeeRepository employeeRepository;

        public EmployeesCrudController(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }
        [Route("employee")]
        [HttpGet]
        public JsonResult Get()
        {
            return Json(employeeRepository.GetEmployee());
        }
        [Route("employee")]
        [HttpPost("authenticate")]
        public async Task<ActionResult<Employee>> Post([FromBody] Employee employee)
        {
            employeeRepository.InsertEmployee(employee);
            await employeeRepository.Save();

            return Ok();
        }
        [Route("employee/{id}")]
        [HttpGet]
        public JsonResult GetById(int Id)
        {
            return Json(employeeRepository.GetEmployeeByID(Id));
        }
        
        [Route("employee/{id}")]
        [HttpDelete("{id}")]
        public void Delete(int Id){
            employeeRepository.DeleteEmployee(Id);
            employeeRepository.Save();
        }
        [Route("employeeUpdate/{id}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            employeeRepository.UpdateEmployee(employee);
            await  employeeRepository.Save();
            return NoContent();
        }

    }
}
