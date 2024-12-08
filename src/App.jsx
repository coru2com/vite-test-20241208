import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // タスク一覧
  const [taskInput, setTaskInput] = useState(""); // 入力中のタスク
  const [filter, setFilter] = useState("all"); // フィルタリングの状態

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // 保存されたタスクを復元
    }
  }, []);

  // タスクの変更をローカルストレージに保存
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // タスク追加処理
  const handleAddTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([
      ...tasks,
      { text: taskInput, completed: false },
    ]);
    setTaskInput("");
  };

  // タスク削除処理
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // タスク完了状態の切り替え
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // フィルタリングされたタスクを取得
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed; // 未完了
    if (filter === "completed") return task.completed; // 完了済み
    return true; // すべて
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>To-Do List</h1>

      {/* 入力フォーム */}
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
        style={{
          padding: "10px",
          width: "80%",
          marginRight: "10px",
          fontSize: "16px",
        }}
      />
      <button
        onClick={handleAddTask}
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add
      </button>

      {/* フィルタリングボタン */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            backgroundColor: filter === "all" ? "#007BFF" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            backgroundColor: filter === "active" ? "#007BFF" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "5px 10px",
            backgroundColor: filter === "completed" ? "#007BFF" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Completed
        </button>
      </div>

      {/* タスク一覧 */}
      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "black",
                }}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(index)}
              style={{
                padding: "5px 10px",
                fontSize: "14px",
                backgroundColor: "#FF4D4D",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
