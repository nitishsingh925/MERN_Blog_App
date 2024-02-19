import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
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
              <input type="file" className="" />
            </div>
            <div>
              <button
                type="button"
                className=" w-full my-4 sm:my-0 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold transition duration-300 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
              >
                Upload image
              </button>
            </div>
          </div>
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
