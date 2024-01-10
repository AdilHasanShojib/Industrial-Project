using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SocialAPI.TDto;
using SocialAPI.TEntities;
using SocialAPI.TExtensions;
using SocialAPI.THelpers;
using SocialAPI.TInterfaces;

namespace SocialAPI.Controllers
{
    public class MessagesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MessagesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUserName();
            var messages = await _unitOfWork.MessageRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));
            return Ok(messages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser(string username)
        {
            var currentUsername = User.GetUserName();

            return Ok(await _unitOfWork.MessageRepository.GetMessageThread(currentUsername, username));
        }

        [HttpPost]
        public async Task<ActionResult<PagedList<MessageDto>>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUserName();
            if (username.ToLower() == createMessageDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send message to yourself");
            var sender = await _unitOfWork.UserRepository.GetUserByNameAsync(username);
            var recipient = await _unitOfWork.UserRepository.GetUserByNameAsync(createMessageDto.RecipientUsername);
            if (recipient == null) return NotFound();
            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content,
            };
            _unitOfWork.MessageRepository.AddMessage(message);
            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<MessageDto>(message));
            return BadRequest("Failed to send message");
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUserName();
            var message = await _unitOfWork.MessageRepository.GetMessage(id);

            if (message.SenderUsername != username && message.RecipientUsername != username)
            {
                return Unauthorized();
            }

            if (message.SenderUsername == username) message.SenderDeleted = true;
            if (message.RecipientUsername == username) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted)
            {
                _unitOfWork.MessageRepository.DeleteMessage(message);
            }
            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting the message");
        }


    }
}
