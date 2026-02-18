import { useState } from "react"
import dayjs from "dayjs"
import { Chatbot } from 'supersimpledev'
import LoadingSpinnerGif from '../assets/loading-spinner.gif'

function ChatInput({ chatMessages, setChatMessage }) {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }
    function clearMessages() {
        setChatMessage([]);
        localStorage.setItem("messages", JSON.stringify([]));
    }

    function enterKeyCheck(event) {
        if (event.key == "Enter") {
        sendMessage();
        }
        if (event.key == "Escape") {
        setInputText("");
        }
    }

    async function sendMessage() {
        if (inputText !== "" && isLoading == false) {
        const greetingRegex = /^(h+i+|hey|hello|hyy+)$/i;
        if (greetingRegex.test(inputText.trim())) {
            const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                timestamp: dayjs().valueOf(),
                id: crypto.randomUUID(),
            },
            ];

            setChatMessage(newChatMessages);
            setInputText("");
            setChatMessage([
            ...newChatMessages,
            {
                message: (
                <img
                    src={LoadingSpinnerGif}
                    alt="loading-spinner"
                    className="loading-spinner"
                />
                ),
                sender: "robot",
                id: crypto.randomUUID(),
            },
            ]);
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setChatMessage([
            ...newChatMessages,
            {
                message: "Hello! How can I help you?",
                sender: "robot",
                timestamp: dayjs().valueOf(),
                id: crypto.randomUUID(),
            },
            ]);
            setIsLoading(false);
        } else {
            const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                timestamp: dayjs().valueOf(),
                id: crypto.randomUUID(),
            },
            ];

            setChatMessage(newChatMessages);
            setInputText("");

            setChatMessage([
            ...newChatMessages,
            {
                message: (
                <img
                    src={LoadingSpinnerGif}
                    alt="loading-spinner"
                    className="loading-spinner"
                />
                ),
                sender: "robot",
                id: crypto.randomUUID(),
            },
            ]);
            setIsLoading(true);
            const response = await Chatbot.getResponseAsync(inputText);
            setChatMessage([
            ...newChatMessages,
            {
                message: response,
                sender: "robot",
                timestamp: dayjs().valueOf(),
                id: crypto.randomUUID(),
            },
            ]);
            setIsLoading(false);
        }
        }
    }
    return (
        <div className="chat-input-container">
        <input
            type="text"
            placeholder="Send a message"
            size="30"
            onChange={saveInputText}
            onKeyDown={enterKeyCheck}
            value={inputText}
            className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
            Send
        </button>
        <button onClick={clearMessages} className="clear-button">
            Clear
        </button>
        </div>
    );
}

export default ChatInput