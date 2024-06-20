import { useState, useEffect } from "react";

import './NumberSort.css';

function NumberSort() {
    
    const [numBoxes, setNumBoxes] = useState([]);

    useEffect(() => {
        const boxes = [];
        for (let box = 0; box < 5; box++) {
            boxes.push([]);
        }
        setNumBoxes(boxes);
    }, []);

    return (
        <div className="container">
            <div className="boxes">
                {numBoxes.map((myBox, boxNumber) => (
                    <input key={boxNumber} className="box" type="number"></input>
                ))}
            </div>

            <button className="button">Sort</button>
        </div>
        
    );
    
}

export default NumberSort;