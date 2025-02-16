using Bandhan.Data;
using Bandhan.Models;
using Microsoft.EntityFrameworkCore;

namespace Bandhan.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ApplicationDbContext _context;

        public MessageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task InsertAsync(Messages message)
        {
            try
            {
                // 🔹 Debugging: Check if Sender and Receiver exist in DB
                var senderExists = await _context.Users.AnyAsync(u => u.Id == message.SenderId);
                var receiverExists = await _context.Users.AnyAsync(u => u.Id == message.ReceiverId);

                if (!senderExists)
                    throw new Exception($"Sender ID '{message.SenderId}' does NOT exist!");

                if (!receiverExists)
                    throw new Exception($"Receiver ID '{message.ReceiverId}' does NOT exist!");

                _context.Messages.Add(message);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR while inserting message: " + ex.Message);
                throw;
            }
        }


        public async Task<List<Messages>> GetChatHistoryAsync(string user1Id, string user2Id)
        {
            return await _context.Set<Messages>()
                .Where(m => (m.SenderId == user1Id && m.ReceiverId == user2Id) ||
                            (m.SenderId == user2Id && m.ReceiverId == user1Id))
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<List<Messages>> GetAllSentMessagesAsync(string senderId)
        {
            return await _context.Messages
                .Where(m => m.SenderId == senderId)
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<List<Messages>> GetAllReceivedMessagesAsync(string receiverId)
        {
            return await _context.Messages
                .Where(m => m.ReceiverId == receiverId)
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
        }
    }
}
