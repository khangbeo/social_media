import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface FormState {
  email: string;
  password: string;
}

interface FormWithConfirmPassword extends FormState {
  confirmPassword: string;
}

const initialFormState: FormWithConfirmPassword = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const { signInWithGithub, signUpNewUser } = useAuth();
  const [newUser, setNewUser] =
    useState<FormWithConfirmPassword>(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = newUser;

    const result = await signUpNewUser(email, password);

    if ("error" in result) {
      setError(result.error.message);
      return;
    }

    if ("success" in result && result.success) {
      setNewUser(initialFormState);
      setSuccess("Account created! Check your email to confirm!");
    }
  };

  return (
    <>
      <h2>Create Account</h2>
      <div>
        <button
          onClick={signInWithGithub}
          className="bg-blue-500 px-3 py-1 rounded cursor-pointer hover:bg-blue-600 hover:transition-colors duration-300"
        >
          Sign In With Github
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Create password"
          value={newUser.password}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Confirm password"
          value={newUser.confirmPassword}
          onChange={handleFormChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      <p>Already have an account? Login</p>
    </>
  );
};
export default Form;
