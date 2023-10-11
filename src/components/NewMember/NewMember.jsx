import React, { useEffect } from "react";

export default function NewMember({ visible, onClose, baseApiUrl }) {
  if (!visible) {
    return null;
  }
  const currentRoomId = localStorage.getItem("chatRoomId");

  //${baseApiUrl}api/users/add-user-to-room-by-username

  const fetchAddUserToTheRoom = () => {
    const username = document.getElementById("username-input").value;
    fetch(`${baseApiUrl}api/users/add-user-to-room-by-username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        roomId: currentRoomId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(`User "${data.username}" added to the room successfully.`);
        // Optionally, you can close the modal here or handle other actions
        onClose();
      })
      .catch((error) => {
        console.error("Error adding user to the room:", error);
        // Handle error, show an error message, etc.
      });
  };

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
          Add a member to chat
        </h1>

        <div className="flex flex-col px-6">
          <input
            id="username-input"
            type="text"
            className="ring-1 focus:ring-2  ring-violet-600 p-2 rounded mb-5"
            placeholder="member's username"
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              fetchAddUserToTheRoom();
              setTimeout(() => {
                onClose();
              }, 1000);
            }}
            className="px-5 py-2 bg-gray-700 text-white rounded mb-6"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
