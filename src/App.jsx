import { Fragment, useEffect, useState } from "react";
import Signin from "./components/Signin/Signin";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    console.log("id: " + id);
  }, [id]);

  return (
    <Fragment>
      <Signin id={id} setId={setId} />
    </Fragment>
  );
}
