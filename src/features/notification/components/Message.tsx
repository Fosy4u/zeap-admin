//import '../style/message.css';

const Message = ({
  notification,
}: {
  notification: {
    image: string;
    title: string;
    body: string;
  };
}) => {
  return (
    <div className="flex w-full flex-col gap-2 z-999999">
      <div className="flex gap-2">
        {/* image is optional */}
        {notification.image && (
          <div>
            <img
              src={notification.image}
              alt="Notification"
              className="w-6 h-6 rounded-full"
            />
          </div>
        )}
        <span className="font-semibold">{notification.title}</span>
      </div>
      <div className="text-sm">{notification.body}</div>
    </div>
  );
};

export default Message;
