import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    axios.post("http://localhost:5001/register", values)
    .then(res => {
      if(res.data === "User has been created!"){
        navigate('/login')
      }else{
        setError(res.data)
      }
    })
    .then(err => console.log(err))
   /**  try {
      await axios.post("http://localhost:5001/register", values)
      navigate('/login')
    } catch (err) {
      setError(err.response.data)
    } */
  }

  return (
    <div className='reg-container container my-3'>
        <div className='row'>
            <div className="col-lg-6 column">
      <div className='logo'>
        <img src="/Logo.png" alt="logo" className="img-fluid"/>
      </div>
      <div className='heading'>
        <h2>sign up</h2>
        <p>Create an account to get started.</p>
      </div>
      <div className='google-container'>
        <span><img className="pb-1" src="/google1.png" alt="google" /> continue with google</span>
      </div>
      <div className='separater'>
        <span className="top-bottom-space"><hr /><span className="mx-3">or</span><hr /></span>
      </div>
      <div className='form-box'>
      {
        error && <p className="text-danger text-center">{error}</p>
      }
      <form onSubmit={handleSubmit}>
      <div className="form-group">
    <input type="text" className="form-control mb-3" id="exampleInputText1" placeholder="Name" name="name" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <input type="email" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={handleChange}/>
  </div>
  <div className="form-check my-3">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label htmlFor="exampleCheck1" className="text-capitalize">remember me</label>
  </div>
  <button type="submit" className="btn btn-dark w-100 rounded-pill">Register</button>
</form>
    <p className="text-center register-question mt-5">Already have an account? <Link to='/login' className="spn">Log in</Link></p>
      </div>
      </div>
      <div className="col-lg-6 col-md-6 col-xs-6 column1 p-0">
        <img src="/Image.png" alt="side_picture..." className="img-fluid"/>
      </div>
      <div className="footer-image p-0">
        <img src="/Image2.png" alt="side_picture..." className="img-fluid"/>
      </div>
      </div>
    </div>
  )
}

export default Register
