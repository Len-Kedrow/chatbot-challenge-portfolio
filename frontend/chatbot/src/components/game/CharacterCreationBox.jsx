import React, { useState, useRef, useEffect } from "react";
import "./CharacterCreationBox.css";
import CustomCarousel from "./CustomCarousel";

// Base paths for SVG assets
const femaleSvgBasePath = "/src/assets/character_creation/female/";
const maleSvgBasePath = "/src/assets/character_creation/male/";
const backgroundSvgBasePath = "/src/assets/character_creation/";

// Default selections for male and female characters
const initialMaleSelection = {
  background: "2",
  skin: "3",
  hair: "7",
  beard: "5",
  shirt: "1",
  nose: "4",
  mouth: "5",
  eyes: "6",
  eyebrows: "6",
};

const initialFemaleSelection = {
  background: "1",
  skin: "2",
  hair: "3",
  shirt: "1",
  nose: "3",
  mouth: "4",
  eyes: "6",
  eyebrows: "6",
};

const maleOptions = {
  background: 3,
  skin: 3,
  hair: 7,
  beard: 5,
  shirt: 3,
  nose: 6,
  mouth: 5,
  eyes: 6,
  eyebrows: 6,
};

const femaleOptions = {
  background: 3,
  skin: 3,
  hair: 8,
  shirt: 3,
  nose: 6,
  mouth: 5,
  eyes: 6,
  eyebrows: 6,
};

const CharacterCreationBox = ({ canvasRef, onImageCapture }) => {
  const [isMale, setIsMale] = useState(true);
  const [selection, setSelection] = useState(initialMaleSelection);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 600;
      canvas.height = 600;
    }
  }, [canvasRef]);

  // Handle gender selection
  const handleGenderSelection = (gender) => {
    setIsMale(gender === "male");
    setSelection(
      gender === "male" ? initialMaleSelection : initialFemaleSelection
    );
  };

  // Handle changes in selection
  const handleSelectionChange = (category, option) => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      [category]: option,
    }));
  };

  // Construct the image path based on selection
  const constructImagePath = (category, option) => {
    if (category === "background") {
      return `${backgroundSvgBasePath}background_${option}.svg`;
    } else if (isMale) {
      return `${maleSvgBasePath}man_${category}_${option}.svg`;
    } else {
      return `${femaleSvgBasePath}woman_${category}_${option}.svg`;
    }
  };

  // Load an image and draw it onto the canvas
  const drawImageOnCanvas = (ctx, imagePath, x, y, width, height) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imagePath;
      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
        resolve(); // Resolve the promise when the image is drawn
      };
      img.onerror = (error) => {
        console.error(`Failed to load image at ${imagePath}`, error);
        reject(error); // Reject the promise if the image fails to load
      };
    });
  };

  // Utility function to add a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Draw the character on the canvas when the component renders
  useEffect(() => {
    const drawCharacter = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw each part of the character on the canvas
          await drawImageOnCanvas(
            ctx,
            constructImagePath("background", selection.background),
            0,
            0,
            canvas.width,
            canvas.height
          );
          await drawImageOnCanvas(
            ctx,
            constructImagePath("skin", selection.skin),
            0,
            0,
            canvas.width,
            canvas.height
          );
          await drawImageOnCanvas(
            ctx,
            constructImagePath("hair", selection.hair),
            0,
            0,
            canvas.width,
            canvas.height
          );
          if (isMale) {
            await drawImageOnCanvas(
              ctx,
              constructImagePath("beard", selection.beard),
              0,
              0,
              canvas.width,
              canvas.height
            );
          }
          await drawImageOnCanvas(
            ctx,
            constructImagePath("shirt", selection.shirt),
            0,
            0,
            canvas.width,
            canvas.height
          );
          await drawImageOnCanvas(
            ctx,
            constructImagePath("nose", selection.nose),
            0,
            0,
            canvas.width,
            canvas.height
          );
          await drawImageOnCanvas(
            ctx,
            constructImagePath("mouth", selection.mouth),
            0,
            0,
            canvas.width,
            canvas.height
          );
          await drawImageOnCanvas(
            ctx,
            constructImagePath("eyes", selection.eyes),
            0,
            0,
            canvas.width,
            canvas.height
          );
          await drawImageOnCanvas(
            ctx,
            constructImagePath("eyebrows", selection.eyebrows),
            0,
            0,
            canvas.width,
            canvas.height
          );

          // Add a small delay to ensure the canvas is fully rendered
          await delay(100);

          // Capture the image from the canvas after all images are drawn
          if (onImageCapture && typeof onImageCapture === "function") {
            const dataURL = canvas.toDataURL("image/png");
            onImageCapture(dataURL); // Pass the base64 PNG image to the callback
          }
        }
      }
    };

    drawCharacter();
  }, [selection, canvasRef, onImageCapture, isMale]);


  return (
    <div className="character-creation-box">
      <h1>Customize your Character</h1>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div className="character-preview">
        <img
          src={constructImagePath("background", selection.background)}
          alt="Background"
        />
        <img src={constructImagePath("skin", selection.skin)} alt="Skin" />
        <img src={constructImagePath("hair", selection.hair)} alt="Hair" />
        {isMale && (
          <img src={constructImagePath("beard", selection.beard)} alt="Beard" />
        )}
        <img src={constructImagePath("shirt", selection.shirt)} alt="Shirt" />
        <img src={constructImagePath("nose", selection.nose)} alt="Nose" />
        <img src={constructImagePath("mouth", selection.mouth)} alt="Mouth" />
        <img src={constructImagePath("eyes", selection.eyes)} alt="Eyes" />
        <img
          src={constructImagePath("eyebrows", selection.eyebrows)}
          alt="Eyebrows"
        />
      </div>
      <div className="gender-selection">
        <button
          onClick={() => handleGenderSelection("male")}
          className="gender-button"
        >
          Male
        </button>
        <button
          onClick={() => handleGenderSelection("female")}
          className="gender-button"
        >
          Female
        </button>
      </div>
  
      {/* Customization container */}
      <div className="customization-container">
        <div className="controls">
          {Object.keys(isMale ? maleOptions : femaleOptions).map((category) => (
            <div key={category} className="control-category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <CustomCarousel
                category={category}
                optionsCount={
                  isMale ? maleOptions[category] : femaleOptions[category]
                }
                selectedOption={parseInt(selection[category], 10)}
                onChange={handleSelectionChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
};

export default CharacterCreationBox;



