import { useCallback, useEffect, useState } from "react";
import { createTask, getTasks } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCreate(data) {
    await createTask(data);
    await fetchTasks();
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Task Manager</h1>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>New Task</h2>
          <TaskForm onSubmit={handleCreate} />
        </section>

        <section>
          <h2 style={styles.sectionTitle}>
            Tasks {!loading && <span style={styles.count}>{tasks.length}</span>}
          </h2>
          {error && <p style={styles.error}>{error}</p>}
          {loading ? (
            <p style={{ color: "#6b7280", textAlign: "center" }}>Loading…</p>
          ) : (
            <TaskList tasks={tasks} onRefresh={fetchTasks} />
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f9fafb", padding: "32px 16px" },
  container: { maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 },
  heading: { fontSize: 28, fontWeight: 700, color: "#111827", margin: 0 },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: "#374151", marginBottom: 12 },
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,.06)" },
  count: { fontSize: 14, fontWeight: 400, color: "#6b7280", marginLeft: 6 },
  error: { color: "#dc2626", fontSize: 14 },
};
