import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import default_pic from "../../assets/default_pic.jpg";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

export default function Profile(props) {
  const { onProfile, setOnProfile, baseApiUrl } = props;
  const [userData, setUserData] = useState(null); // Initialize as null or an initial value

  const userId = localStorage.getItem("pch-id");

  const [profilePicture, setProfilePicture] = useState(default_pic); // Initialize as null or an initial value
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState([]); // Initialize as null or an initial value
  const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_API_KEY
  );
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = uuidv4() + "." + fileExt;
    const { data, error } = await supabase.storage
      .from("chatimages")
      .upload(fileName, file);
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    const publicURL =
      "https://rtomcbwtcdroecrhvmbl.supabase.co/storage/v1/object/public/chatimages/" +
      data.path;
    // https://rtomcbwtcdroecrhvmbl.supabase.co/storage/v1/object/public/chatimages/1/d57b654c-ea70-45fa-9942-5cd6bb6e7a84.jpg?t=2023-10-10T20%3A29%3A40.489Z
    console.log(publicURL);
    setProfilePicture(publicURL);
    const fetchUpdateProfilePicture = async () => {
      try {
        const userDataResponse = await fetch(
          baseApiUrl + "api/users/update-image",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: publicURL,
              userId: userId,
            }),
          }
        );
        if (!userDataResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await userDataResponse.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUpdateProfilePicture();
  };

  const fetchUserData = async () => {
    try {
      const userDataResponse = await fetch(baseApiUrl + "api/Users/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!userDataResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await userDataResponse.json();
      setUserData(data);
      setUsername(data.username);
      setEmail(data.email);
      setProfilePicture(data.profilePicture);

      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    console.log(profilePicture);
  }, [profilePicture]);
  useEffect(() => {
    const fetchUsersData = async () => {
      await fetchUserData();
    };
    fetchUsersData();
  }, []);

  //   const usersPicturePresent = () => {
  //     if (userData.profilePicture === null) {
  //       return default_pic;
  //     } else {
  //       return userData.profilePicture;
  //     }
  //   };

  useEffect(() => {
    setOnProfile(true);
    console.log(onProfile);
  }, [onProfile]);
  return (
    <div className="profile-page">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={profilePicture ? profilePicture : default_pic}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <label
                      htmlFor="changeImage"
                      className="bg-violet-600 active:bg-violet-800 uppercase
                    text-white font-bold hover:shadow-md shadow text-xs px-4
                    py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1
                    ease-linear transition-all duration-150 cursor-pointer"
                    >
                      Change Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        handleUploadImage(e);
                      }}
                      id="changeImage"
                      style={{ visibility: "hidden" }}
                      className=""
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {username}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Zagreb
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
