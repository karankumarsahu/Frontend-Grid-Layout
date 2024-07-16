import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const App = () => {
  const [participantGrid, setParticipantGrid] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setParticipantGrid(value);
    } else if (e.target.value === '') {
      setParticipantGrid(1);
    }
  };

  const generateGridTemplateRows = (num: number) => {
    if (num <= 3) return '1fr';
    if (num <= 6) return '1fr 1fr';
    if (num <= 9) return '1fr 1fr 1fr';
    return '1fr 1fr 1fr 1fr';
  };

  const gridHeight = participantGrid <= 3 ? 'h-full' : participantGrid <= 6 ? 'h-1/2' : participantGrid <= 9 ? 'h-1/3' : 'h-1/4';

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <div className="w-[85%] h-full m-auto pt-10">
          <form
            className="w-full flex items-center flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="number"
              max={10}
              min={1}
              value={participantGrid}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs rounded-lg px-4 h-10"
            />
            <button
              type="submit"
              className="btn bg-[#009E66] py-4 px-8 rounded-lg text-white mt-5"
            >
              Submit
            </button>
          </form>

          <div
            className={`h-[70vh] grid gap-4 mt-10 grid-cols-3 grid-rows-${generateGridTemplateRows(participantGrid)}`}
            style={{
              gridTemplateRows: generateGridTemplateRows(participantGrid),
            }}
          >
            {[...Array(participantGrid)].map((_, index) => (
              <div
                key={index}
                className={`w-full ${gridHeight} ${
                  index === 0 ? "bg-blue-500" : "bg-[#009E66]"
                } text-white rounded-lg flex items-center justify-center`}
              >
                {index === 0 ? "Self View" : `Participant ${index}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
