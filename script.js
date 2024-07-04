document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  
  let nextTaskId = 1; // Starting ID for tasks

  let tasks = [];

  addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    const task = {
      id: nextTaskId++,
      text: taskText
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = '';
  });

  function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.dataset.id = task.id;

      const taskParagraph = document.createElement('p');
      taskParagraph.textContent = task.text;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-btn');

      removeButton.addEventListener('click', function() {
        removeTask(task.id);
      });

      taskItem.appendChild(taskParagraph);
      taskItem.appendChild(removeButton);
      taskList.appendChild(taskItem);
    });
  }

  function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
  }
});
