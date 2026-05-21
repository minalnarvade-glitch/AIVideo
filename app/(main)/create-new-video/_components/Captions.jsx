"use client";
import React, { useState } from "react";

const captionOptions = [
  {
    value: "youtube",
    label: "YOUTUBER",
    color: "text-yellow-400 border-yellow-400",
  },
  {
    value: "supreme",
    label: "Supreme",
    color: "text-white border-red-500 bg-red-500/10",
  },
  {
    value: "neon",
    label: "NEON",
    color: "text-green-400 border-green-400",
  },
  {
    value: "glitch",
    label: "GLITCH",
    color: "text-pink-400 border-pink-500",
  },
  {
    value: "fire",
    label: "FIRE",
    color: "text-orange-400 border-orange-500",
  },
  {
    value: "futuristic",
    label: "FUTURISTIC",
    color: "text-blue-400 border-blue-500",
  },
];

function Captions({ onHandleInputChange }) {
  const [selectedCaption, setSelectedCaption] = useState("");

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Video Captions</h2>
      <p className="text-sm text-gray-400">
        Select caption style for your video
      </p>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {captionOptions.map((caption) => (
          <div
            key={caption.value}
            onClick={() => {
              setSelectedCaption(caption.value);
              onHandleInputChange("caption", caption.value);
            }}
            className={`
              cursor-pointer
              p-4 rounded-xl border
              text-center font-bold tracking-wide
              transition-all duration-200
              hover:scale-105
              ${caption.color}
              ${
                selectedCaption === caption.value
                  ? "border-white shadow-lg scale-105"
                  : "border-gray-700"
              }
            `}
          >
            {caption.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Captions;