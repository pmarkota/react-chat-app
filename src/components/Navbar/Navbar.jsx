import React from "react";
import Cookies from "js-cookie"; // Import js-cookie

const Navbar = (props) => {
  const { passSignedIn, onProfile, chatRoomsCount, baseUrl, signedIn } = props;
  const handleProfileRedirect = () => {
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    localStorage.removeItem("pch-id");
    Cookies.remove("jwtToken");
    // passSignedIn(false);
    window.location.href = baseUrl;
  };
  const handleBackToChats = () => {
    window.location.href = baseUrl + "home";
  };
  //! JANA PITAT. nijedan prop ne ide kako treba u Navbar i ili Profile kroz Home
  return (
    <>
      {signedIn && (
        <div className="flex justify-between items-center mb-4 pl-7 mt-5">
          {!onProfile ? (
            <>
              <h1 className="text-2xl font-bold">
                All Chats{" "}
                <small className="text-xs text-slate-500">
                  ({chatRoomsCount})
                </small>
              </h1>
              <div>
                <i
                  onClick={() => handleProfileRedirect()}
                  className="shadow-xl fa-solid fa-user mr-4 text-white hover:text-violet-600 py-4 px-5 rounded-xl ring ring-violet-200 cursor-pointer bg-violet-400 transition-all ease-in-out duration-500 hover:bg-white hover:ring-violet-600"
                ></i>
                <button
                  className="text-base mb-2 shadow-2xl w-fit py-3 px-4 rounded-xl ring ring-violet-400 hover:bg-violet-400 hover:text-white hover:ring-slate-200 transition-all ease-in-out duration-500 cursor-pointer text-center text-violet-600 font-bold mr-5"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="ml-auto">
              <button
                className="mr-4 text-white hover:text-violet-600 py-3 px-5 rounded-xl ring ring-violet-200 cursor-pointer bg-violet-400 transition-all ease-in-out duration-500 hover:bg-white hover:ring-violet-600 "
                onClick={() => handleBackToChats()}
              >
                Back to Chats
              </button>
              <button
                className="text-base mb-2 shadow-2xl w-fit py-3 px-4 rounded-xl ring ring-violet-400 hover:bg-violet-400 hover:text-white hover:ring-slate-200 transition-all ease-in-out duration-500 cursor-pointer text-center text-violet-600 font-bold mr-5 "
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Navbar;
