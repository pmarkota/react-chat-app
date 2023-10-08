// Chatroom.js
import React, { useEffect, useState } from "react";

const Chatroom = ({ chatroomId, baseApiUrl, chatRoomName }) => {
  const [allMessagesForThisRoom, setAllMessagesForThisRoom] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);

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
  console.log(allUserInfo);
  return (
    <div>
      <div className="bg-violet-400 w-fit mx-auto text-white rounded-xl py-2 px-4 text-lg ">
        {chatRoomName}
      </div>
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
                    className="w-6 h-6 rounded-full mr-2 self-center"
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
                    className="w-6 h-6 rounded-full ml-2 self-center"
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chatroom;
