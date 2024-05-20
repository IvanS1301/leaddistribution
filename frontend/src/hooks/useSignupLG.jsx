import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignupLG = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signupLG = async (name, email, password, role) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/userLG/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password, role})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('userLG', JSON.stringify({
        _id: json._id,
        name: json.name,
        email: json.email,
        token: json.token,
        role: json.role
      }))

      // update the auth context
      dispatch({type: 'LOGIN', payload: {
        _id: json._id,
        name: json.name,
        email: json.email,
        token: json.token,
        role: json.role
      } })

      // update loading state
      setIsLoading(false)
    }
  }

  return { signupLG, isLoading, error }
}