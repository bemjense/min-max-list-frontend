import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css';
import { useState } from 'react';

const Calendar = ({ taskCounts }) => {
  const [hoverInfo, setHoverInfo] = useState(null); // State to store hover information

  return (
    <div className="calendar-heatmap-container">
      <CalendarHeatmap
        startDate={new Date('2024-10-01')}
        endDate={new Date('2024-12-01')}
        horizontal={false}
        gutterSize={5}
        showMonthLabels={true}
        values={taskCounts}


        onMouseOver={(event, value) => {
          if (value) {
            console.log(`Tasks completed on ${value.date}: ${value.count}`);
            setHoverInfo({ date: value.date, count: value.count });
          } else {
            setHoverInfo(null); // Reset hover info if no value
          }
        }}

        onMouseLeave={(event,value) => {
          setHoverInfo(null)
        }}
      />
      {/*If hoverinfo is set to true then create popup else disable*/}
      {hoverInfo && (
        <div className="calendar-tooltip">
          {hoverInfo.count} tasks completed
        </div>
      )}
    </div>
  );
};




export default Calendar;
