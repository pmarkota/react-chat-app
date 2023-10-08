import React, { useEffect, useState } from "react";
import ChatRoom from "../ChatRoom/ChatRoom";

const Home = (props) => {
  const [chatRoomsCount, setChatRoomsCount] = useState(0);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState(null); // Track selected chatroom ID
  const [selectedChatRoomName, setSelectedChatroomName] = useState(null);

  const { baseApiUrl } = props;

  const userId = localStorage.getItem("pch-id");
  console.log(userId);

  const getChatRoomsForCurrentUser = async () => {
    try {
      const chatRoomsResponse = await fetch(
        baseApiUrl + "api/ChatRooms/user/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!chatRoomsResponse.ok) {
        console.log("this is id" + userId);
        throw new Error("Network response was not ok");
      }
      const data = await chatRoomsResponse.json();
      setChatRoomsCount(data.length);
      setChatRooms(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  useEffect(() => {
    const fetchChatRoomsForCurrentUser = async () => {
      getChatRoomsForCurrentUser();
    };
    fetchChatRoomsForCurrentUser();
  }, [userId]);

  const handleChatRoomClick = (chatRoomId, chatRoomName) => {
    setSelectedChatroomId(chatRoomId);
    setSelectedChatroomName(chatRoomName);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">
          All Chats{" "}
          <small className="text-xs text-slate-500">({chatRoomsCount})</small>
        </h1>
        <ul style={{ display: "inline-block" }}>
          {chatRooms.map((chatRoom) => (
            <li
              key={chatRoom.roomId}
              className=" text-base mb-2 shadow-2xl w-fit py-3 px-4 rounded-xl ring ring-violet-400 hover:bg-violet-400 hover:text-white hover:ring-slate-200 transition-all ease-in-out duration-500 cursor-pointer text-center text-violet-600 font-bold mr-5"
              style={{ display: "inline-block" }}
              onClick={() =>
                handleChatRoomClick(chatRoom.roomId, chatRoom.roomName)
              }
            >
              {chatRoom.roomName}
            </li>
          ))}
        </ul>
        {/* Render Chatroom component if a chatroom is selected */}

        {/* Render message if no chatroom is selected */}
        {!selectedChatroomId && (
          <p className="text-slate-500 text-center font-bold">
            Select a chatroom to start chatting
          </p>
        )}
      </div>
      {selectedChatroomId && (
        <ChatRoom
          chatroomId={selectedChatroomId}
          baseApiUrl={baseApiUrl}
          chatRoomName={selectedChatRoomName}
        />
      )}
    </div>
  );
};

export default Home;
