import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async (navigate) => {
    try {
        await signInWithPopup(auth, provider);
        navigate("/profile");
    } catch (firebaseError) {
        console.error(firebaseError);
        return {
            success: false,
            message: "An unexpected error occurred during Google sign-in",
            error: firebaseError.message
        };
    }
}