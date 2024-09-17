import React, { useState, useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FirebaseContext, AuthContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  if (user) {
    history.push("/");
  }
  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        toast.error("Invalid Credentials !");
      });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <Toaster />
        <form onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
