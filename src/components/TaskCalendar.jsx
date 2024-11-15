import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

const Calendar = ({ taskCounts, handleSetFilterTaskTimeStamp}) => {

  const generateDateRange = (startDate, endDate, taskCounts) => {
    const dateMap = {};
    taskCounts.forEach((task) => {
      const formattedDate = new Date(task.date).toLocaleDateString(); 
      dateMap[formattedDate] = task;
    });

    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toLocaleDateString();
      dates.push({
        date: dateString,
        count: dateMap[dateString] ? dateMap[dateString].count : 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 131);
  const endDate = new Date(currentDate);

  const filledTaskCounts = generateDateRange(startDate, endDate, taskCounts);

  return (
    <div className="calendar-heatmap-container flex-1">
      <CalendarHeatmap
        className="flex-1"
        startDate={startDate}
        endDate={endDate}
        showWeekdayLabels={true}
        showOutOfRangeDays={false}
        horizontal={false}
        gutterSize={3}
        showMonthLabels={true}
        values={filledTaskCounts}
        onClick={(value) => {
          if (value && value.date) {
            const date = new Date(value.date);
            handleSetFilterTaskTimeStamp(date.toISOString());
          }
        }}
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
          const localDate = new Date(value.date).toLocaleDateString(); // Tooltip in local date format
          return {
            'data-tooltip-id': 'task-tooltip',
            'data-tooltip-content': `${localDate}: ${value.count} tasks completed`,
          };
        }}
      />
      <Tooltip id="task-tooltip" />
    </div>
  );
};

export default Calendar;