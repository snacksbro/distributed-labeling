// Should be a floating component window that can be spawned via a keybind or the tool bar. The toolbar is a slide up and you get it. This component will contain two sliders, each with inputs at the end to manually input data if needed
import "./styles/sliders.css";

export default function SliderWindow({
  brightness,
  updateBrightness,
  constast,
  setContrast,
  minThreshold,
  setMinThreshold,
  maxThreshold,
  setMaxThreshold,
}) {
  const handleMinThresholdUpdate = (event) => {
    if (event.target.value >= maxThreshold) {
      console.log("Seting max to " + event.target.value);
      setMaxThreshold(parseInt(event.target.value) + 1);
    }
    setMinThreshold(event.target.value);
  };

  const handleMaxThresholdUpdate = (event) => {
    if (event.target.value <= minThreshold) {
      console.log("Seting min to " + event.target.value);
      setMinThreshold(parseInt(event.target.value) - 1);
    }
    setMaxThreshold(event.target.value);
  };

  return (
    <div>
      <label htmlFor="contrast">Contrast: </label>
      <input id="contrast" type="range" min="1" max="100" />
      <label htmlFor="brightness">Brightness: </label>
      <input
        id="brightness"
        onChange={(e) => updateBrightness(e.target.value)}
        type="range"
        value={brightness}
        min="1"
        max="100"
      />
      <div className="threshold-sliders">
        <label htmlFor="threshold-min">Threshold Min: </label>
        <input
          className="slider"
          id="threshold-min"
          onChange={handleMinThresholdUpdate}
          type="range"
          value={minThreshold}
          min="1"
          max="100"
        />
        <br />
        <label htmlFor="threshold-max">Threshold Max: </label>
        <input
          className="slider"
          id="threshold-max"
          onChange={handleMaxThresholdUpdate}
          type="range"
          value={maxThreshold}
          min="1"
          max="100"
        />
      </div>
    </div>
  );
}
