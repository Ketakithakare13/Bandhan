using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Bandhan.Models
{
    public class RegisterModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public int Age => DateTime.Today.Year - DateOfBirth.Year; // Auto-calculated age

        [Required]
        public string Caste { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public string Occupation { get; set; }

        public double Income{ get; set; }

        [Required]
        public string Photo { get; set; }

        [Required]
        public string Mobile { get; set; }


        public string TransactionId { get; set; }  // New Column

        public string PaymentStatus { get; set; }

        [Required]
        public MaritialStatus MaritialStatus { get; set; }

        [Required]
        public Religion Religion { get; set; }
        //public string Role { get; internal set; }
    }

    public enum MaritialStatus
    {
        Single,
        Married,
        Divorced,
        Widowed
    }

    public enum Gender
    {
        MALE,
        FEMALE,
        Other
    }

    public enum Religion
    {
        Hindu,
        Muslim,
        Christian,
        Sikh,
        Buddhist,
        Jain,
        Other
    }
}
