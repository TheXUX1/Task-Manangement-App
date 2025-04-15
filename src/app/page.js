"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Calendar from "./components/Calendar";
import styles from "./styles/globals.css";
import { formatDate } from "./utils/dateUtils";
import { getTasks, saveTasks } from "./utils/storage";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const router = useRouter();

  const handlers = useSwipeable({
    onSwipedLeft: () => router.push("/completed-tasks"),
    onSwipedRight: () => router.push("/high-priority"),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  const [tasks, setTasks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let storedTasks = getTasks();
    if (!storedTasks || storedTasks.length === 0) {
      const today = new Date();
      let tasksArray = [];
      for (let i = 0; i < 8; i++) {
        const currentDay = new Date(today);
        currentDay.setDate(today.getDate() + i);
        const dayStr = `${currentDay.toLocaleString("default", {
          month: "long",
        })} ${currentDay.getDate()}, ${currentDay.getFullYear()}`;

        tasksArray.push({
          id: `${i}-A`,
          title: "Task A",
          desc: "Walk the Dog",
          priority: "5",
          date: dayStr,
          dueDate: dayStr,
          status: "pending",
        });

        if (i < 2) {
          tasksArray.push({
            id: `${i}-B`,
            title: "Task B",
            desc: "Work on Assignment",
            priority: "4",
            date: dayStr,
            dueDate: dayStr,
            status: "pending",
          });
        }
      }
      saveTasks(tasksArray);
      setTasks(tasksArray);
    } else {
      setTasks(storedTasks);
    }
  }, []);

  return (
    <div {...handlers}>
      <div className={styles.container}>
        <div className={styles.fixedTop}>
          <Header />
          <SearchBar
            tasks={tasks}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </div>
        <div className={styles.calendar}>
          <Calendar tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
