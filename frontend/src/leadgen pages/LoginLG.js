import { useState } from "react"
import { Link } from 'react-router-dom'
import { useLoginLG } from "../hooks/useLoginLG"

const LoginLG = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loginLG, error, isLoading} = useLoginLG()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await loginLG(email, password)
  }

  return (
    <div className="signin-signup">
    <form className="loginLG" onSubmit={handleSubmit}>
    <img src={process.env.PUBLIC_URL + '/chromagen.png'} alt="Chromagen Logo" className="user-title" />
      
      <div className="input-field">
      <i className="fa-solid fa-envelope"></i>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        placeholder="Email" 
      />
      </div>

      <div className="input-field">
      <i className="fa-solid fa-lock"></i>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Password"
      />
      </div>
      <Link to="/" className="forgot-password">Forgot password?</Link>

      <button disabled={isLoading} className="btn">Log In</button>
      <p>Don't have an account?<Link to="/signupLG" className="account-text">Signup</Link></p>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default LoginLG