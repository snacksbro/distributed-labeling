export default function Controls({ sliceCount, imageIndex, updateImageIndex }) {
  const getNextSlice = () => {
    updateImageIndex(imageIndex + 1);
  };

  const getPrevSlice = () => {
    updateImageIndex(imageIndex - 1);
  };
  return (
    <div className="mt-[100%]">
      <input
        type="button"
        id="prev_slice"
        onClick={getPrevSlice}
        value="Prev"
        className="bg-green-500 hover:bg-green-700 text-white px-5 text-xl border border-green-700 rounded"
      />
      <span className="mx-5">
        {imageIndex} / {sliceCount}
      </span>
      <input
        type="button"
        id="next_slice"
        onClick={getNextSlice}
        value="Next"
        className="bg-green-500 hover:bg-green-700 text-white px-5 text-xl border border-green-700 rounded"
      />
    </div>
  );
}
