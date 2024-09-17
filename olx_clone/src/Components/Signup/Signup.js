import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { AuthContext, FirebaseContext } from "../../store/Context";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  if (user) {
    history.push("/");
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const trimmedUser = username.replace(/\s+/g, "");

      if (trimmedUser.length < 5)
        throw new Error(
          "Please enter username atleast 4 characters without white space!"
        );

      if (!email.length) {
        throw new Error("Please Enter the Email");
      } else if (!emailRegex.test(email)) {
        throw new Error("Invalid Email Format");
      }

      if (!phone.length) {
        throw new Error("Please Enter the Phone Number");
      } else if (!phoneRegex.test(phone)) {
        throw new Error("Invalid Phone Number Format");
      }

      if (password.trim().length < 6)
        throw new Error(
          "Please Enter the Password atleast 6 characters without white space"
        );

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          toast.success("SignedUp Successfully");
          result.user.updateProfile({ displayName: username }).then(() => {
            firebase
              .firestore()
              .collection("users")
              .add({
                id: result.user.uid,
                username: username,
                phone: phone,
              })
              .then(() => {
                history.push("/login");
              });
          });
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("Catched Error :", err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <Toaster />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="name"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
