const Shimmer = () => {
  return (
    <div className="p-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ps-4 pe-4 ">
      {Array(12)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-96 rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 animate-pulse shadow-md"
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
