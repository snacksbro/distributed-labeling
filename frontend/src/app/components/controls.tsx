export default function Controls({ sliceCount, imageIndex, updateImageIndex }) {
  const getNextSlice = () => {
    updateImageIndex(imageIndex + 1);
  };

  const getPrevSlice = () => {
    updateImageIndex(imageIndex - 1);
  };
  return (
    <div>
      <input
        type="button"
        id="prev_slice"
        onClick={getPrevSlice}
        value="Prev"
      />
      <span>
        {imageIndex} / {sliceCount}
      </span>
      <input
        type="button"
        id="next_slice"
        onClick={getNextSlice}
        value="Next"
      />
    </div>
  );
}
