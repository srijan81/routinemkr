import React, {useState} from 'react';
import "./styles/style.css";
import "./componenets/arrayMaker.js"
import { ArrayMaker } from './componenets/arrayMaker.js';
import {TableTeacher} from "./componenets/TableTeacher";
import {TableClass} from "./componenets/TableClass";

function App() {
  const [notice, setNotice] = useState("Welcome To redLazyroutinemaker");
  const dayStart = {
    hour: 10,
    minute: 0
  };
  const leastCount = {
    hour: 0,
    minute: 60
  };
  const dayEnd = {
    hour: 16,
    minute: 0
  };
  
  let [teacherArray, setTeacherArray] = useState([]);
  let [classArray, setClassArray] = useState([]);
  let [teacherNamesArray, setTeacherNamesArray] = useState([]);
  let [classNamesArray, setClassNamesArray] = useState([]);
  let [selectedTeacher, setSelectedTeacher] = useState(0);

  const addTeacher = () => {
    const teacherName = prompt("Enter Teacher Name");
    if(teacherName === null)
      return;
    let dummyNames = JSON.parse(JSON.stringify(teacherNamesArray));
    dummyNames.push(teacherName);
    setTeacherNamesArray(dummyNames);

    let dummyArray = JSON.parse(JSON.stringify(teacherArray));
    dummyArray.push(ArrayMaker(dayStart, leastCount, dayEnd))
    setTeacherArray(dummyArray);
  }

  const addClass = () => {
    if(teacherArray.length === 0){
      setNotice("Please add some teachers first");
      return;
    }
    const className = prompt("Enter Class Name");
    let dummyNames = JSON.parse(JSON.stringify(classNamesArray));
    dummyNames.push(className);
    setClassNamesArray(dummyNames);
    let dummyArray = JSON.parse(JSON.stringify(classArray));
    dummyArray.push(ArrayMaker(dayStart, leastCount, dayEnd))
    setClassArray(dummyArray);
    classArray.forEach((weekArray, whichClass)=>{
      weekArray.forEach((dayArray, whichDay)=>{
        dayArray.forEach((period, whichPeriod)=>console.log(`${period.value} classArray[${whichClass}][${whichDay}][${whichPeriod}]`))
      })
    })
  }

  const resolveClass = (classIndex) => {
    let returnVar;
    classNamesArray.forEach((name, index)=>{
      if(classIndex === index)
        returnVar = name;
    })
    return returnVar;
  }

  const resolveTeacher = (teacherIndex) => {
    let returnVar;
    teacherNamesArray.forEach((name, index)=>{
      if(teacherIndex === index)
        returnVar = name;
    })
    return returnVar;
  }

  const isSelected = (num) => {
    let returnVar;
    if(num === selectedTeacher){
      returnVar = 1;
    } else {
      returnVar = 0;
    }
    return returnVar;
  }

  const isFree = (whichTeacher, whichDay, whichPeriod)=>{
    if(teacherArray[whichTeacher][whichDay][whichPeriod].value === "Busy")
      return false;
    else
      return true;
  }

  const classCellUpdateData = (whichClass, whichDay, whichPeriod, data) => {
    let dummyClassData = JSON.parse(JSON.stringify(classArray));
    dummyClassData[whichClass][whichDay][whichPeriod].value = data;
    setClassArray(dummyClassData);
  }

  const teacherCellUpdateData = (whichTeacher, whichDay, whichPeriod, data) => {
    let dummyTeacherData = JSON.parse(JSON.stringify(teacherArray));
    dummyTeacherData[whichTeacher][whichDay][whichPeriod].value = data;
    setTeacherArray(dummyTeacherData);
  }

  return (
    <div className="backGradient w-full h-screen master-grid">  
      <div className="teacherDiv frontGradient mx-8 shadow-2xl flex overflow-x-auto">
        {teacherArray.map((weekArray, whichTeacher)=>{
        return (<div className="flex">
          {(whichTeacher !== 0)?<div className="h-full w-16 flex-shrink-0" />:""}
          <TableTeacher weekArray={weekArray} resolveTeacher={resolveTeacher} resolveClass={resolveClass} whichTeacher={whichTeacher} teacherCellUpdateData={teacherCellUpdateData} classCellUpdateData={classCellUpdateData} dayStart={dayStart} leastCount={leastCount} dayEnd={dayEnd} isSelected={isSelected} setSelectedTeacher={setSelectedTeacher} selectedTeacher={selectedTeacher}/>
          </div>)
        })}
      </div>
      <div className="buttonDivs w-full flex px-16 items-center">
        <div id="alertFeild" className="flex-grow text-center text-gray-400 text-opacity-75 text-2xl py-8">
          {`${notice}`}
        </div>
        <div className="w-1/4 items-center">
          <div className="bg-red-700 bg-opacity-50 hover:bg-opacity-75 text-gray-500 font-semibold text-center mx-4 mt-4 mb-2 px-4 rounded shadow" onClick={addTeacher}>+New Teacher</div>
          <div className="bg-red-700 bg-opacity-50 hover:bg-opacity-75 text-gray-500 font-semibold text-center mx-4 my-2 px-4 rounded shadow" onClick={addClass}>+New Class</div>
        </div>
      </div>
      <div className="classDiv frontGradient mx-8 shadow-2xl flex overflow-x-auto">
        {classArray.map((weekArray, whichClass)=>{
        return (<div className="flex">
          {(whichClass !== 0)?<div className="h-full w-16 flex-shrink-0" />:""}
          <TableClass weekArray={weekArray} resolveClass={resolveClass} resolveTeacher={resolveTeacher} whichClass={whichClass} dayStart={dayStart} leastCount={leastCount} dayEnd={dayEnd} classCellUpdateData={classCellUpdateData} teacherCellUpdateData={teacherCellUpdateData} selectedTeacher={selectedTeacher} isFree={isFree} setNotice={setNotice}/>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
