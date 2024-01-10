import { useState } from "react";

export default function ShowLabels() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleCheckboxChange = (value) => {
    // Check if the label is already selected
    if (selectedLabels.includes(value)) {
      // If selected, remove it from the array
      setSelectedLabels(selectedLabels.filter((label) => label !== value));
    } else {
      // If not selected, add it to the array
      setSelectedLabels([...selectedLabels, value]);
    }
  };
  const handleCreateLabel = () => {
    console.log("Selected Labels:", selectedLabels);
  };
  return (
    <div className="relative bg-gray-300 h-fit p-4">
      <input type="text" placeholder="Label Name" className="mb-4 p-2 border" />

      <div className="flex flex-col h-fit mb-4 p-2 border bg-white">
        <div className="flex flex-row">
          <input
            type="checkbox"
            name="vehicle1"
            value="bg-red-900"
            onChange={() => handleCheckboxChange("bg-red-900")}
          />
          <div className="h-10 bg-red-900 w-full"></div>
        </div>
        <div className="flex flex-row">
          <input
            type="checkbox"
            name="vehicle1"
            value="bg-cyan-600"
            onChange={() => handleCheckboxChange("bg-cyan-600")}
          />
          <div className="h-10 bg-cyan-600 w-full"></div>
        </div>
        <div className="flex flex-row">
          <input
            type="checkbox"
            name="vehicle1"
            value="bg-lime-800"
            onChange={() => handleCheckboxChange("bg-lime-800")}
          />
          <div className="h-10 bg-lime-800 w-full"></div>
        </div>
        <div className="flex flex-row">
          <input
            type="checkbox"
            name="vehicle1"
            value="bg-orange-400"
            onChange={() => handleCheckboxChange("bg-orange-400")}
          />
          <div className="h-10 bg-orange-400 w-full"></div>
        </div>
        <div className="flex flex-row">
          <input
            type="checkbox"
            name="vehicle1"
            value="bg-yellow-400"
            onChange={() => handleCheckboxChange("bg-yellow-400")}
          />
          <div className="h-10 bg-yellow-400 w-full"></div>
        </div>
      </div>

      <button
        onClick={handleCreateLabel}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Label
      </button>
    </div>
  );
}
