export function getTasks() {
  if (typeof window === 'undefined') {
    return []; // Return empty during SSR
  }
  const storedTasks = localStorage.getItem("tasks");
  try {
    return JSON.parse(storedTasks) || [];
  } catch (e) {
    console.error("Failed to parse tasks from localStorage:", e);
    return [];
  }
}

export function saveTasks(tasks) {
  if (typeof window === 'undefined') {
    console.error("Cannot save tasks during SSR");
    return;
  }
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to localStorage:", e);
  }
}
