using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using Bandhan.Models;

namespace Bandhan.DTOs
{
    public class RegisterDto
    {
        [Required] public string Name { get; set; }
        [Required] public string Location { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        [Required] public string Caste { get; set; }
        [Required]
        public string Mobile { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public string Occupation { get; set; }
        public double Income { get; set; }
        [Required] public string MaritialStatus { get; set; }
        [Required] public string Religion { get; set; }
        [Required][EmailAddress] public string Email { get; set; }
        [Required][DataType(DataType.Password)] public string Password { get; set; }

        public string Role { get; set; } = "User";

        public string? TransactionId { get; set; }
        public string? PaymentStatus { get; set; }

        public String Photo { get; set; }
    }
}
