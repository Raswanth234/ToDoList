const apiUrl = "http://localhost:3000/tasks";
async function fetchTasks() {
  const res = await fetch(apiUrl);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.setAttribute("data-id", index);
    list.appendChild(li);
  });
}
async function addTask() {
  const task = document.getElementById("taskInput").value;
  if (task) {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });
    fetchTasks();
    document.getElementById("taskInput").value = "";
  }
}
async function deleteTask() {
  const list = document.getElementById("taskList");
  const lastTask = list.lastChild;
  if (lastTask) {
    await fetch(`${apiUrl}/${lastTask.dataset.id}`, { method: "DELETE" });
    fetchTasks();
  }
}
async function deleteAll() {
  await fetch(apiUrl, { method: "DELETE" });
  fetchTasks();
}
function exitApp() {
  window.close(); // Won't work in most browsers due to security
}
fetchTasks();
