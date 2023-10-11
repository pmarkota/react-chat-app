import { Fragment, useEffect, useState } from "react";
import Signin from "./components/Signin/Signin";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [showNavbar, setShowNavbar] = useState(false);
  const [id, setId] = useState(0);
  const [chatRoomsCount, setChatRoomsCount] = useState(0);
  const baseUrl = "https://startling-gecko-b16eec.netlify.app/";
  const baseApiUrl = "https://op-chat-api.azurewebsites.net/";
  const [loading, setLoading] = useState(true); // Add a loading state
  const [onProfile, setOnProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("pch-id");
    Cookies.remove("jwtToken");
    setSignedIn(false);
    window.location.href = baseUrl;
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      setJwtToken(token);
      setSignedIn(true);
    }
    setLoading(false); // Set loading to false after checking the token
  }, []);
  useEffect(() => {
    console.log(signedIn);
  }, [signedIn]);
  return (
    <Fragment>
      <main className="font-sans">
        <BrowserRouter>
          {loading ? ( // Conditionally render loading indicator
            <div>Loading...</div>
          ) : (
            <>
              <Navbar
                onProfile={onProfile}
                chatRoomsCount={chatRoomsCount}
                handleLogout={handleLogout}
                baseUrl={baseUrl}
                signedIn={signedIn}
              />
              <Routes>
                {/* Signin route */}
                <Route
                  path="/"
                  element={
                    signedIn ? (
                      <NotFound baseUrl={baseUrl} />
                    ) : (
                      <Signin
                        setSignedIn={setSignedIn}
                        setJwtToken={setJwtToken}
                        setId={setId}
                        baseUrl={baseUrl}
                        id={id}
                      />
                    )
                  }
                />
                {/* Register route */}
                <Route
                  path="/register"
                  element={
                    signedIn ? (
                      <NotFound baseUrl={baseUrl} />
                    ) : (
                      <Register
                        setSignedIn={setSignedIn}
                        setJwtToken={setJwtToken}
                        baseUrl={baseUrl}
                      />
                    )
                  }
                />
                {/* Home route */}
                {signedIn && (
                  <Route
                    path="/home"
                    element={
                      <Home
                        userId={id}
                        baseUrl={baseUrl}
                        baseApiUrl={baseApiUrl}
                        signedIn={signedIn}
                        setSignedIn={setSignedIn}
                        setOnProfile={setOnProfile}
                        onProfile={onProfile}
                        chatRoomsCount={chatRoomsCount}
                        setChatRoomsCount={setChatRoomsCount}
                      />
                    }
                  />
                )}
                {/*!!!!!!! setsignedin ne radi kada ga saljem u profile, ukratko logout ne radi na profile stranici. */}
                {signedIn && (
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        baseUrl={baseUrl}
                        baseApiUrl={baseApiUrl}
                        setSignedIn={setSignedIn}
                        onProfile={onProfile}
                        setOnProfile={setOnProfile}
                      />
                    }
                  />
                )}
                {/* NotFound route */}
                <Route
                  path="/not-found"
                  element={<NotFound baseUrl={baseUrl} />}
                />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </main>
    </Fragment>
  );
}
