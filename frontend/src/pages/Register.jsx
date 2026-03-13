import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);

const handleRegister = async (e) => {
e.preventDefault();

const strongPassword =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!strongPassword.test(password)) {
alert(
"Password must contain:\n• Minimum 8 characters\n• 1 uppercase letter\n• 1 lowercase letter\n• 1 number\n• 1 special character"
);
return;
}

try {

await axios.post("/api/auth/register",{
name,
email,
password
});

alert("Registration successful");
navigate("/login");

} catch(err){
alert("Registration failed");
}

};

return (
<div className="flex justify-center items-center h-screen">

<form
onSubmit={handleRegister}
className="border p-6 rounded shadow w-80 bg-white"
>

<h2 className="text-2xl font-bold mb-4 text-center">
Register
</h2>

<input
type="text"
placeholder="Name"
className="border p-2 w-full mb-3"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
className="border p-2 w-full mb-3"
onChange={(e)=>setEmail(e.target.value)}
/>

<div className="relative">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
className="border p-2 w-full mb-3"
onChange={(e)=>setPassword(e.target.value)}
/>

<span
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
>
{showPassword ? "Hide" : "Show"}
</span>

</div>

<p className="text-xs text-gray-500 mb-3">
Password must contain uppercase, lowercase, number and special character.
</p>

<button className="bg-pink-500 text-white w-full p-2 rounded hover:bg-pink-600">
Register
</button>

</form>

</div>
);
}

export default Register;