import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const Login = (props) => {

  let token = localStorage.getItem("jwt-token")
  const navigate = useNavigate()

  useEffect(() => {
      if (token) {
          navigate("/home")
      }
  })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState(false)

    const handleEmailChange = (e) => {
        setLoginError(false)

        if (!emailRegex.test(e.target.value)) {
          setEmailError("Ingrese un correo electrónico válido.");
          
        } else {
          setEmailError("");
        }
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setLoginError(false)
        if (!passwordRegex.test(e.target.value)) {
          setPasswordError("La contraseña debe tener al menos 8 caracteres y un número.");
        } else {
          setPasswordError("");
        }
        setPassword(e.target.value);
      };

    async function login(email, password) {
        console.log(email + " " + password)
        const resp = await fetch(`${props.URL_API}/api/token`, {
        method: ["POST"],
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": email, "password": password })
        })
        if(!resp.ok) {
            setLoginError(true)
            alert("There was a problem in the login request")
            throw Error("There was a problem in the login request")
        }
        if(resp.status === 401){
            setLoginError(true)
            alert("Invalid credentials")
            throw("Invalid credentials")
            
        }else if(resp.status === 400){
            setLoginError(true)
            alert("Invalid email or password format")
            throw ("Invalid email or password format")

            }
            const data = await resp.json()
            console.log(data)
            localStorage.setItem("jwt-token", data.token);
            localStorage.setItem("email", data.user.email)
            navigate("/home")
    }
    return (
    <div className="container p-4 bg-dark text-white">

        <h1 className="text-center">Login</h1>
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
                {loginError?<p className="text-danger">error en login</p>:<></>}

            </div>
            <div className="container">
                <button type="button" className="btn btn-primary me-2" onClick={()=>login(email, password)}>Submit</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={()=> navigate("/signup")}>Signup</button>
            </div>
            
        </form>
    </div>
    )
}