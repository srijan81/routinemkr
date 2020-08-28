import React from 'react';
import { HeadMaker } from './headMaker';

export const TableTeacher = ({weekArray, resolveTeacher, resolveClass, whichTeacher,teacherCellUpdateData, classCellUpdateData, dayStart, leastCount, dayEnd, isSelected, setSelectedTeacher, selectedTeacher}) => {
    let dayOfWeek = -1;
    let daysOfWeeks = ["Sunday","Monday","Tuesday", "Wedsnesday", "Thursday", "Friday", "Saturday"]
    const weekDayPrinter = () => {
        ++dayOfWeek;
        return daysOfWeeks[dayOfWeek];
    }
    const handleSelectMe = ()=>{setSelectedTeacher(whichTeacher)}

    return(
        <div className="tableGradient opacity-25 shadow-xl">
            <div className="text-white opacity-100">{`${resolveTeacher(whichTeacher)}`}</div>
            <table className=" text-white opacity-100">
                <thead>
                    <HeadMaker dayStart={dayStart} leastCount={leastCount} dayEnd={dayEnd}/>
                </thead>
                <tbody>
                    {weekArray.map((dayArray, whichDay) => {
                        return (
                            <tr>
                                <td>{weekDayPrinter()}</td>
                                {dayArray.map((periods, whichPeriod)=>{
                                    return (
                                    <td onClick={()=>{
                                        if(typeof periods.value === "number"){
                                            classCellUpdateData(periods.value, whichDay, whichPeriod, "Free");
                                            teacherCellUpdateData(whichTeacher, whichDay, whichPeriod, "Free");
                                        } else if(periods.value === "Free"){
                                            teacherCellUpdateData(whichTeacher, whichDay, whichPeriod, "Busy");
                                        } else if(periods.value === "Busy"){
                                            teacherCellUpdateData(whichTeacher, whichDay, whichPeriod, "Free");
                                        }
                                    }}
                                    className={(periods.value === "Busy")?"bg-red-700 border text-center":(typeof periods.value === 'number')?"text-center":"opacity-50 text-center"}>{(typeof periods.value === 'number')?resolveClass(periods.value):`${periods.value}`}</td>        
                                    )
                                })}
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            {isSelected(whichTeacher)?<div className="text-white opacity-100 text-xl text-center">Selected</div>:<div className="text-white opacity-100 text-xl text-center" onClick={handleSelectMe}>Select Me.</div>}
        </div>
    );
}

export default TableTeacher;