import { useState, useEffect } from "react";
import styles from "../styles/searchBar.css";

export default function SearchBar({ tasks = [], searchResults, setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchPriority = priority ? task.priority === priority : true;
      const matchStatus = status ? task.status === status : true;
      return matchTitle && matchPriority && matchStatus;
    });

    setSearchResults(filtered);
    setPopupVisible(query.trim() !== "" || priority !== "" || status !== "");
  }, [searchQuery, priority, status, tasks]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPriority("");
    setStatus("");
    setSearchResults([]);
    setPopupVisible(false);
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-controls">
        <input
          className={styles.searchBar}
          type="text"
          id="search-bar"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <select id="priority-filter" value={priority} onChange={handlePriorityChange}>
          <option value="">All Priorities</option>
          <option value="1">Critical</option>
          <option value="2">Urgent</option>
          <option value="3">High Priority</option>
          <option value="4">Medium Priority</option>
          <option value="5">Low Priority</option>
        </select>
        <select id="status-filter" value={status} onChange={handleStatusChange}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
  
      {/* Move popup outside of .search-controls so it's not restricted */}
      <div
        id="search-results"
        className="popup"
        style={{ display: popupVisible ? "block" : "none" }}
      >
        <ul id="results-list">
          {searchResults.length > 0 ? (
            searchResults.map((task) => (
              <li key={task.id}>
                <span>{task.title}</span>
              </li>
            ))
          ) : (
            <li>No tasks found</li>
          )}
        </ul>
      </div>
    </div>
  );
}  