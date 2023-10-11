import React, { useEffect, useState } from "react";
import ChatRoom from "../ChatRoom/ChatRoom";
import Navbar from "../Navbar/Navbar";
import CreateChatRoom from "../CreateChatRoom/CreateChatRoom";
import Cookies from "js-cookie"; // Import js-cookie

const Home = (props) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState(null); // Track selected chatroom ID
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false); // Track whether to show the create room form
  const [selectedChatRoomName, setSelectedChatroomName] = useState(null);
  const { setOnProfile, setChatRoomsCount, chatRoomsCount, handleLogout } =
    props;
  const { baseApiUrl, baseUrl, setSignedIn, onProfile, signedIn } = props;
  const onCloseCreateRoomForm = () => {
    setShowCreateRoomForm(false);
  };
  useEffect(() => {
    setOnProfile(false);
    console.log(signedIn);
  }, []);

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
    localStorage.setItem("chatRoomId", chatRoomId);
    setSelectedChatroomName(chatRoomName);
  };

  const passSignedIn = (arg) => {
    setSignedIn(arg);
  };

  return (
    <div className="bg-violet-200">
      <div className="bg-slate-50 shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
        {/* <Navbar
          onProfile={onProfile}
          chatRoomsCount={chatRoomsCount}
          handleLogout={handleLogout}
          baseUrl={baseUrl}
          passSignedIn={passSignedIn}
        /> */}
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
          <li
            className=" text-base hover:bg-white  shadow-2xl w-fit py-3 px-4 rounded-xl ring hover:ring-violet-400 bg-violet-400 text-white ring-slate-200 transition-all ease-in-out duration-500 cursor-pointer text-center hover:text-violet-600 font-bold"
            style={{ display: "inline-block" }}
            onClick={() => setShowCreateRoomForm(true)}
          >
            <i
              className="fa-solid fa-plus fa-"
              style={{ color: "#955cff", marginRight: "5px" }}
            ></i>{" "}
            New Chat
          </li>
        </ul>
        <CreateChatRoom
          visible={showCreateRoomForm}
          onClose={onCloseCreateRoomForm}
          baseApiUrl={baseApiUrl}
        />
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
          className=""
          chatroomId={selectedChatroomId}
          baseApiUrl={baseApiUrl}
          chatRoomName={selectedChatRoomName}
        />
      )}
    </div>
  );
};

export default Home;
