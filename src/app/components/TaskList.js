// components/TaskList.js
import React from "react";
import { formatDate, getDayOfWeek } from "../utils/dateUtils";
import styles from "../styles/Home.module.css";

export default function TaskList({ tasks, searchTerm, priorityFilter, statusFilter }) {
  const today = new Date();

  return (
    <div id="calendar">
      {Array.from({ length: 8 }, (_, i) => {
        const currentDay = new Date(today);
        currentDay.setDate(today.getDate() + i);
        const formatted = formatDate(currentDay);
        const dayOfWeek = getDayOfWeek(currentDay);

        const tasksForDay = tasks.filter(task => {
          const matchesDate = task.date === formatted;
          const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
          const matchesStatus = statusFilter ? task.status === statusFilter : true;
          return matchesDate && matchesSearch && matchesPriority && matchesStatus;
        });

        const overdue = tasksForDay.some(task => {
          const due = new Date(task.dueDate);
          return due < today && task.status !== "completed";
        });

        return (
          <div key={i} className={`calendar-bar ${overdue ? "overdue" : ""}`}>
            <div className="calendar-label">
              <span>{formatted}</span>
              <p>{dayOfWeek}</p>
            </div>
            <div className="task-list">
              <ul>
                {tasksForDay.length === 0 ? (
                  <li>No tasks for this day</li>
                ) : (
                  tasksForDay.map((task, idx) => (
                    <li key={idx}>{task.title}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}


