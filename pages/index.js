const Login = () => {
    return(
        <div className="container">
            <div className="loginForm__wrapper">
                <form method="POST" action="/login">
                    <input type="text" name="login" placeholder="Login" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login