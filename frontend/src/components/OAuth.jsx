import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../utils/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(dispatch(signInSuccess(data)));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="my-2 border-2 border-slate-700 dark:border-white rounded-lg  hover:text-red-400 w-full flex justify-center"
        >
          <span className=" mx-2">
            <img src="socialMedia/google.svg" alt="google" className="w-7" />
          </span>
          <span>Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default OAuth;
