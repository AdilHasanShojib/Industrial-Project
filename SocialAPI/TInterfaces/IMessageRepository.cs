using SocialAPI.TEntities;
using SocialAPI.THelpers;

namespace SocialAPI.TInterfaces
{
    public interface IMessageRepository
    {
        void AddMeassage(Message message);
        void DeleteMeassage(Message message);

        Task<Message> GetMeassage(int id);
        Task<PagedList<>> GetMeassagesForUser();



    }
}
