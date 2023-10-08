import { Fragment, useEffect, useState } from "react";
import Signin from "./components/Signin/Signin";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [id, setId] = useState(0);
  const baseUrl = "http://127.0.0.1:5173/";
  const baseApiUrl = "https://localhost:7189/";
  const [loading, setLoading] = useState(true); // Add a loading state

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
  return (
    <Fragment>
      <main className="font-sans">
        <BrowserRouter>
          {loading ? ( // Conditionally render loading indicator
            <div>Loading...</div>
          ) : (
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
                    <NotFound />
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
                  element={<Home userId={id} baseApiUrl={baseApiUrl} />}
                />
              )}
              {/* NotFound route */}
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </main>
    </Fragment>
  );
}
