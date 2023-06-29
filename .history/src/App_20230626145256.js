import './App.css';
import React, { useState, useEffect } from 'react';
import { BsStopwatch } from 'react-icons/bs'

function App() {
  const [stopwatchData, setStopwatchData] = useState([
  { id: 0, name: "Timer 1", time: 0, isRunning: false, lap: [], time_started: 0, pause: [] },
 ])
 const [selectedRow, setSelectedRow] = useState(0)
 useEffect(() => {
  const interval = setInterval(() => {
   setStopwatchData(stopwatchData.map((stopwatch) => {
    if (stopwatch.isRunning) {
     return { ...stopwatch, time: new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0) }
    }
    return stopwatch
   }))
  }, 10)
  return () => clearInterval(interval)
 }, [stopwatchData])

 const handleStart = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, isRunning: true, time_started: new Date() - stopwatch.time - stopwatch.pause.reduce((a, b) => a + b, 0) }
   }
   return stopwatch
  }))
 }
 
 const handleStop = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, isRunning: false, pause: [...stopwatch.pause, new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0)] }
   }
   return stopwatch
  }))
 }
 
 const handleReset = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, time: 0, isRunning: false, lap: [] }
   }
   return stopwatch
  }))
 }
 
 const handleLap = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, lap: [...stopwatch.lap, stopwatch.time] }
   }
   return stopwatch
  }))
 }
 return (
  <div className="App">
   <div className='container'>
    <div className='left'>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
      <div style={{ textAlign: "left" }}>
       <h1 style={{ fontWeight: "bold", fontSize: 30 }}>Stopwatch</h1>
       <p style={{ fontWeight: "normal", fontSize: 20 }}>Built by stackie</p>
      </div>
      <div style={{ cursor: "pointer", alignItems: "center", display: "flex", flexDirection: "row", gap: 10 }} onClick={() => setStopwatchData([...stopwatchData, { id: stopwatchData.length, name: `Timer ${stopwatchData.length + 1}`, time: 0, isRunning: false, lap: [], pause: [] }])}>
       <BsStopwatch size={20} color={"white"} />
       <p>Add Stopwatch</p>
      </div>
     </div>
 
     <p className='main-time-label'>{stopwatchData[selectedRow]?.time > 0 ? new Date(stopwatchData[selectedRow]?.time).toISOString().slice(11, -1) : "00:00:00.000"}</p>
     <div className="main-button-controls">
      <button className={"control-buttons"} onClick={() => handleStart(stopwatchData[selectedRow].id)}>Start</button>
      <button className={"control-buttons"} onClick={() => handleLap(stopwatchData[selectedRow].id)}>Lap</button>
      <button className={"control-buttons"} onClick={() => handleStop(stopwatchData[selectedRow].id)}>Stop</button>
      <button className={"control-buttons"} onClick={() => handleReset(stopwatchData[selectedRow].id)}>Reset</button>
     </div>
     <p className='lap-label'>Laps</p>
     <div className='lap-container'>
      {stopwatchData[selectedRow]?.lap.length > 0 && stopwatchData[selectedRow]?.lap.map((lap, index) => (
       <div style={{ display: "flex", justifyContent: "space-between", width: "500px" }}>
        <p>Lap {index + 1}</p>
        <p className='lap-time-label' key={index}>{new Date(lap).toISOString().slice(11, -1)}</p>
       </div>
      ))}
     </div>
 
This code will build the left side of our application. Based on the selected stopwatch, the stopwatch selected will be displayed on the left side of the screen.
 
Important!: For your submission, in line 64, you should replace 'stackie' with your StackUp profile name. 
 
The four buttons in lines 74 to 77 invoke the corresponding functions that we have defined in this quest. We applied both inline and CSS styles to format the elements. In line 81, we used the map() function to display the lap data. We also added a conditional statement to show the laps only when the selected stopwatch has more than zero laps.
 
Next, we will work out the code structure for the right side of our application. The right sidebar will give us a preview of the other timers and if they are running, we can see the current timing as well. Add the code below to line 90 of App.js. It should be within the <div> element with the className of “right”.
{stopwatchData.map((stopwatch) => (
      <div className="stopwatchContainer" key={stopwatch.id} style={{ cursor: "pointer" }} onClick={() => {
       setSelectedRow(stopwatch.id)
      }}>
       <div className="stopwatchName">
        <input className='name-label' value={stopwatch.name} onChange={(e) => {
         setStopwatchData(stopwatchData.map((stopwatchItem) => {
          if (stopwatchItem.id === stopwatch.id) {
           return { ...stopwatchItem, name: e.target.value }
          }
          return stopwatchItem
         }))
        }} />
       </div>
       <div className="stopwatchTime">
        <p className='time-label'>{new Date(stopwatch.time).toISOString().slice(11, -1)}</p>
        <p>{stopwatch.lap.length} laps</p>
       </div>
       <div className="stopwatchButtons">
        <button className={"control-buttons"} onClick={() => handleStart(stopwatch.id)}>Start</button>
        <button className={"control-buttons"} onClick={() => handleLap(stopwatch.id)}>Lap</button>
        <button className={"control-buttons"} onClick={() => handleStop(stopwatch.id)}>Stop</button>
        <button className={"control-buttons"} onClick={() => handleReset(stopwatch.id)}>Reset</button>
       </div>
      </div>
     ))}
    </div>
    <div className='right'>
      
    </div>
   </div>
  </div>
 );
}
 
export default App;
