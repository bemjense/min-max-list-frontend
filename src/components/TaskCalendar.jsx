import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './TaskCalendar.css'

const Calendar = ({taskCounts}) => (
  <CalendarHeatmap
  startDate={new Date('2024-10-01')}
  endDate={new Date('2024-11-031')}
  horizontal = {false}
  gutterSize = {5}
  showMonthLabels = {true}
  values = {taskCounts}
  />



);
export default Calendar;
