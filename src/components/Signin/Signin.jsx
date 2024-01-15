import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

import appLogo from "../../assets/P-Chat.png";

const Signin = (props) => {
  const { setSignedIn, setJwtToken, setId, baseUrl, id } = props;

  const sendSignInRequest = async (email, password) => {
    const response = await fetch(
      "https://chatappapp.azurewebsites.net/api/Users/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      Cookies.set("jwtToken", data.tokenString, { expires: 7 });
      localStorage.setItem("pch-id", data.userId);
      setJwtToken(data.tokenString);
      setSignedIn(true);

      // window.location.href = baseUrl + "home";
    }
    return data;
  };
  return (
    <>
      <div className="flex flex-col justify-center flex-1 max-w-xl min-h-full px-6 py-12 mx-auto text-center shadow-2xl lg:px-8 ring ring-slate-50 rounded-xl my-9">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="w-auto mx-auto h-15"
            src={appLogo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={async () => {
                  const data = await sendSignInRequest(
                    document.getElementById("email").value,
                    document.getElementById("password").value
                  );
                  console.log(data);
                  Cookies.set("jwtToken", data.tokenString, { expires: 7 }); // You can adjust the expiration as needed

                  console.log("User ID from API response:", data.userId);
                  setId(data.userId);

                  setJwtToken(data.tokenString);
                  if (data.tokenString) {
                    setSignedIn(true);
                  }
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-sm text-center text-gray-500">
            Don't have an account yet?{" "}
            <a
              href={baseUrl + "register"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
