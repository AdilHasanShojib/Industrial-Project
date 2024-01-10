using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.TData
{
    public class MessageRepository : IMessageRepository
    {
        private readonly TDataContext _dataContext;
        private readonly IMapper _mapper;

        public MessageRepository(TDataContext dataContext, IMapper mapper)
        {
           _dataContext = dataContext;
            _mapper = mapper;
        }
        public void AddMessage(Message message)
        {
           _dataContext.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _dataContext.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
           return await _dataContext.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _dataContext.Messages.OrderByDescending(x => x.MessageSent).AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(x => x.RecipientUsername == messageParams.Username && x.RecipientDeleted == false),
                "Outbox" => query.Where(x => x.SenderUsername == messageParams.Username && x.SenderDeleted == false),
                _ => query.Where(x => x.RecipientUsername == messageParams.Username && x.RecipientDeleted == false && x.DateRead == null)
            };
            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
            return await PagedList<MessageDto>.CreatePagedAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
        {

            var messageQuery = await _dataContext.Messages
                                        .Include(x=> x.Sender).ThenInclude(x => x.Photos)
                                        .Include(x => x.Recipient).ThenInclude(x => x.Photos)
                                        .Where(x => x.RecipientUsername == currentUsername && x.RecipientDeleted == false &&
                                                        x.SenderUsername == recipientUsername || x.RecipientUsername == recipientUsername &&
                                                        x.SenderDeleted == false && x.SenderUsername == currentUsername)
                                               .OrderBy(x => x.MessageSent).ToListAsync();

            var unreadMessage = messageQuery.Where(x => x.DateRead == null && x.RecipientUsername == currentUsername).ToList();

            if(unreadMessage.Any())
            {
                foreach (var message in unreadMessage)
                {
                    message.DateRead = DateTime.UtcNow;
                }
                await _dataContext.SaveChangesAsync();
            }
            return _mapper.Map<IEnumerable<MessageDto>>(messageQuery);
            //return await query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).ToListAsync();

        }
    }
}
