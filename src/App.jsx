import { Fragment, useEffect, useState } from "react";
import Signin from "./components/Signin/Signin";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function App() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const baseUrl = "http://127.0.0.1:5173/";

  // useeffectCheck if the JWT token is present in the cookie, jwt token is under name "jwtToken" in cookie (you should implement this logic)
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      setJwtToken(token);
      setSignedIn(true);
    }
  }, []);

  return (
    <Fragment>
      <main>
        <BrowserRouter>
          <Routes>
            {/* Signin route */}
            <Route
              path="/"
              element={
                signedIn ? (
                  <NotFound />
                ) : (
                  <Signin
                    setSignedIn={setSignedIn}
                    setJwtToken={setJwtToken}
                    setId={setId}
                    baseUrl={baseUrl}
                  />
                )
              }
            />
            {/* Register route */}
            <Route
              path="/register"
              element={
                signedIn ? (
                  <NotFound />
                ) : (
                  <Register
                    setSignedIn={setSignedIn}
                    setJwtToken={setJwtToken}
                    setId={setId}
                    baseUrl={baseUrl}
                  />
                )
              }
            />
            {/* Home route */}
            {signedIn && (
              <Route path="/home" element={<Home baseUrl={baseUrl} />} />
            )}
            {/* NotFound route */}
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Fragment>
  );
}
