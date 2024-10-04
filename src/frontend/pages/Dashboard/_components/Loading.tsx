const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-200 border-t-blue-500 h-16 w-16 mb-4"></div>
      <p className="text-lg text-gray-600">Generating your blog...</p>
    </div>
  );
};

export default LoadingSpinner;
