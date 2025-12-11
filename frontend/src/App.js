import { useState, useEffect } from "react";

function App() {
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [status, setStatus] = useState("pending");

const fetchTasks = async () => {
const res = await fetch("http://localhost:5000/tasks");
const data = await res.json();
setTasks(data);
};

useEffect(() => {
fetchTasks();
}, []);

const addTask = async (e) => {
e.preventDefault();


await fetch("http://localhost:5000/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title, status }),
});

fetchTasks();

setTitle("");
setStatus("pending");


};

const toggleStatus = async (id, currentStatus) => {
const newStatus = currentStatus === "pending" ? "completed" : "pending";


await fetch(`http://localhost:5000/tasks/${id}/status`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: newStatus }),
});

fetchTasks();


};

return ( <div style={styles.container}> <h1 style={styles.header}>Task Manager</h1>


  <form onSubmit={addTask} style={styles.form}>
    <input
      style={styles.input}
      type="text"
      placeholder="Enter task title..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <select
      style={styles.select}
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>

    <button style={styles.button} type="submit">
      Add Task
    </button>
  </form>

  <div style={styles.taskList}>
    {tasks.map((task) => (
      <div key={task.id} style={styles.taskCard}>
        <h3>{task.title}</h3>
        <p>
          Status:{" "}
          <span
            style={{
              color: task.status === "completed" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {task.status}
          </span>
        </p>

        <button
          onClick={() => toggleStatus(task.id, task.status)}
          style={styles.toggleButton}
        >
          {task.status === "pending"
            ? "Mark Completed"
            : "Mark Pending"}
        </button>
      </div>
    ))}
  </div>
</div>


);
}

const styles = {
container: { padding: 40, maxWidth: 600, margin: "auto" },
header: { textAlign: "center", marginBottom: 20 },
form: { display: "flex", gap: 10, marginBottom: 20 },
input: { padding: 10, flex: 1 },
select: { padding: 10 },
button: { padding: "10px 15px", background: "#007bff", color: "white" },
taskList: { marginTop: 20 },
taskCard: {
border: "1px solid #ddd",
padding: 12,
borderRadius: 6,
marginBottom: 12,
},
toggleButton: {
padding: "8px 12px",
marginTop: 10,
background: "#222",
color: "white",
},
};

export default App;
