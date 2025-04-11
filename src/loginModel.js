import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebaseConfig.js";

// Pure data model for login
class LoginModel {
    constructor() {
        // Initialize Firebase Auth
        this.auth = getAuth(app);
        this.googleProvider = new GoogleAuthProvider();
        this.isLoading = false;
        this.user = null;

        // Set up initial auth state
        onAuthStateChanged(this.auth, (user) => {
            this.user = user;
        });
    }

    getIsLoading() {
        return this.isLoading;
    }

    getUser() {
        return this.user;
    }

    // Firebase auth state monitoring
    setupAuthStateListener(callback) {
        return onAuthStateChanged(this.auth, (user) => {
            this.user = user;
            if (callback) callback(user);
        });
    }

    // Authentication methods
    googleLogin() {
        return new Promise((resolve, reject) => {
            this.isLoading = true;
            
            if (this.auth.currentUser) {
                signOut(this.auth)
                    .then(() => {
                        this.user = null;
                        this.isLoading = false;
                        resolve({ success: true });
                    })
                    .catch((error) => {
                        this.isLoading = false;
                        reject({ success: false, error: error.message });
                    });
            } else {
                signInWithPopup(this.auth, this.googleProvider)
                    .then((result) => {
                        this.user = result.user;
                        this.isLoading = false;
                        resolve({ success: true, user: result.user });
                    })
                    .catch((error) => {
                        this.isLoading = false;
                        reject({ success: false, error: error.message });
                    });
            }
        });
    }

    logout() {
        return signOut(this.auth)
            .then(() => {
                this.user = null;
                return { success: true };
            })
            .catch((error) => {
                return { success: false, error: error.message };
            });
    }
}

// Create and export a singleton instance
const loginModel = new LoginModel();
export default loginModel;
  
  