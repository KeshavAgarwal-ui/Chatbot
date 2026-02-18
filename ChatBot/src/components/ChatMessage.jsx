import dayjs from 'dayjs'
import RobotImage from '../assets/robot.png'
import UserImage from '../assets/user.png'

function ChatMessage({ message, sender, timestamp }) {

        return (
          <div
            className={
              sender === "user" ? "chat-message-user" : "chat-message-robot"
            }
          >
            {sender === "robot" && (
              <img
                src={RobotImage}
                alt="robot profile image"
                className="chat-message-profile"
              />
            )}
            <div className="chat-message-text">
              {message}
              <span className="chat-time">
                {dayjs(timestamp).format("h:mma")}
              </span>
            </div>
            {sender === "user" && (
              <img
                src={UserImage}
                alt="user profile image"
                className="chat-message-profile"
              />
            )}
          </div>
        );
      }

export default ChatMessage