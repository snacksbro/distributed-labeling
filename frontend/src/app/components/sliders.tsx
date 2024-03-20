// Should be a floating component window that can be spawned via a keybind or the tool bar. The toolbar is a slide up and you get it. This component will contain two sliders, each with inputs at the end to manually input data if needed

export default function SliderWindow({ brightness, updateBrightness }) {
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
    </div>
  );
}
