import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { API_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadeProgress, setImageUploadeProgress] = useState(null);
  const [imageUploadeError, setImageUploadeError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const { postId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`${API_URL}/post/getposts?postId=${postId}`);
        const { data } = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.message.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong !");
    }
  };
  return (
    <div className="dark:bg-neutral-700 dark:text-white">
      <div className="p-3 max-w-3xl mx-auto min-h-screen ">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Update a Post
        </h1>
        <form onSubmit={handleSubmit}>
          {/* tiltle */}
          <div className="sm:flex gap-4 ">
            <input
              type="text"
              placeholder="Title"
              id="title"
              value={formData.title}
              required
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            />
            <select
              name="Select a category"
              id="category"
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
              className="p-2 my-4 sm:my-0 w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 dark:bg-neutral-700"
            >
              <option value="uncategorized">Select a category</option>
              <option value="JavaScript">JavaScript</option>
              <option value="ReactJS">ReactJS</option>
              <option value="NextJS">NextJS</option>
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
          {formData.image && (
            <div className="w-full h-60 bg-gray-300 rounded-lg my-4">
              <img
                src={formData.image}
                alt="post"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          {/* Quill */}
          <ReactQuill
            theme="snow"
            value={formData.content}
            required
            onChange={(value) => {
              setFormData((prevData) => ({
                ...prevData,
                content: value,
              }));
            }}
            placeholder="Write Your Post "
          />
          {/* submit */}
          <button
            type="submit"
            className="w-full my-4 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold  transition duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
          >
            Update and Pubilsh
          </button>
        </form>
        {/* publish error */}
        {publishError && (
          <div className="w-full p-2 bg-red-300 text-red-600 rounded-lg my-4 ">
            {publishError}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
