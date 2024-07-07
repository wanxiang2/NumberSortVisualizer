// https://www.perplexity.ai/search/is-there-a-way-to-remember-the-BqrrVzvhQ9uLafMyoBcJTg


// The first thing you should do is create another state variable called finalPosition which is an array of all the positions
// of the single boxes. Then try positioning the className 'single-box' boxes that you create to those position from the 
// finalPosition. I think this might work because when I hit Sort twice last night the second time it did give the correct one
// but since position state is not accurate because the single boxes could be on the last level or second to last.
// Save your code by committing to GitHub first. This should not take too long.


// If you are unable to get it to work, there is a code version that ChatGPT gave you that works properly sort of.
// It divdes, then all boxes except the last level disappear, but the boxes are spread outward. Copy that code
// and that's the best we can do. We'll continue from that and try to do the rest of the merging animation.
// Once we're done with that we can add the bubbles background and then come back to solve the issue.

import { useState, useRef, useEffect } from "react";
import './NumberSort.css';

function NumberSort() {
    const [numBoxes, setNumBoxes] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const boxes = [];
        for (let box = 0; box < 5; box++) {
            boxes.push([]);
        }
        setNumBoxes(boxes);
    }, []);

    const [inputValues, setInputValues] = useState(new Array(5).fill(null));
    const [finalPositions, setFinalPositions] = useState([]);

    const inputChangeHandler = (index, event) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value === "" ? null : parseInt(event.target.value);
        setInputValues(newInputValues);
    };

    const [colorChange, setColorChange] = useState(false);
    const [moveUp, setMoveUp] = useState(false);
    const [buttonFade, setButtonFade] = useState(false);

    const [position, setPosition] = useState([]);

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
            box.className = leftValues.length === 1 ? 'single-box' : 'box-clone';
            box.textContent = value;
            leftContainer.appendChild(box);
        });

        rightValues.forEach(value => {
            const box = document.createElement('div');
            box.className = rightValues.length === 1 ? 'single-box' : 'box-clone';
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
        const levelBoxPositions = document.querySelectorAll(`.merge-sort-container.depth-${depth} .box-clone`);

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

        // Store the positions of the final level boxes
        if (depth === 1) {
            const finalPositions = Array.from(levelBoxPositions).map(element => {
                const rect = element.getBoundingClientRect();
                return { top: rect.top, left: rect.left };
            });
            setFinalPositions(finalPositions);
        }
    };

    const clickHandler = () => {
        const prevInputValues = [...inputValues];
        const filteredInputValues = prevInputValues.filter(num => (num !== null));
        setInputValues(filteredInputValues);

        const newNumBoxes = new Array(filteredInputValues.length).fill([]);
        setNumBoxes(newNumBoxes);

        setColorChange(true);
        setButtonFade(true);
        setTimeout(() => {
            setMoveUp(true);
        }, 250);

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

                setTimeout(() => {
                    const boxesToRemove = document.querySelectorAll(`.merge-sort-container .box-clone`);
                    boxesToRemove.forEach(removeBox => {
                        removeBox.className = 'boxes-fade';
                    });

                    // Fix positions of final level boxes
                    const finalLevelBoxes = document.querySelectorAll('.merge-sort-container .single-box');
                    finalLevelBoxes.forEach((box, index) => {
                        box.style.position = 'absolute';
                        box.style.top = `${finalPositions[index].top}px`;
                        box.style.left = `${finalPositions[index].left}px`;
                    });
                }, 2000);
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
        </div>
    );
}

export default NumberSort;





/*
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

    const clickHandler = () => {
        const prevInputValues = [...inputValues];
        const filteredInputValues = prevInputValues.filter(num => (num !== null));
        setInputValues(filteredInputValues);
    
        const newNumBoxes = new Array(filteredInputValues.length).fill([]);
        setNumBoxes(newNumBoxes);
    
        setColorChange(true);
        setButtonFade(true);
        setTimeout(() => {
            setMoveUp(true);
        }, 250);
    
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
    
                setTimeout(() => {
                    const boxesToRemove = document.querySelectorAll(`.merge-sort-container`);
                    boxesToRemove.forEach(removeBox => {
                        removeBox.classList.add('boxes-fade');
                    });
    
                    setTimeout(() => {
                        boxesToRemove.forEach(removeBox => removeBox.remove());
                        
                        


                        const lastDepth = position.length - 1;
                        filteredInputValues.forEach((value, index) => {
                            const singleBox = document.createElement('div');
                            singleBox.className = 'single-box';
                            singleBox.textContent = value;
    
                            if (position[lastDepth] && position[lastDepth][index]) {
                                singleBox.style.position = 'absolute';
                                singleBox.style.top = `${position[lastDepth][index]['top']}px`;
                                singleBox.style.left = `${position[lastDepth][index]['left']}px`;
                            }
    
                        
                            containerRef.current.appendChild(singleBox);
                        });
                    }, 500); // Ensure this timeout matches the duration of your fade-out animation
    
                }, 2000);
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

        </div>
    );
}

export default NumberSort;

*/



  
  
  
  
  
  /*
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

       //const [boxesFade, setBoxesFade] = useState(false);
   
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
           if (values.length === 2) {
                leftContainer.className = 'single-box-container left';
                rightContainer.className = 'single-box-container right';
           } else if (values.length === 3) {
                leftContainer.className = 'single-box-container left';
                rightContainer.className = `merge-sort-container right depth-${depth}`;
           } else {
                leftContainer.className = `merge-sort-container left depth-${depth}`;
                rightContainer.className = `merge-sort-container right depth-${depth}`;
           }

           leftValues.forEach(value => {
                if (leftValues.length === 1) {
                    const box = document.createElement('div');
                    box.className = 'single-box';
                    box.textContent = value;
                    leftContainer.appendChild(box);
                } else {
                    const box = document.createElement('div');
                    box.className = 'box-clone';
                    box.textContent = value;
                    leftContainer.appendChild(box);
                }
           });
   
           rightValues.forEach(value => {
                if (rightValues.length === 1) {
                    const box = document.createElement('div');
                    box.className = 'single-box';
                    box.textContent = value;
                    rightContainer.appendChild(box);
                } else {
                    const box = document.createElement('div');
                    box.className = 'box-clone';
                    box.textContent = value;
                    rightContainer.appendChild(box);
                }
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


                   
                   setTimeout(() => {
                        

                        const boxesToRemove = document.querySelectorAll(`.merge-sort-container`);
                        boxesToRemove.forEach(removeBox => {
                            removeBox.className = 'boxes-fade';
                            removeBox.remove();
                        });
                   }, 2000)
                   

                   
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

           </div>
       );
   }
   
   export default NumberSort;
   
   */


