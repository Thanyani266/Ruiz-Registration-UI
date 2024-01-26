import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import '../App.css'
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className='container'>
        <div className='row'>
            <div className="col-lg-6 column">
      <div className='logo'>
        <img src="/Logo.png" alt="logo" className="img-fluid"/>
      </div>
      <div className='heading'>
        <h2>Log In</h2>
        <p>Log in to your account.</p>
      </div>
      <div className='google-container'>
        <span><img className="pb-1" src="/google1.png" alt="google" /> continue with google</span>
      </div>
      <div className='separater'>
        <span className="top-bottom-space"><hr /><span className="mx-3">or</span><hr /></span>
      </div>
      <div className='form-box'>
      <form>
  <div className="form-group">
    <input type="email" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
  </div>
  <div className="form-group">
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-check my-3">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label htmlFor="exampleCheck1" className="text-capitalize">remember me</label>
  </div>
  <button type="submit" className="btn btn-dark w-100 rounded-pill">Log In</button>
</form>
    <p className="text-center register-question mt-5">Don&apos;t have an account? <Link className="spn">Register</Link></p>
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

export default Login