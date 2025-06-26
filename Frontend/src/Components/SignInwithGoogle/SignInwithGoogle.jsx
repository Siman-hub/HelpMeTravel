import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleLogo from "./google.png";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/home";
      }
    });
  }

  return (
    <div className="flex flex-col items-center px-8">
      <p className="text-gray-600 mb-2">-- Or continue with --</p>
      <div
        className="cursor-pointer"
        onClick={googleLogin}
      >
        <img src={googleLogo} alt="Google Sign-In" className="w-60" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
