export const ArrayMaker = (dayStart, leastCount, dayEnd) => {
    /**
     * dayStart = {
     *      hour: //hour of dayStart
     *      minute: //minute of dayStart
     * }
     * And similar for leastCount and dayEnd
     */
    let dayArray = [];
    let weekArray = [];
    let traversalObject;
    for (let index = 0; index < 7; index++) {
        dayArray = [];
        traversalObject = {
            hour: dayStart.hour,
            minute: dayStart.minute,
            value: "Free"
        }
        while(traversalObject.hour < dayEnd.hour || traversalObject.minute < dayEnd.minute){
            dayArray.push(JSON.parse(JSON.stringify(traversalObject)));
            traversalObject.hour += leastCount.hour;
            traversalObject.minute += leastCount.minute;
            if(traversalObject.minute > 59){
                traversalObject.hour += 1;
                traversalObject.minute -= 60;
            }
        }
        weekArray.push(JSON.parse(JSON.stringify(dayArray)));
    }
    return weekArray;
}