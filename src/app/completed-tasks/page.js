"use client";
import { useEffect, useState } from "react";
import styles from "../styles/globals.css"; // Corrected path

export default function CompletedTasksPage() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filtered = tasks.filter((task) => task.status === "completed");
    setCompletedTasks(filtered);
  }, []);

  // Optional swipe navigation
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
          window.location.href = "/high-priority";
        } else {
          window.location.href = "/";
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
        <h1>Completed Tasks</h1>
      </div>
      <div className={styles.tasksContainer}>
        <ul className={styles.taskList}>
          {completedTasks.map((task) => {
            const completionDate = task.completionDate || task.dueDate;
            return (
              <li key={task.id} className={styles.taskItem}>
                <span className={styles.taskLink}>
                  {task.title} - Completed: {completionDate}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
