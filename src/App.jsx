import React, { useState, useRef } from "react";
import greetingImage from "./assets/defence.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const handleGenerateCard = () => {
    if (!name.trim() || !designation.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    setShowCard(true);
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${name || "greeting-card"}.pdf`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{ backgroundColor: "#f3f4f6" }} // gray-100 → HEX
    >
      <div className="w-full max-w-md space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block font-bold mb-1"
            style={{ color: "#000000" }} // black text
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 rounded focus:outline-none"
            style={{
              borderColor: "#d1d5db", // gray-300 → HEX
              borderRadius: "8px",
              color: "#000000",
              backgroundColor: "#ffffff",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")} // blue-500
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        <div>
          <label
            htmlFor="designation"
            className="block font-bold mb-1"
            style={{ color: "#000000" }}
          >
            Designation
          </label>
          <textarea
            id="designation"
            rows="1"
            placeholder="Enter your designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-3 border-2 rounded resize-none focus:outline-none"
            style={{
              borderColor: "#d1d5db",
              color: "#000000",
              backgroundColor: "#ffffff",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleGenerateCard}
            className="py-3 px-6 rounded transition"
            style={{
              backgroundColor: "#2563eb", // blue-600
              color: "#ffffff",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")} // blue-700
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Generate Card
          </button>

          {showCard && (
            <button
              onClick={handleDownloadPDF}
              className="py-3 px-6 rounded transition"
              style={{
                backgroundColor: "#16a34a", // green-600
                color: "#ffffff",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")} // green-700
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      {showCard && (
        <div
          ref={cardRef}
          className="w-full max-w-[700px] relative rounded-lg overflow-hidden shadow-lg mt-10"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb", // gray-200 border for print clarity
          }}
        >
          <img
            src={greetingImage}
            alt="Greeting Card Background"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute -space-y-1 top-1/2 left-1/2 w-[90%] text-center text-black transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ color: "#000000" }}
          >
            <h2
              className="font-bold text-start sm:mt-7 mt-5"
              style={{
                fontSize: "clamp(18px, 2.5vw, 36px)",
                color: "#1d4595", // blue shade
                textShadow: "1px 1px 2px #ffffff",
              }}
            >
              {name}
            </h2>
            <p
              className="text-start sm:mb-16 mb-8 sm:text-xl text-sm -mt-1.5 sm:mt-0"
              style={{
                color: "#1f2937", // gray-800
                fontWeight: "600",
                textShadow: "1px 1px 2px #ffffff",
              }}
            >
              {designation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
