function Loader() {
  return (
    <div className="fixed top-0 left-0 right-0 h-full bg-[rgba(244,233,244,0.21)] z-[7000]">
      <div className="absolute top-0 h-1 w-[30%] bg-blue-600 animate-slide-progress z-[3000]" />
    </div>
  );
}

export default Loader;
