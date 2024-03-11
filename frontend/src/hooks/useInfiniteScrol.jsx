import { useEffect } from "react";

const useInfiniteScroll = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight;

      if (isAtBottom) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};

export default useInfiniteScroll;
