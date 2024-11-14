import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';


const Calendar = ({ taskCounts, handleSetFilterTaskTimeStamp}) => {

  const generateDateRange = (startDate, endDate, taskCounts) => {

    // use map as dicitonary for already existing values
    const dateMap = {};
    taskCounts.forEach((task) => {
      const formattedDate = new Date(task.date).toISOString().split('T')[0];
      dateMap[formattedDate] = task;
    });

    const dates = [];
    let currentDate = new Date(startDate);

    // insert placeholder dates
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      dates.push({
        date: dateString,
        // if datemap contains key then use datempa count else set to 0
        count: dateMap[dateString] ? dateMap[dateString].count : 0,
      });
      //add
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};



  const [hoverInfo, setHoverInfo] = useState(null); // State to store hover information

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 131); // 30 days before today
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate());


  const filledTaskCounts = generateDateRange(startDate, endDate, taskCounts);

  return (
    <div className="calendar-heatmap-container flex-1">
      <CalendarHeatmap
        className="flex-1"

        //propertries for calendar 
        startDate={startDate}
        endDate={endDate}
        showWeekdayLabels={true}
        showOutOfRangeDays={false}
        horizontal={false}
        gutterSize={3}
        showMonthLabels={true}
        values={filledTaskCounts}
        onClick={(value) => {
          const date = value.date ? new Date(value.date) : null;
          handleSetFilterTaskTimeStamp(date.toISOString());
        }}


        //color customization
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count > 3) {
            return `color-scale-3`;
          }
          return `color-scale-${value.count}`;
        }}


        //hover tooltips
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return { 'data-tooltip-id': 'task-tooltip', 'data-tooltip-content': 'No data' };
          }



          return {
            'data-tooltip-id': 'task-tooltip',
            'data-tooltip-content': `${value.date.toLocaleString().slice(0, 10)}: ${value.count} tasks completed`,
          };
        }}


      />
      <Tooltip id="task-tooltip" />
    </div>
  );
};




export default Calendar;
