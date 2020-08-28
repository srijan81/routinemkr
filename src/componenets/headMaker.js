import React from 'react'

export const HeadMaker = ({dayStart, leastCount, dayEnd}) => {
    let traversalObject = {
        hour: dayStart.hour,
        minute: dayStart.minute,
        value: "Free"
    }
    
    const Ora = () => {
        let returnVar = [];
        returnVar.push(<th>Days</th>);
        while(traversalObject.hour < dayEnd.hour || traversalObject.minute < dayEnd.minute){
            returnVar.push(<th>{`${traversalObject.hour}H ${traversalObject.minute}M`}</th>);
            traversalObject.hour += leastCount.hour;
            traversalObject.minute += leastCount.minute;
            if(traversalObject.minute > 59){
                traversalObject.hour += 1;
                traversalObject.minute -= 60;
            }
        }
        return returnVar;
    }

    return Ora();
}