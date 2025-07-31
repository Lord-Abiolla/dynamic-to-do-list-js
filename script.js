document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    function addTask(taskText, save = true) {

        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        const task = document.createElement('li');
        task.textContent = taskText;

        const remove = document.createElement('button');
        remove.textContent = "Remove";
        remove.classList.add('remove-btn');

        remove.onclick = () => {
            task.remove();
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        task.appendChild(remove);
        taskList.appendChild(task);
        taskInput.value = "";

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {

        if (event.key === 'Enter') {
            addTask();
        }
    });
    loadTasks();
});