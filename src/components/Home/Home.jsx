import React from "react";

const Home = () => {
  const chatRooms = [
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" },
    { id: 3, name: "Room 3" },
  ];

  const chats = [
    { id: 1, message: "Hello, world!" },
    { id: 2, message: "How are you doing?" },
    { id: 3, message: "I'm doing well, thanks for asking." },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>
        <ul>
          {chatRooms.map((room) => (
            <li key={room.id} className="mb-2">
              <a href="#" className="hover:text-gray-300">
                {room.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {chats.map((chat) => (
            <div key={chat.id} className="mb-2">
              <p>{chat.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
