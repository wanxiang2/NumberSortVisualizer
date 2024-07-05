
   import { useState, useRef, useEffect } from "react";
   import './NumberSort.css';
   
   function NumberSort() {
       // This is to create and render the initial boxes onto the screen.
       const [numBoxes, setNumBoxes] = useState([]);
       const containerRef = useRef(null);
   
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
           newInputValues[index] = event.target.value === "" ? null : parseInt(event.target.value);   // If the user types a number in a box
                                                                                                      // and then deletes it then the value in 
                                                                                                      // <input> will be "". This changes "" 
                                                                                                      // back to null so we can remove it when 
                                                                                                      // the button is clicked.
           setInputValues(newInputValues);
       };
   
       const [colorChange, setColorChange] = useState(false);
       const [moveUp, setMoveUp] = useState(false);
       const [buttonFade, setButtonFade] = useState(false);
   
       const [position, setPosition] = useState([]);
   
       // This is a recursive function that animates the divide stage of Merge Sort.
       const animateMergeSortTree = (container, values, depth = 1) => {
           if (values.length <= 1) {
               return;
           }
   
           const midIndex = Math.floor(values.length / 2);
           const leftValues = values.slice(0, midIndex);
           const rightValues = values.slice(midIndex);
   
           const leftContainer = document.createElement('div');
           const rightContainer = document.createElement('div');
           leftContainer.className = `merge-sort-container left depth-${depth}`;
           rightContainer.className = `merge-sort-container right depth-${depth}`;
   
           leftValues.forEach(value => {
               const box = document.createElement('div');
               box.className = 'box-clone';
               box.textContent = value;
               leftContainer.appendChild(box);
           });
   
           rightValues.forEach(value => {
               const box = document.createElement('div');
               box.className = 'box-clone';
               box.textContent = value;
               rightContainer.appendChild(box);
           });
   
           container.appendChild(leftContainer);
           container.appendChild(rightContainer);
   
           setTimeout(() => {
               recordBoxPositions(depth);
               animateMergeSortTree(leftContainer, leftValues, depth + 1);
               animateMergeSortTree(rightContainer, rightValues, depth + 1);
   
               
           }, 500);
       };
   
       
   
       const recordBoxPositions = (depth) => {
           var levelBoxPositions = null;
           if (depth === 0) {
                levelBoxPositions = document.querySelectorAll(`.merge-sort-container.initial .box-clone`);
           } else {
                levelBoxPositions = document.querySelectorAll(`.merge-sort-container.depth-${depth} .box-clone`);
           }

           setPosition(prevPosition => {
               const newPosition = [...prevPosition];
               if (!newPosition[depth]) {
                   newPosition[depth] = [];
               }
   
               levelBoxPositions.forEach(element => {
                   const rect = element.getBoundingClientRect();
                   newPosition[depth].push({ top: rect.top, left: rect.left });
               });
   
               return newPosition;
           });
       };
   
       // This calls the MergeSort function in the MergeSort.js file to sort the array of user input
       // numbers. It then stores this sorted array in inputValues.
       const clickHandler = () => {
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
   
           // Starts the divide animation of Merge Sort.
           setTimeout(() => {
               if (containerRef.current) {
                   containerRef.current.innerHTML = '';
                   const initialContainer = document.createElement('div');
                   initialContainer.className = 'merge-sort-container initial';
                   filteredInputValues.forEach(value => {
                       const box = document.createElement('div');
                       box.className = 'box-clone';
                       box.textContent = value;
                       initialContainer.appendChild(box);
                   });
                   containerRef.current.appendChild(initialContainer);
   
                   recordBoxPositions(0);
                   animateMergeSortTree(containerRef.current, filteredInputValues);
               }
           }, 1000);
       };
   
       return (
           <div className="main-container">
               <div ref={containerRef} className={`boxes ${moveUp ? 'move-up' : ''}`}>
                   {numBoxes.map((myBox, boxNumber) => (
                       <input 
                           key={boxNumber} 
                           className={`box ${colorChange ? 'color-change' : ''}`} 
                           type="number" 
                           value={inputValues[boxNumber] !== null ? inputValues[boxNumber] : ""} 
                           onChange={(event) => inputChangeHandler(boxNumber, event)}></input>
                   ))}
               </div>
   
               <button className={`button ${buttonFade ? 'button-fade' : ''}`} onClick={clickHandler}>Sort</button>
   
               <p>{JSON.stringify(position)}</p> 
           </div>
       );
   }
   
   export default NumberSort;
   
   
   


