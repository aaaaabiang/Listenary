import { useState, useEffect } from "react"
import loginModel from "../loginModel.js"
import LoginView from "../views/loginPageView.jsx"

function LoginPresenter() {
  // Local state to manage view updates
  const [modelState, setModelState] = useState({
    isLoading: loginModel.getIsLoading(),
    user: loginModel.getUser()
  })

  // Update view state when auth state changes
  useEffect(() => {
    const unsubscribe = loginModel.setupAuthStateListener((user) => {
      updateViewState();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Helper function to update view state from model
  const updateViewState = () => {
    setModelState({
      isLoading: loginModel.getIsLoading(),
      user: loginModel.getUser()
    });
  };

  function handleGoogleLogin(e) {
    e.preventDefault();
    loginModel.googleLogin()
      .then((result) => {
        console.log("Google login successful");
        // 登录成功后重定向到主页
        window.location.href = '/#/';
      })
      .catch((error) => {
        console.error("Google login failed:", error.message);
        alert("Login failed: " + error.message);
      });
  }

  function handleLogout() {
    loginModel.logout()
      .then(() => {
        console.log("Logout successful");
        // 可以选择是否重定向到其他页面
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
        alert("Logout failed: " + error.message);
      });
  }

  // Pass data and event handlers to the view
  return (
    <LoginView
      isLoading={modelState.isLoading}
      user={modelState.user}
      onGoogleLogin={handleGoogleLogin}
      onLogout={handleLogout}
    />
  )
}

export default LoginPresenter


