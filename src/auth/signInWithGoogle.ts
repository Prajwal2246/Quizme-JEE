import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // adjust path if needed

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Signed in user:", user);
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};
