using System.ComponentModel.DataAnnotations;

namespace Bandhan.DTOs
{
    public class SendMessageRequest
    {
        [Required]
        public string Content { get; set; }

        [Required]
        public string ReceiverId { get; set; }
        [Required]
        public string SenderId { get; set; }
    }

    public class ChatMessageResponse
    {
        public string Content { get; set; }
        public string Sender { get; set; }
        public DateTime SentAt { get; set; }
    }
}
