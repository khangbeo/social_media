import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

export interface FormState {
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

const SignUpForm = () => {
  const { signInWithGithub, signUpNewUser } = useAuth();
  const [newUser, setNewUser] =
    useState<FormWithConfirmPassword>(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

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
      navigate("/");
      setNewUser(initialFormState);
      setSuccess("Account created! Check your email to confirm!");
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="mx-auto space-y-4">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleFormChange}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Create password"
          value={newUser.password}
          onChange={handleFormChange}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Confirm password"
          value={newUser.confirmPassword}
          onChange={handleFormChange}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-purple-500 px-3 py-1 rounded cursor-pointer hover:bg-purple-600 hover:transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}

      <div className="w-full">
        <div className="flex py-5 items-center">
          <div className="grow border-b border-gray-300"></div>
          <span className="shrink mx-4 text-gray-300">Or</span>
          <div className="grow border-b border-gray-300"></div>
        </div>
      </div>

      <button
        onClick={signInWithGithub}
        className="w-full bg-gray-200 text-purple-600 font-semibold px-3 py-2 rounded cursor-pointer hover:bg-gray-300 hover:transition-colors duration-300"
      >
        Sign In With Github
      </button>

      <p className="mt-20 text-gray-400 text-lg font-semibold">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-purple-400 hover:text-purple-500 hover:underline hover:transition-colors duration-200"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};
export default SignUpForm;
