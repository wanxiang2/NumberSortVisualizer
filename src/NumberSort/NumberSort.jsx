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
    const [inputValues, setInputValues] = useState(new Array(5).fill(null));

    const inputChangeHandler = (index, event) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value === "" ? null : parseInt(event.target.value);  // If the user types a number in a box
                                                                                                  // and then deletes it then the value in 
                                                                                                  // <input> will be "". This changes "" 
                                                                                                  // back to null so we can remove it when 
                                                                                                  // the button is clicked.
        setInputValues(newInputValues);
    };

    const [colorChange, setColorChange] = useState(false);
    const [moveUp, setMoveUp] = useState(false);
    const [buttonFade, setButtonFade] = useState(false);

    // This calls the MergeSort function in the MergeSort.js file to sort the array of user input
    // numbers. It then stores this sorted array in inputValues.
    const clickHandler = () => {
        //let sortedArray = mergeSort(inputValues);
        //setInputValues(sortedArray);

        // Restructures the inputValues array so that input tags with no user input at the time
        // of the button being clicked is removed from the inputValues array.
        const prevInputValues = [...inputValues];
        const filteredInputValues = prevInputValues.filter(num => (num !== null));
        setInputValues(filteredInputValues);

        // Restructures the boxes layout on the webpage when the button is clicked so that the
        // number of boxes shown matches the number of values the inputValues array has.
        const newNumBoxes = new Array(filteredInputValues.length).fill([]);
        setNumBoxes(newNumBoxes);

        // Animates the button fading away and the boxes moving up when the button is clicked.
        setColorChange(true);
        setButtonFade(true);
        setTimeout(() => {
            setMoveUp(true);
        }, 250);
    }

    return (
        <div className="container">
            <div className={`boxes ${moveUp ? 'move-up' : ''}`}>
                {numBoxes.map((myBox, boxNumber) => (
                    <input key={boxNumber} className={`box ${colorChange ? 'color-change' : ''}`} type="number" value={inputValues[boxNumber] !== null ? inputValues[boxNumber] : ""} onChange={(event) => inputChangeHandler(boxNumber, event)}></input>
                ))}
            </div>

            <button className={`button ${buttonFade ? 'button-fade' : ''}`} onClick={clickHandler}>Sort</button>
        </div>
         
    );
    
}

export default NumberSort;