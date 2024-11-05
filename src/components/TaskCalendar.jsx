import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';


const Calendar = ({ taskCounts }) => {
  const [hoverInfo, setHoverInfo] = useState(null); // State to store hover information

  return (
    <div className="calendar-heatmap-container">
      <CalendarHeatmap
        startDate={new Date('2024-10-01')}
        endDate={new Date('2024-12-01')}
        horizontal={false}
        gutterSize={3}
        showMonthLabels={true}
        values={taskCounts}


        classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        if (value.count > 3) {
          return `color-scale-3`;
        }
        return `color-scale-${value.count}`;
        }}

        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return { 'data-tooltip-id': 'task-tooltip', 'data-tooltip-content': 'No data' };
          }
          return {
            'data-tooltip-id': 'task-tooltip',
            'data-tooltip-content': `${value.date} has count: ${value.count}`,
          };
        }}






      />
      <Tooltip id="task-tooltip" />
    </div>
  );
};




export default Calendar;
