import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState([]);
  const { postSlug } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/post/getposts?slug=${postSlug}`);
        const { data } = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  // recent 3 post get

  useEffect(() => {
    const fetch3RecentPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/post/getposts?limit=3`);
        const { data } = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch3RecentPost();
  }, []);

  if (loading) return <div>Loding..............</div>;
  return (
    <div className="dark:bg-neutral-700 dark:text-white w-full p-4">
      <div className="flex flex-col  ">
        <h1 className=" text-2xl md:text-3xl  p-3 font-serif ">
          {post?.title}
        </h1>
        <Link to={`/search?category=${post?.category}`}>
          <button className="text-lg font-semibold p-5 hover:text-red-400">
            {post?.category}
          </button>
        </Link>
        <img
          src={post?.image}
          alt={post?.slug}
          className="max-h-[40rem] w-full object-cover"
        />
        <div className="flex justify-between w-full m-4 ">
          <span className="text-lg font-semibold">
            {new Date(post?.createdAt).toLocaleString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-lg font-semibold">
            {`${Math.ceil(post?.content.split(" ").length / 200)}`}mins read
          </span>
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        ></div>
        <CommentSection postId={post?._id} />
      </div>
      <div className="text-center">
        <h1 className="text-3xl uppercase m-5">Recent articles</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {recentPost?.map((post) => (
            <div key={post?.slug}>{<PostCard post={post} />}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
