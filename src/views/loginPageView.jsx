import '../styles/LoginPage.css';
import { TopNav } from '../components/TopNav';

function LoginView({
    isLoading,
    user,
    onGoogleLogin,
    onLogout
}) {
    return (
        <div className="page-container">
            <TopNav />
            <div className="login-wrapper">
                <div className="login-content">
                    <h1 className="login-title">Listenary</h1>

                    {!user ? (
                        <>
                            <button 
                                id="authButton"
                                onClick={onGoogleLogin} 
                                disabled={isLoading}
                                className="google-sign-in-button"
                            >
                                <div className="google-sign-in-content">
                                    <img 
                                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                                        alt="Google" 
                                        className="google-icon"
                                    />
                                    <span>Sign in with Google</span>
                                </div>
                            </button>

                            <p className="terms-text">
                                By continuing, you agree to our{' '}
                                <a href="#" className="terms-link">Terms</a> and{' '}
                                <a href="#" className="terms-link">Privacy</a>
                            </p>
                        </>
                    ) : (
                        <div className="welcome-container">
                            <p className="welcome-text">Welcome, {user.email}</p>
                            <button 
                                onClick={onLogout}
                                className="google-sign-in-button"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginView;

