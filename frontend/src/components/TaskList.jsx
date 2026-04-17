import { useState } from "react";
import { deleteTask, updateTask } from "../api/tasks";
import TaskForm from "./TaskForm";

const STATUS_COLORS = {
  pending: { bg: "#fef9c3", text: "#854d0e" },
  in_progress: { bg: "#dbeafe", text: "#1e40af" },
  done: { bg: "#dcfce7", text: "#166534" },
};

export default function TaskList({ tasks, onRefresh }) {
  const [editingId, setEditingId] = useState(null);

  async function handleUpdate(id, data) {
    await updateTask(id, data);
    setEditingId(null);
    onRefresh();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    onRefresh();
  }

  if (!tasks.length) {
    return <p style={{ color: "#6b7280", textAlign: "center", marginTop: 40 }}>No tasks yet. Add one above!</p>;
  }

  return (
    <ul style={styles.list}>
      {tasks.map((task) => {
        const color = STATUS_COLORS[task.status] ?? STATUS_COLORS.pending;
        return (
          <li key={task.id} style={styles.card}>
            {editingId === task.id ? (
              <TaskForm
                initial={task}
                onSubmit={(data) => handleUpdate(task.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div style={styles.cardHeader}>
                  <span style={styles.title}>{task.title}</span>
                  <span style={{ ...styles.badge, background: color.bg, color: color.text }}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
                {task.description && <p style={styles.desc}>{task.description}</p>}
                <div style={styles.meta}>
                  <span>{new Date(task.created_at).toLocaleDateString()}</span>
                  <div style={styles.actions}>
                    <button style={styles.btnEdit} onClick={() => setEditingId(task.id)}>Edit</button>
                    <button style={styles.btnDelete} onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const styles = {
  list: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 },
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,.06)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 4 },
  title: { fontWeight: 600, fontSize: 16, color: "#111827" },
  badge: { fontSize: 12, padding: "2px 10px", borderRadius: 999, fontWeight: 600, whiteSpace: "nowrap" },
  desc: { color: "#4b5563", fontSize: 14, margin: "4px 0 8px" },
  meta: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#9ca3af" },
  actions: { display: "flex", gap: 8 },
  btnEdit: { padding: "4px 12px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: 5, cursor: "pointer", fontSize: 13 },
  btnDelete: { padding: "4px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 13 },
};
