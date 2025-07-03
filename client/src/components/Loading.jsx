const Loading = () => {
  return (
    <div className="absolute inset-0 bg-white/30 flex items-center justify-center z-50 gap-3">
      <div className="flex space-x-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="text-black text-2xl">Loading...</p>
    </div>
  );
};

export default Loading;
