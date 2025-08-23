import { useState, createContext, useEffect } from "react";
import { LoginRequest } from "./authentication.service";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const formatFirebaseAuthError = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    case "auth/invalid-credential":
      return "Either No user found with this email or Incorrect Email or Password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children, auth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setIsInitializing(false);
      setIsLoading(false);
    });

    return () => unsubscribe(); // ✅ Clean up the listener
  }, [auth]);

  const onLogin = (email, password) => {
    setIsLoading(true);
    LoginRequest(auth, email, password)
      .then((u) => {
        setUser(u.user);
        setIsLoading(false);
      })
      .catch((error) => {
        let errorMessage = formatFirebaseAuthError(error);
        console.log("Login Error: ", error);
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      setIsLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u.user);
        setIsLoading(false);
      })
      .catch((error) => {
        let errorMessage = formatFirebaseAuthError(error);
        console.log("Login Error: ", error);
        setIsLoading(false);
        setError(errorMessage);
      });
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        isInitializing,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
