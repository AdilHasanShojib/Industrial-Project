namespace SocialAPI.TInterfaces
{
    public interface IUnitOfWork
    {

        IUserRepository UserRepository { get; }

        ILikesRepository LikesRepository { get; }
        IMessageRepository MessageRepository { get; }
        Task<bool> Complete();





    }
}
