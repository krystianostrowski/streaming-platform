const Login = () => {
    return(
        <form method="POST" action="/login">
            <input type="text" name="login" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    )
}

export default Login