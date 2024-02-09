import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Homepage = () => {
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:5001/")
    .then(res => {
      if(res.data.Status === "Jimba"){
        setAuth(true)
        setName(res.data.name)
      }else{
        setAuth(false)
        setMessage(res.data)
      }
    })
    .then(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get("http://localhost:5001/logout")
        .then(res => {
            console.log(res.data);
            navigate('/')
        }).catch(err => console.log(err))
    }
    return (
        <div className="home-container container w-50 mx-auto rounded text-center p-5 mt-5">
            {
                auth ? 
                <>
                <p className="text-muted fs-4">You are logged in, <span className="text-dark">{name}</span>.</p>
                <button className="fs-6 btn btn-outline-danger text-uppercase" onClick={handleLogout}>Logout</button> 
                </>
                : <p>You are not authorized, {message}</p>
            }
        </div>
    )
}

export default Homepage