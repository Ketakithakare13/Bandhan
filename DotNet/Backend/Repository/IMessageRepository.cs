using Bandhan.Models;

namespace Bandhan.Repository
{
    public interface IMessageRepository
    {
        Task InsertAsync(Messages message);
        Task<List<Messages>> GetChatHistoryAsync(string user1Id, string user2Id);
        Task<List<Messages>> GetAllSentMessagesAsync(string senderId);
        Task<List<Messages>> GetAllReceivedMessagesAsync(string receiverId);
    }
}
