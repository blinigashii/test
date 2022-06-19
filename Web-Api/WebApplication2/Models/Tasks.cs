using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class Tasks
    {
     public int TaskId { get; set; }
     public string Task { get; set; }
     public string TaskType { get; set; }
     public string DueDate { get; set; }
     public string InsertDate { get; set; }
     public string Status { get; set; }
     public string EmployeeId { get; set; }  
    }
}