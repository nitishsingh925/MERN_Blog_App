import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../utils/firebase";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  console.log(imageFileUploadProgress, imageFileUploadError);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadeImage();
    }
  }, [imageFile]);
  const uploadeImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
        setImageFileUploadError(null);
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div className=" mx-auto">
      <div className="text-center">
        <h1 className="font-bold m-4 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
          Profile
        </h1>
      </div>
      <input
        type="file"
        id="profilePicture"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={filePickerRef}
      />
      <div className="mx-24" onClick={() => filePickerRef.current.click()}>
        <img
          src={imageFileUrl || currentUser?.profilePicture}
          alt="user"
          className="rounded-full border-4 border-teal-500 w-32 cursor-pointer"
        />
      </div>
      {imageFileUploadProgress && (
        <div>
          <progress size="tiny" value={imageFileUploadProgress} max="100">
            {imageFileUploadProgress}%
          </progress>
        </div>
      )}
      {imageFileUploadError && (
        <div className="bg-red-300 text-red-600 rounded-lg font-semibold">
          {imageFileUploadError}
        </div>
      )}
      <form>
        <div className="mb-4">
          <label htmlFor="username">Your username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser?.username}
            // onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Your email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            defaultValue={currentUser?.email}
            // onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Your password</label>
          <input
            type="text"
            placeholder="password"
            id="password"
            // onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
          />
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold"
        >
          Update
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
