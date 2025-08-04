/* eslint-disable react-refresh/only-export-components */
import type { User } from "@supabase/supabase-js"; //
import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabase-client";

interface AuthContextType {
  user: User | null;
  signInWithGithub: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // get the current session when the component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // actual subscription happens here to listen for auth state changes
    // this will update the user state when the user logs in or out
    // _ is the first parameter which is the event type, we don't need it here, session is the second parameter which contains the user info
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    // Cleanup the subscription when the component unmounts
    // This is important to prevent memory leaks and ensure that the listener is removed when no longer needed
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGithub = () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  };

  // const signUpNewUser = async () => {
  //     const { data, error } = await supabase
  // }

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGithub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};
