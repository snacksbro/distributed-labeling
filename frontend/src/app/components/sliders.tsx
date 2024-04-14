// Should be a floating component window that can be spawned via a keybind or the tool bar. The toolbar is a slide up and you get it. This component will contain two sliders, each with inputs at the end to manually input data if needed
import "./styles/sliders.css";

export default function SliderWindow({
  brightness,
  setBrightness,
  contrast,
  setContrast,
  minThreshold,
  setMinThreshold,
  maxThreshold,
  setMaxThreshold,
  grayscale,
  setGrayscale,
  inversion,
  setInversion,
}) {
  const handleMinThresholdUpdate = (event) => {
    if (event.target.value > maxThreshold) {
      setMaxThreshold(parseInt(event.target.value) + 1);
    }
    setMinThreshold(event.target.value);
  };

  const handleMaxThresholdUpdate = (event) => {
    if (event.target.value < minThreshold) {
      setMinThreshold(parseInt(event.target.value) - 1);
    }
    setMaxThreshold(event.target.value);
  };

  return (
    <div>
      <p className="underline text-lg">Image Adjustment</p>
      <label htmlFor="contrast">Contrast: </label>
      <br />
      <input
        id="contrast"
        type="range"
        min="0"
        max="100"
        className="w-[80%] mx-3"
        value={contrast}
        onChange={(e) => setContrast(e.target.value)}
      />
      <input
        className="slider-input border rounded"
        id="contrast-input"
        onChange={(e) => setContrast(e.target.value)}
        value={contrast}
      />
      <br />
      <label htmlFor="brightness">Brightness: </label>
      <br />
      <input
        id="brightness"
        onChange={(e) => setBrightness(e.target.value)}
        type="range"
        className="w-[80%] mx-3"
        value={brightness}
        min="0"
        max="100"
      />
      <input
        className="slider-input border rounded"
        id="brightness-input"
        onChange={(e) => setBrightness(e.target.value)}
        value={brightness}
      />
      <br />
      <div className="threshold-sliders">
        <p className="underline text-lg">Thresholding</p>
        <label htmlFor="threshold-min">Threshold Min: </label>
        <br />
        <input
          className="w-[80%] mx-3"
          id="threshold-min"
          onChange={handleMinThresholdUpdate}
          type="range"
          value={minThreshold}
          min="0"
          max="100"
        />
        <input
          className="slider-input border rounded"
          id="threshold-min-input"
          onChange={handleMinThresholdUpdate}
          value={minThreshold}
        />
        <br />
        <label htmlFor="threshold-max">Threshold Max: </label>
        <br />
        <input
          className="w-[80%] mx-3"
          id="threshold-max"
          onChange={handleMaxThresholdUpdate}
          type="range"
          value={maxThreshold}
          min="0"
          max="100"
        />
        <input
          className="slider-input border rounded"
          id="threshold-max-input"
          onChange={handleMaxThresholdUpdate}
          value={maxThreshold}
        />
      </div>
      <div>
        <p className="underline text-lg">Colorspace</p>
        <label htmlFor="grayscale">Grayscale: </label>
        <input
          id="grayscale"
          type="checkbox"
          checked={grayscale}
          onChange={() => setGrayscale(!grayscale)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <br />
        <label htmlFor="inversion">Inversion: </label>
        <input
          id="inversion"
          type="checkbox"
          checked={inversion}
          onChange={() => setInversion(!inversion)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
