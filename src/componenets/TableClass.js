import React from 'react';
import { HeadMaker } from './headMaker';

export const TableClass = ({weekArray, resolveClass, resolveTeacher, whichClass, dayStart, leastCount, dayEnd, classCellUpdateData, teacherCellUpdateData, selectedTeacher, isFree, setNotice}) => {
    let dayOfWeek = -1;
    let daysOfWeeks = ["Sunday","Monday","Tuesday", "Wedsnesday", "Thursday", "Friday", "Saturday"]
    const weekDayPrinter = () => {
        ++dayOfWeek;
        return daysOfWeeks[dayOfWeek]
    }
    return(
        <div className="tableGradient opacity-25 shadow-xl">
            <div className="text-white opacity-100">{`${resolveClass(whichClass)}`}</div>
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
                                                if(isFree(selectedTeacher, whichDay, whichPeriod)){
                                                    if(periods.value === "Free"){
                                                        teacherCellUpdateData(selectedTeacher, whichDay, whichPeriod, whichClass);
                                                        classCellUpdateData(whichClass, whichDay, whichPeriod, selectedTeacher);
                                                    }
                                                    else if(typeof periods.value === 'number'){
                                                        teacherCellUpdateData(periods.value , whichDay, whichPeriod, "Free");
                                                        classCellUpdateData(whichClass, whichDay, whichPeriod, "Free");
                                                    }
                                                } else {
                                                    setNotice(`The cell for selected teacher, ${resolveTeacher(selectedTeacher)}, is "Busy".`);
                                                    setTimeout(()=>setNotice('Welcome To redLazyroutinemaker'),3000);
                                                }
                                                }}
                                        className={(typeof periods.value === 'number')?"text-center":"opacity-50 text-center"}>{(typeof periods.value === "number")?resolveTeacher(periods.value):`${periods.value}`}</td>        
                                    )
                                })}
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    );
}

export default TableClass;