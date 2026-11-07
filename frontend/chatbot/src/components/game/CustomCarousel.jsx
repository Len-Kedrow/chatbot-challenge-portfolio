import React from "react";

const CustomCarousel = ({
  category,
  optionsCount,
  selectedOption,
  onChange,
}) => {
  const handlePrev = () => {
    const newOption = selectedOption > 1 ? selectedOption - 1 : optionsCount;
    onChange(category, String(newOption));
  };

  const handleNext = () => {
    const newOption = selectedOption < optionsCount ? selectedOption + 1 : 1;
    onChange(category, String(newOption));
  };

  return (
    <div className="custom-carousel">
      <button onClick={handlePrev} className="carousel-arrow">
        {"<"}
      </button>
      <div className="carousel-option">{selectedOption}</div>
      <button onClick={handleNext} className="carousel-arrow">
        {">"}
      </button>
    </div>
  );
};

export default CustomCarousel;
