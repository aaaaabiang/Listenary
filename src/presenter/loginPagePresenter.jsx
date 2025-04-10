import { useState, useEffect } from "react"
import loginModel from "../loginModel.js"
import LoginView from "../views/loginPageView.jsx"

function LoginPresenter() {
  // Local state to trigger re-renders when model changes
  const [modelState, setModelState] = useState({
    username: loginModel.username,
    password: loginModel.password,
    isLoading: loginModel.isLoading,
  })

  // Subscribe to model changes
  useEffect(() => {
    const unsubscribe = loginModel.subscribe((model) => {
      setModelState({
        username: model.username,
        password: model.password,
        isLoading: model.isLoading,
      })
    })

    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

  // Event handlers that interact with the model
  function handleUsernameChange(e) {
    loginModel.setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    loginModel.setPassword(e.target.value)
  }

  function handleClearUsername() {
    loginModel.clearUsername()
  }

  function handleClearPassword() {
    loginModel.clearPassword()
  }

  function handleLogin(e) {
    e.preventDefault()

    loginModel.login((result) => {
      if (result.success) {
        // Handle successful login (e.g., redirect)
        console.log("Login successful")
      } else {
        // Handle login failure
        console.error("Login failed:", result.message)
      }
    })
  }

  function handleRegister() {
    console.log("Register clicked")
  }

  function handleSocialLogin(provider) {
    loginModel.socialLogin(provider, (result) => {
      if (result.success) {
        console.log(provider + " login successful")
      }
    })
  }

  // Pass data and event handlers to the view!
  return (
    <LoginView
      username={modelState.username}
      password={modelState.password}
      isLoading={modelState.isLoading}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      onClearUsername={handleClearUsername}
      onClearPassword={handleClearPassword}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onSocialLogin={handleSocialLogin}
    />
  )
}

export default LoginPresenter


