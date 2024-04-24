import { useState } from "react"
import { Link } from 'react-router-dom'
import { useSignupLG } from "../hooks/useSignupLG"

const SignupLG = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const {signupLG, error, isLoading} = useSignupLG()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signupLG(name, email, password, role)
  }

  return (
    <div className="signin-signup">
    <form className="signupLG" onSubmit={handleSubmit}>
    <img src={process.env.PUBLIC_URL + '/chromagen.png'} alt="Chromagen Logo" className="user-title" />
      
      <div className="input-field">
      <i className="fa-solid fa-circle-user"></i>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        placeholder="Name" 
      />
      </div>

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

      <div className="input-field">
      <i className="fa-solid fa-users"></i>
      <select
        onChange={(e) => setRole(e.target.value)} 
        value={role} 
      >
        <option value="">--Role--</option>
        <option value="Lead Generation">Lead Generation</option>
        <option value="Telemarketer">Telemarketer</option>
        <option value="Team Leader">Team Leader</option>
      </select>
      </div>
      <button disabled={isLoading} className="btn">Sign up</button>
      <p>Already have an account?<Link to="/loginLG" className="account-text">Sign In</Link></p>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default SignupLG