// Chatroom.js
import React, { useEffect, useState, useRef } from "react";

const ChatRoom = ({ chatroomId, baseApiUrl, chatRoomName }) => {
  const [allMessagesForThisRoom, setAllMessagesForThisRoom] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [messageText, setMessageText] = useState(""); // Add state for message input
  const userId = localStorage.getItem("pch-id");
  useEffect(() => {
    const fetchMessagesForChatroom = async () => {
      try {
        const response = await fetch(
          `${baseApiUrl}api/messages/room/${chatroomId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAllMessagesForThisRoom(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    setTimeout(() => {
      fetchMessagesForChatroom();
    }, 1000);
  }, [chatroomId, allMessagesForThisRoom]);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await fetch(
          `${baseApiUrl}api/messages/room/${chatroomId}/users`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAllUserInfo(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchUserImages();
  }, []);

  const scrollChatToBottom = () => {
    // Scroll chat to bottom on load and when new messages arrive in the chat container div
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.scrollBehavior = "smooth"; // Add smooth scrolling
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  // Scroll to the bottom on load and when new messages arrive in the chat container div
  useEffect(() => {
    scrollChatToBottom();
  }, [allMessagesForThisRoom.length]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(
        `${baseApiUrl}api/messages/room/${chatroomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: messageText,
            roomId: chatroomId,
            userId: userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setMessageText(""); // Clear message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div className="max-w-2xl rounded-2xl bg-violet-100 pl-0 mx-auto h-screen flex flex-col">
        <div className="bg-slate-600 flex justify-center items-center h-[4rem] rounded-t-2xl">
          <div className="bg-violet-400 w-fit text-white rounded-xl py-2 px-4 text-lg">
            {chatRoomName}
          </div>
        </div>

        <div
          className="flex-1 overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-400 scrollbar-track-gray-200 pl-2 pr-2 pt-2"
          id="chat-container"
          style={{ scrollbarGutter: "stable" }}
        >
          {allMessagesForThisRoom
            .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
            .map((message) => {
              const user = allUserInfo.find(
                (info) => info.userId === message.userId
              );
              const isCurrentUser = message.userId == userId;
              return (
                <div key={message.messageId}>
                  <div
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isCurrentUser && (
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-7 h-7 rounded-full mr-2 self-center ring-2 ring-slate-400 object-cover"
                      />
                    )}
                    <div
                      className={`${
                        isCurrentUser
                          ? "bg-violet-600 text-white mr-2 py-3 px-4 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl "
                          : "ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                      } p-2 rounded m-1 max-w-xs lg:max-w-md flex flex-col justify-center`}
                    >
                      {message.messageText}
                      <div
                        className={`text-[0.62rem] ${
                          isCurrentUser ? "text-white" : "text-white"
                        }`}
                      >
                        {new Date(message.sentAt).toLocaleString()}
                      </div>
                    </div>
                    {isCurrentUser && (
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-6 h-6 rounded-full ml-2 self-center ring-2 ring-violet-600 object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center mt-4">
          <input
            type="text"
            placeholder="Type your message here"
            className="border border-gray-400 rounded-l-lg py-2 px-4 w-full"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            className="bg-violet-400 text-white rounded-r-lg py-2 px-4"
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
