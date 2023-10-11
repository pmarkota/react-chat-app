import React from "react";

export default function CreateChatRoom({ visible, onClose, baseApiUrl }) {
  const createdBy = localStorage.getItem("pch-id");

  const fetchCreateChatRoom = async () => {
    const roomName = document.getElementById("room-name-input").value;
    const response = await fetch(`${baseApiUrl}api/chatrooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ createdBy, roomName }),
    });
    const data = await response.json();
    console.log(data);
  };

  if (!visible) {
    return null;
  }
  const handleOnClose = (e) => {
    if (e.target.id !== "craete-chat-room-modal") return;
    onClose();
  };
  return (
    <div
      onClick={handleOnClose}
      id="craete-chat-room-modal"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center cursor-default"
    >
      <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700 mb-4 mt-5">
          Create a chat room
        </h1>

        <div className="flex flex-col px-6">
          <input
            id="room-name-input"
            type="text"
            className="ring-1 focus:ring-2  ring-violet-600 p-2 rounded mb-5"
            placeholder="e.g. My chat room"
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              fetchCreateChatRoom();

              onClose();
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
            className="px-5 py-2 bg-gray-700 text-white rounded mb-6"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
