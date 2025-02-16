using Bandhan.Models;
using Bandhan.Repository;

using Bandhan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Bandhan.DTOs;

namespace BandhanApp.Controllers
{
    [Route("api/messages")]
    [ApiController]
    [Authorize] // Requires authentication
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public MessageController(IMessageRepository messageRepository, UserManager<ApplicationUser> userManager)
        {
            _messageRepository = messageRepository;
            _userManager = userManager;
        }

        // ✅ Send a new message
        //[HttpPost("send")]
        //public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
        //{
        //    var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get logged-in user ID

        //    if (senderId == null || string.IsNullOrEmpty(request.ReceiverId) || string.IsNullOrEmpty(request.Content))
        //    {
        //        return BadRequest("Invalid data.");
        //    }

        //    var message = new Messages
        //    {
        //        SenderId = senderId,
        //        ReceiverId = request.ReceiverId,
        //        Content = request.Content,
        //        SentAt = DateTime.UtcNow
        //    };

        //    await _messageRepository.InsertAsync(message);

        //    return Ok(new { message = "Message sent successfully" });
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] Messages message)
        {
            if (message == null || string.IsNullOrEmpty(message.SenderId) || string.IsNullOrEmpty(message.ReceiverId))
            {
                return BadRequest("Sender and Receiver IDs are required.");
            }

            try
            {
                await _messageRepository.InsertAsync(message);
                return Ok(new { message = "Message sent successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpGet("sent/{senderId}")]
        public async Task<IActionResult> GetSentMessages(string senderId)
        {
            var messages = await _messageRepository.GetAllSentMessagesAsync(senderId);
            return Ok(messages);
        }

        [HttpGet("received/{receiverId}")]
        public async Task<IActionResult> GetReceivedMessages(string receiverId)
        {
            var messages = await _messageRepository.GetAllReceivedMessagesAsync(receiverId);
            return Ok(messages);
        }

        // ✅ Get chat history between two users
        [HttpGet("chat/{receiverId}")]
        public async Task<IActionResult> GetChatHistory(string receiverId)
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get logged-in user ID

            if (senderId == null || string.IsNullOrEmpty(receiverId))
            {
                return BadRequest("Invalid data.");
            }

            var messages = await _messageRepository.GetChatHistoryAsync(senderId, receiverId);

            var mappedMessages = new List<ChatMessageResponse>();

            foreach (var msg in messages)
            {
                mappedMessages.Add(new ChatMessageResponse
                {
                    Content = msg.Content,
                    SentAt = msg.SentAt,
                    Sender = msg.SenderId == senderId ? "You" : "Them"
                });
            }

            return Ok(mappedMessages);
        }
    }
}
