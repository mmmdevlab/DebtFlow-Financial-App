// login
// signup
const AuthPage = () => {
  return (
    <>
      <div>
        <nav>
          <NavLink to="/auth/login">Login</NavLink>
          <NavLink to="/auth/signup">Sign Up</NavLink>
        </nav>
        <h1>Auth page</h1>
        <p>Col 1 - Signup form </p>
        <p>Col 1 - Login form </p>
        <p>Col 2 - Benefits</p>
      </div>
    </>
  );
};
export default AuthPage;
