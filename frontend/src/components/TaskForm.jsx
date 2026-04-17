import { useState } from "react";

const STATUSES = ["pending", "in_progress", "done"];

export default function TaskForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title ?? "",
    description: initial.description ?? "",
    status: initial.status ?? "pending",
  });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={styles.error}>{error}</p>}
      <input
        style={styles.input}
        placeholder="Title *"
        value={form.title}
        onChange={set("title")}
        required
      />
      <textarea
        style={{ ...styles.input, resize: "vertical", minHeight: 72 }}
        placeholder="Description"
        value={form.description}
        onChange={set("description")}
      />
      <select style={styles.input} value={form.status} onChange={set("status")}>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </select>
      <div style={styles.row}>
        <button type="submit" style={styles.btnPrimary}>
          {initial.id ? "Save" : "Add Task"}
        </button>
        {onCancel && (
          <button type="button" style={styles.btnSecondary} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  row: { display: "flex", gap: 8 },
  btnPrimary: {
    padding: "8px 18px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  btnSecondary: {
    padding: "8px 18px",
    background: "#f3f4f6",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: { color: "#dc2626", fontSize: 13, margin: 0 },
};
