"use client";

import styles from "../styles/globals.css"; // Correct path
import { useEffect, useState } from "react";

export default function HighPriorityTasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      const allTasks = JSON.parse(stored);
      const highPriority = allTasks.filter(
        (task) => Number(task.priority) <= 3 && task.status !== "completed"
      );
      setTasks(highPriority);
    }
  }, []);

  // 👇 Implement the same swipe logic from CompletedTasksPage
  useEffect(() => {
    let touchstartX = 0, touchendX = 0;
    const threshold = 50;

    function handleTouchStart(e) {
      touchstartX = e.changedTouches[0].clientX;
    }

    function handleTouchEnd(e) {
      touchendX = e.changedTouches[0].clientX;
      const dist = touchendX - touchstartX;
      if (Math.abs(dist) > threshold) {
        if (dist < 0) {
          window.location.href = "/";
        } else {
          window.location.href = "/completed-tasks";
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>High Priority Tasks</h1>
      </div>
      <div className={styles.tasksContainer}>
        <ul className={styles.taskList}>
          {tasks.map((task, idx) => (
            <li key={idx} className={styles.taskItem}>
              <a
                href={`task-details?title=${encodeURIComponent(task.title)}&desc=${encodeURIComponent(task.desc)}&date=${encodeURIComponent(task.date)}`}
              >
                {task.title} - Due: {task.dueDate}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
