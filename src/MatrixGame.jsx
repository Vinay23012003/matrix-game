import { useState, useRef } from "react";

function MatrixGame() {
    const [boxes, setBoxes] = useState(Array(9).fill("white"));
    const [clickOrder, setClickOrder] = useState([]);
    const intervalRef = useRef(null);

    const handleClick = (index) => {
        if (boxes[index] === "white") {
            setClickOrder((prevOrder) => {
                const newOrder = [...prevOrder, index];

                setBoxes((prevBoxes) => {
                    const updatedBoxes = [...prevBoxes];
                    updatedBoxes[index] = "green";
                    return updatedBoxes;
                });

                if (newOrder.length === 9) {
                    setTimeout(() => startOrangeAnimation(newOrder), 500);
                }

                return newOrder;
            });
        }
    };

    const startOrangeAnimation = (order) => {
        let i = -1; 
        intervalRef.current = setInterval(() => {
            if (i < order.length) {
                setBoxes((prevBoxes) => {
                    const updatedBoxes = [...prevBoxes];
                    updatedBoxes[order[i]] = "orange"; 
                    return updatedBoxes;
                });
                i++; 
            } else {
                clearInterval(intervalRef.current);
            }
        }, 500);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-blue-900 w-full">
            <h1 className="text-white text-3xl font-bold mb-6">Matrix Game</h1>
            <div className="grid grid-cols-3 gap-3 p-5 bg-gray-800 rounded-xl shadow-xl">
                {boxes.map((color, index) => (
                    <div
                        key={index}
                        className={`w-24 h-24 flex items-center justify-center cursor-pointer transition-all duration-300 
                          border-2 border-gray-300 rounded-lg shadow-md 
                            ${color === "white" ? "bg-gray-200 hover:bg-gray-300" : ""}
                            ${color === "green" ? "bg-green-500" : ""}
                            ${color === "orange" ? "bg-orange-500" : ""}
                        `}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MatrixGame;
