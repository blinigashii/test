using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class Holidays
    {
        public int HolidayId { get; set; }
        public string HolidayName { get; set; }
        public string HolidayStartDate { get; set; }
        public string HolidayEndDate { get; set; }
    }
}