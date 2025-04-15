// components/Calendar.js
import { formatDate, getDayOfWeek } from "../utils/dateUtils";

export default function Calendar({ tasks = [] }) {
  const today = new Date();

  const renderCalendarBars = () => {
    let bars = [];
    for (let i = 0; i < 8; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
      const formatted = formatDate(currentDay);
      const dayOfWeek = getDayOfWeek(currentDay);

      // Filter tasks whose date matches the day.
      const tasksForDay = tasks.filter((task) => task.date === formatted);

      // Check for overdue tasks (if any task's dueDate is before today and not completed).
      let overdue = false;
      tasksForDay.forEach((task) => {
        const due = new Date(task.dueDate);
        if (due < today && task.status !== "completed") {
          overdue = true;
        }
      });

      bars.push(
        <div key={i} className={`calendar-bar ${overdue ? "overdue" : ""}`}>
          <div className="calendar-label">
            <span>{formatted}</span>
            <p>{dayOfWeek}</p>
          </div>
          <div className="task-list">
            <ul>
              {tasksForDay.map((task) => (
                <li key={task.id}>
                  <span>{task.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return bars;
  };

  return <div id="calendar">{renderCalendarBars()}</div>;
}
