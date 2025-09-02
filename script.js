// Simple dark mode toggle
const toggleBtn = document.createElement('button');
toggleBtn.className = 'btn';
toggleBtn.style.position = 'fixed';
toggleBtn.style.right = '20px';
toggleBtn.style.bottom = '80px';
toggleBtn.style.fontSize = '1.5rem';
toggleBtn.style.width = '48px';
toggleBtn.style.height = '48px';
toggleBtn.style.display = 'flex';
toggleBtn.style.alignItems = 'center';
toggleBtn.style.justifyContent = 'center';

function updateIcon() {
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.innerHTML = '🌞';
        toggleBtn.title = 'Switch to light mode';
    } else {
        toggleBtn.innerHTML = '🌙';
        toggleBtn.title = 'Switch to dark mode';
    }
}
updateIcon();
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateIcon();
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- Task Tracker ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = [];
// Load tasks from localStorage
const TASKS_KEY = 'portfolio_tasks';
const saved = localStorage.getItem(TASKS_KEY);
if (saved) {
    try {
        tasks = JSON.parse(saved);
    } catch { }
}

function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="color:#888;">No tasks yet.</p>';
        return;
    }
    tasks.forEach((task, idx) => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.style = 'background:#fff;border-radius:6px;box-shadow:0 2px 8px #0001;padding:1rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;';

        const text = document.createElement('span');
        text.textContent = task;
        text.style = 'flex:1;';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'btn';
        editBtn.style = 'background:#2196f3;margin-right:0.5rem;';
        editBtn.onclick = () => {
            const newTask = prompt('Edit task:', task);
            if (newTask && newTask.trim()) {
                tasks[idx] = newTask.trim();
                saveTasks();
                renderTasks();
            }
        };

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'btn';
        delBtn.style = 'background:#f44336;';
        delBtn.onclick = () => {
            if (confirm('Delete this task?')) {
                tasks.splice(idx, 1);
                saveTasks();
                renderTasks();
            }
        };

        card.appendChild(text);
        card.appendChild(editBtn);
        card.appendChild(delBtn);
        taskList.appendChild(card);
    });
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (!value) {
        taskInput.style.borderColor = '#f44336';
        setTimeout(() => (taskInput.style.borderColor = ''), 1000);
        return;
    }
    tasks.push(value);
    saveTasks();
    taskInput.value = '';
    renderTasks();
});

function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
renderTasks();
