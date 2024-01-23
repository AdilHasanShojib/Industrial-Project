namespace SocialAPI.TInterfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ILikesRepository LikesRepository { get; }

        IMessageRepository MessageRepository { get; }

        IPhotoRepository PhotoRepository { get; }

        Task<bool> Complete();
    }
}
