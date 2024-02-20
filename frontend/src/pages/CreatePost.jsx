import { useState } from "react";
// import { getStorage, ref } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadeProgress, setImageUploadeProgress] = useState(null);
  const [imageUploadeError, setImageUploadeError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadeError("Please select an image");
        return;
      }
      setImageUploadeError(null);
      const storage = getStorage(app);
      const filename = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadeProgress(progress.toFixed(0));
          setImageUploadeError(null);
        },
        (error) => {
          setImageUploadeError("Failed to upload image");
          setImageUploadeProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadeError("Failed to upload image");
      setImageUploadeProgress(null);
    }
  };
  return (
    <div className="dark:bg-neutral-700 dark:text-white">
      <div className="p-3 max-w-3xl mx-auto min-h-screen ">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a Post
        </h1>
        <form>
          {/* tiltle */}
          <div className="sm:flex gap-4 ">
            <input
              type="text"
              placeholder="Title"
              id="title"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            />
            <select
              name="Select a category"
              id="category"
              className="p-2 my-4 sm:my-0 w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            >
              <option value="uncategorized">Select a category</option>
              <option value="uncategorized">JavaScript</option>
              <option value="uncategorized">ReactJS</option>
              <option value="uncategorized">NextJS</option>
            </select>
          </div>
          {/* image  */}
          <div className=" sm:flex my-4 p-2 border border-gray-300 rounded-lg justify-between">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                onClick={(e) => {
                  setImageUploadeError(null);
                }}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleUploadImage}
                className=" w-full my-4 sm:my-0 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold transition duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
              >
                Upload image
                {imageUploadeProgress && ` ${imageUploadeProgress}%`}
              </button>
            </div>
          </div>
          {/* image select error */}
          {imageUploadeError && (
            <div className="w-full p-2 bg-red-300 text-red-600 rounded-lg my-4 ">
              {imageUploadeError}
            </div>
          )}
          {/* BG image */}
          {file && (
            <div className="w-full h-60 bg-gray-300 rounded-lg my-4">
              <img
                src={URL.createObjectURL(file)}
                alt="post"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          {/* Quill */}
          <ReactQuill theme="snow" placeholder="Write Your Post " />
          {/* submit */}
          <button
            type="submit"
            className="w-full my-4 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold  transition duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
          >
            Pubilsh
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
