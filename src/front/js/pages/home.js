import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";


export const Home = () => {

    const navigate = useNavigate()
    let token = localStorage.getItem("jwt-token")

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    })

    return(
        <div className="container">
          <div className="card text-center">
              <div className="card-header">
                  <h1>Home</h1>
              </div>
              <div className="card-body">
                  <h5 className="card-title">You have logged in with the user:</h5>
                  <p className="card-text">{localStorage.getItem("email")}</p>
              </div>
              <div className="card-footer text-muted">
                Exclusive access for logged in users
              </div>
          </div>
        </div>
    )
}

