function LoginView(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-[#0066ff] mr-3"></div>
        <h1 className="text-4xl font-bold text-[#0066ff]">Listenary</h1>
      </div>

      <form onSubmit={props.onLogin} className="w-full max-w-md space-y-4">
        <div className="space-y-1">
          <label htmlFor="username" className="text-sm text-gray-600">
            User Name
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              value={props.username}
              onChange={props.onUsernameChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              placeholder="Input"
            />
            {props.username && (
              <button
                type="button"
                onClick={props.onClearUsername}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={props.password}
              onChange={props.onPasswordChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              placeholder="Input"
            />
            {props.password && (
              <button
                type="button"
                onClick={props.onClearPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={props.isLoading}
          className="w-full py-3 bg-[#0066ff] text-white rounded-full font-medium hover:bg-[#0055dd] transition-colors"
        >
          {props.isLoading ? "Logging in..." : "Log in"}
        </button>

        <button
          type="button"
          onClick={props.onRegister}
          className="w-full py-3 bg-[#4d8bff] text-white rounded-full font-medium hover:bg-[#3d7bff] transition-colors"
        >
          Register
        </button>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              props.onSocialLogin("Google")
            }}
            className="w-full py-3 bg-[#f1f3f4] text-black rounded-full font-medium hover:bg-[#e8eaed] transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Log in with Google
          </button>

          <button
            type="button"
            onClick={() => {
              props.onSocialLogin("Apple")
            }}
            className="w-full py-3 bg-[#f1f3f4] text-black rounded-full font-medium hover:bg-[#e8eaed] transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2">
              <path
                fill="#000"
                d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.32-1.53 2.6-2.53 4.08z"
              />
              <path fill="#000" d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Log in with Apple
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginView

