import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const Signup = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signupError, setSignupError] = useState(false)

    const handleEmailChange = (e) => {
        setSignupError(false)

        if (!emailRegex.test(e.target.value)) {
          setEmailError("Ingrese un correo electrónico válido.");
          
        } else {
          setEmailError("");
        }
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setSignupError(false)

        if (!passwordRegex.test(e.target.value)) {
          setPasswordError("La contraseña debe tener al menos 8 caracteres y un número.");
        } else {
          setPasswordError("");
        }
        setPassword(e.target.value);
      };

    async function signup(email, password) {
      
        console.log(email + " " + password)
        await fetch(`${props.URL_API}/api/signup`, {
        method: ["POST"],
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": email, "password": password })
        })
            alert("user " + email + " created successfully")
            navigate("/login")
    }
    return (
    <div className="container p-4 bg-dark text-white">

        <h1 className="text-center">Sign up</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange}/>
                {emailError && <p className="text-danger">{emailError}</p>}
                <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePasswordChange}/>
                {passwordError && <p className="text-danger">{passwordError}</p>}
                {signupError?<p className="text-danger">Signup error</p>:<></>}

            </div>
            <button type="button" className="btn btn-primary" onClick={()=>signup(email, password)}>Submit</button>
        </form>
    </div>
    )
}