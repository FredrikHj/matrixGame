import './App.css';
import React, { useState, useEffect } from 'react';
function App() {
  // Decide when starting the game
  let [matrixIsSet, setMatrixIsSet] = useState(false);
  let [matrixSize, setMatrixSize] = useState([]);
  let [stdinPosX, setStdinPosX] = useState(0);
  let [stdinPosY, setStdinPosY] = useState(0);
  let [moveCommand, setMoveCommand] = useState('');
  
  // Incomming values as as string with total 4 letters from the input form according: wh(SartPosX)(startPosY)
  let [startValueStr, setStartValueStr] = useState('');
  
  useEffect(() => {
  },[matrixSize, startValueStr, stdinPosX, stdinPosY])
  
  let handleValues = (e) => {
    let targetValues = e.target;
    // Save the incomming strign to a common command string
    let stdin = targetValues.value;    
    setStartValueStr(stdin);
  }
  let playMatrix = () => {
    const startValueArr = startValueStr.split('');
    let matrixSurface = {width: [], height: []};
    //const startPoss = `${},${startValueArr[3]}`;
    
    // Rewrite the incomming string for wh into numer and save it in matrixSurface as a nr for later use
    for (let index = 0; index < startValueStr[0]; index++) matrixSurface.width.push(index);
    for (let index = 0; index < startValueStr[1]; index++) matrixSurface.height.push(index);
    
    // Rewrite the incomming string for startposs at xy into nr and save it in 
    setStdinPosX(parseInt(startValueArr[2]));
    setStdinPosY(parseInt(startValueArr[3]));
      
    setMatrixSize(matrixSurface);
    //setObjectStartPossStr(startPoss);
    // Showing the Matrix :)
    setMatrixIsSet(true);
  }
  let checIfkObject = (startPosX, startPosY) =>{
    // Check where the object should be in the game start and the movment´s commands 
    if(stdinPosX === startPosX && stdinPosY === startPosY) return 'red';
    else return 'lightblue';
  }
  const movment = (e) => {
    // Convert the command from string into nr
    const targetBtn = parseInt(e.target.id);
    console.log("🚀 ~ file: MainApp.js ~ line 53 ~ movment ~ targetBtn", targetBtn)
    if(targetBtn === 1) setStdinPosY(stdinPosY-1);
    if(targetBtn === 2) setStdinPosY(stdinPosY+1);
    if(targetBtn === 3) setStdinPosX(stdinPosX+1);
    if(targetBtn === 4) setStdinPosX(stdinPosX-1);
  }
  console.log("🚀 ~ file: MainApp.js ~ line 16 ~ App ~ stdinPosX", stdinPosX, "och stdinPosY", stdinPosY)
  return (
    <section className="mainApp">
      <header id="head">
        <section id="startValuesContainer">
          <label id="xyCells">
            Antal Celler i Bredd (X) / Höjd (Y)
            <br></br>
            samt startposition i XY enligt: xyxy
          </label>
          <input type="text" id="startValueInput" onChange={handleValues} placeholder="  ..." maxLength="4"/>
        </section>    
        <br></br>
        <section id="matrixBoard">
          <button id="playMatrix" onClick={playMatrix}>Spela Matrix</button>
        </section>
      </header>
      <hr></hr>

      <main>
        <section id="moving">
          <p id="Headline">Förflyttnings -</p>
          <section id="moveBtnCrossContainer">
              <button className="forward" id="1" onClick={movment}>Frammåt</button>
            <section id="moveBtnRow">
              <button id="4" onClick={movment}>Vänster</button>
              <button id="3" onClick={movment}>Höger</button> 
            </section>
              <button className="backward" id="2" onClick={movment}>Bakåt</button> 
          </section>
        </section>
          <button id="0" onClick={movment}>Avsluta</button> 
        <section id="matrixTabell">

          {(matrixIsSet === false)
            ? 'Välj antal celler inkl startpossition !'
            :
            /* height = row and width = Col */
            matrixSize.height.map((item, rowIndex) =>{
              return(
                <section key={`Row${rowIndex}Container`} className="row">
                  {
                    matrixSize.width.map((item, colIndex) =>{
                      /* Styling the showing object, the objects should be showing in red */
                      const objectStyle = {
                        width: '75px',
                        border: '1px solid black',
                        backgroundColor: checIfkObject(colIndex, rowIndex),
                      }
                      //console.log("🚀 ~ file: MainApp.js ~ line 89 ~ matrixSize.width.map ~ objectStyle", objectStyle)
                      return(
                        <section key={`Col${colIndex}`} id={`${colIndex}x${rowIndex}`} style={objectStyle}>
                          <p key={`Col${rowIndex},${colIndex}`} className="cel">{`${colIndex}, ${rowIndex}`}</p>
                        </section>
                      );
                    })
                  }
                </section>
              )
            })
          }
        </section>
      </main>
    </section>
  );
}

export default App;
