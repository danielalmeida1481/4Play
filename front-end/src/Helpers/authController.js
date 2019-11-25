var loggedIn = localStorage.getItem("loggedIn") || false
const requestedPage = window.location.pathname
const noRequiredAuthPages = [
    "/login",
    "/register",
    "/"
]

const authController = {
    isLoggedIn: () => {
        loggedIn = localStorage.getItem("loggedIn") || false

        if (loggedIn) {
            document.body.style.marginLeft = "var(--nav-width)";

            if (noRequiredAuthPages.includes(requestedPage)) {
                window.location.pathname = "/main"
            }
        } else {
            document.body.style.marginLeft = "0";

            if (!noRequiredAuthPages.includes(requestedPage)) {
                window.location.pathname = "/login"
            }
        }
    }
}

export default authController