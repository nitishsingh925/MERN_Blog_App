const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-neutral-700 dark:text-gray-200">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Nitish Singh's Blog
          </h1>
          <div className="text-md text-gray-500 dark:text-gray-300 flex flex-col gap-6">
            <p>
              Welcome to Nitish Singh's Blog! This blog was created by Nitish
              Singh as a personal project to share his thoughts and ideas with
              the world. Nitish is a passionate developer who loves to write
              about technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Nitish is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>

            <p>Thank you for being a part of Nitish Singh's Blog community!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
