//manage login interface data
class LoginModel {
    constructor() {
        this.username = ""
        this.password = ""
        this.isLoading = false
        this.observers = []

        // Observer pattern to notify components of state changes
        this.subscribe = function (observer) {
            this.observers.push(observer)
            return function () {
                this.observers = this.observers.filter((obs) => obs !== observer)
            }.bind(this)
        }

        this.notifyObservers = function () {

            this.observers.forEach((observer) => {
                observer(this)
            })
        }

        // Data manipulation methods
        this.setUsername = function (username) {
            this.username = username
            this.notifyObservers()
        }

        this.setPassword = function (password) {
            this.password = password
            this.notifyObservers()
        }

        this.clearUsername = function () {
            this.username = ""
            this.notifyObservers()
        }

        this.clearPassword = function () {
            this.password = ""
            this.notifyObservers()
        }

        // Business logic with callbacks
        this.login = function (callback) {


            if (!this.username || !this.password) {
                callback({ success: false, message: "Username and password are required" })
                return
            }

            this.isLoading = true
            this.notifyObservers()

            // Simulate API call with setTimeout
            setTimeout(() => {
                console.log("Login attempt with:", { username: this.username, password: this.password })

                // In a real app, you would make an actual API call here
                var response = { success: true }

                this.isLoading = false
                this.notifyObservers()

                callback(response)
            }, 1000)
        }

        this.socialLogin = (provider, callback) => {
            console.log("Login with " + provider)
            // In a real app, you would initiate OAuth flow
            // Simulate API call with setTimeout
            setTimeout(() => {
                callback({ success: true, provider: provider })
            }, 500)
        }
    }
}
  
  // Create and export a singleton instance
  const loginModel = new LoginModel()
  export default loginModel
  
  