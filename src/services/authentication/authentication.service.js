import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginRequest = (auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
