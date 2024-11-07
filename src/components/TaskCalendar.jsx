import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';


const Calendar = ({ taskCounts }) => {


  const [hoverInfo, setHoverInfo] = useState(null); // State to store hover information

  const currentDate= new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 101); // 30 days before today
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  return (
    <div className="calendar-heatmap-container">
      <CalendarHeatmap

      //propertries for calendar 
      startDate={startDate}
      endDate={endDate}
      showWeekdayLabels= {true}
      showOutOfRangeDays = {true}
      horizontal={false}
      gutterSize={3}
      showMonthLabels={true}
      values={taskCounts}
      viewbox = "0 10 100 10"


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
