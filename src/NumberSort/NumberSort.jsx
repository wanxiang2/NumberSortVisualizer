import { useState, useEffect } from "react";

import './NumberSort.css';

function NumberSort() {
    // This is to create and render the initial boxes onto the screen.
    const [numBoxes, setNumBoxes] = useState([]);

    useEffect(() => {
        const boxes = [];
        for (let box = 0; box < 5; box++) {
            boxes.push([]);
        }
        setNumBoxes(boxes);
    }, []);

    // This saves the numbers that the user inputs into the boxes into an array called inputValues.
    const [inputValues, setInputValues] = useState(new Array(5));

    const inputChangeHandler = (index, event) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    };

    return (
        <div className="container">
            <div className="boxes">
                {numBoxes.map((myBox, boxNumber) => (
                    <input key={boxNumber} className="box" type="number" onChange={(event) => inputChangeHandler(boxNumber, event)}></input>
                ))}
            </div>

            <button className="button">Sort</button>

        </div>
        
    );
    
}

export default NumberSort;