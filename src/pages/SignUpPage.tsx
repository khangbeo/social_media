import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const { signInWithGithub } = useAuth();
  return (
    <div>
      <h2>Create Account</h2>
      <div>
        <button
          onClick={signInWithGithub}
          className="bg-blue-500 px-3 py-1 rounded cursor-pointer hover:bg-blue-600 hover:transition-colors duration-300"
        >
          Sign In With Github
        </button>
      </div>
      <form>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Create password" />
        <input type="text" placeholder="Confirm password" />
        <button>Sign Up</button>
        <p>Already have an account? Login</p>
      </form>
    </div>
  );
};
export default SignUpPage;
