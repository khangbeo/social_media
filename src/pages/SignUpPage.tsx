import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  /*
  🔐 AUTH TODOs (using Supabase Auth)

  ✅ Supabase handles:
  - [x] User account creation (email/password)
  - [x] Password hashing/verification
  - [x] UUIDs as user IDs
  - [x] OAuth (if configured)
  - [x] Password reset via email link

  🧠 Your responsibilities:

  📄 Sign Up
  - [ ] Build signup form UI
  - [x] Use `supabase.auth.signUp()` with email/password
  - [x] Handle auth errors and edge cases
  - [ ] Add client-side validation

  🔑 Sign In
  - [ ] Build login form UI
  - [ ] Use `supabase.auth.signInWithPassword()`
  - [ ] Add "Remember Me" toggle (optional)
  - [ ] Add sign-in with OAuth (e.g. Google)

  🔁 Password Reset
  - [ ] Add "Forgot Password?" link
  - [ ] Use `supabase.auth.resetPasswordForEmail()`
  - [ ] Create a Reset Password page (for magic link)

  🗃️ User Metadata
  - [ ] Create a `profiles` table (or `users`) linked to `auth.users`
  - [ ] Insert user profile on `signUp`
  - [ ] Update your code to use UUIDs from `auth.users.id`
  */

  return (
    <div className="pt-20">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create Account
      </h2>
      <SignUpForm />
    </div>
  );
};
export default SignUpPage;
