import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

function Login({ setIsLoggedIn }) {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e) => {
e.preventDefault();

try {

if (email === process.env.ADMIN_EMAIL &&
  password === process.env.ADMIN_PASSWORD) {

localStorage.setItem("isAdmin", "true");
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userEmail", email);

setIsLoggedIn(true);

navigate("/admin");
return;

}

const res = await axios.post("/api/auth/login", {
email,
password
});

localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userEmail", res.data.email);
localStorage.setItem("userId", res.data._id);

setIsLoggedIn(true);

navigate("/");

} catch (err) {
alert("Invalid credentials");
}

};

return (

<div className="flex justify-center items-center h-screen">

<form
onSubmit={handleLogin}
className="border p-6 rounded shadow w-80 bg-white"
>

<h2 className="text-2xl font-bold mb-4 text-center">
Login
</h2>

<input
type="email"
placeholder="Email"
className="border p-2 w-full mb-3"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<div className="relative">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
className="border p-2 w-full mb-3"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

<span
onClick={() => setShowPassword(!showPassword)}
className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
>
{showPassword ? "Hide" : "Show"}
</span>

</div>

<button className="bg-pink-500 text-white w-full p-2 rounded hover:bg-pink-600">
Login
</button>

</form>

</div>

);
}

export default Login;