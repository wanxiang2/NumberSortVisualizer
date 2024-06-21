import { useState, useEffect } from "react";

import './NumberSort.css';

import { mergeSort } from '../Algorithms/MergeSort';

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
    const [inputValues, setInputValues] = useState(new Array(5).fill(0));

    const inputChangeHandler = (index, event) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = parseInt(event.target.value);
        setInputValues(newInputValues);
    };

    // This calls the MergeSort function in the MergeSort.js file to sort the array of user input
    // numbers. It then stores this sorted array in inputValues.
    const clickHandler = () => {
        let sortedArray = mergeSort(inputValues);
        setInputValues(sortedArray);
    }

    return (
        <div className="container">
            <div className="boxes">
                {numBoxes.map((myBox, boxNumber) => (
                    <input key={boxNumber} className="box" type="number" onChange={(event) => inputChangeHandler(boxNumber, event)}></input>
                ))}
            </div>

            <button className="button" onClick={clickHandler}>Sort</button>

            <p>{JSON.stringify(inputValues)}</p> 
           
        </div>
         
    );
    
}

export default NumberSort;