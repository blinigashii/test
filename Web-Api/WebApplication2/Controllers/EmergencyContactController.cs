using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmergencyContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmergencyContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select ROW_ID, FIRST_NAME , LAST_NAME ,ADDRESS, EMAIL,PHONE_NUMBER,RELATION,EMPLOYEE_ID from dbo.EMERGENCY_CONTACT";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(EmergencyContact ev)
        {
            string query = @"
                    insert into dbo.EMERGENCY_CONTACT values 
                    ('" + ev.FirstName+ @"'
                    ,'" + ev.LastName + @"'
                    ,'" + ev.Address + @"'
                    ,'" + ev.Email + @"'
                    ,'" + ev.PhoneNumber + @"'
                    ,'" + ev.Relation + @"'
                     ,'" + ev.EmployeeId + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(EmergencyContact ev)
        {
            string query = @"
                    update dbo.EMERGENCY_CONTACT  set 
                    FIRST_NAME = '" + ev.FirstName + @"',
                    LAST_NAME = '" + ev.LastName + @"',
                    ADDRESS = '" + ev.Address + @"',
                    EMAIL = '" + ev.Email + @"',
                    PHONE_NUMBER = '" + ev.PhoneNumber + @"',
                    RELATION = '" + ev.Relation + @"',
                    EMPLOYEE_ID = '" + ev.EmployeeId + @"'
                    where ROW_ID = " + ev.RowId + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.EMERGENCY_CONTACT
                    where ROW_ID = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                { 
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
