import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<User>({ _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    };
    return (
        <div>
            <h1>Account</h1>
            <h1>Sign in</h1>
            <input value={credentials.username} onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })}/><br/>
            <input value={credentials.password} onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })}/><br/>
            <button onClick={signin}> Signin </button>
            <Link to="/Kanbas/Account/Signup">Sign up</Link>

        </div>
    );
}
