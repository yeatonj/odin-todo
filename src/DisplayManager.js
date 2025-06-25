export default class DisplayManager {
    constructor(controller) {
        this.activeProject = null;
        this.controller = controller;
    }

    redrawActiveTasks(taskList, expandCallback) {
        // Called when we apply a filter of some sort to redraw the main task window
        // tasklist should simply be an array of tasks
        console.log(taskList);

        const header = document.querySelector("#task-header");
        while (header.firstChild) {
            header.removeChild(header.lastChild);
        }
        const headerText = document.createElement("h2");
        headerText.textContent = "Tasks in project XXXXXX";
        header.appendChild(headerText);

        // Now task list
        const taskContainer = document.querySelector("#task-container");
        while (taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.lastChild);
        }
        for (const project of taskList) {
            console.log(project);
            for (const task of project[0]) {
                const taskCard = document.createElement("div");
                taskCard.classList.add("task-card");
                taskCard.classList.add("collapsed");
                taskCard.dataset.id = task.id;
    
                const taskName = document.createElement("p");
                taskName.textContent = task.taskName;
                const dueDate = document.createElement("p");
                dueDate.textContent = task.dueDate;
                const priority = document.createElement("div");
                priority.textContent = task.priority;
                const completeButton = document.createElement("button");
                const expandButton = document.createElement("button");
                expandButton.textContent = "+";
                expandButton.addEventListener("click", () => {
                    this.controller.expandCallback(task.id, project[1]);
                })
    
                taskCard.appendChild(taskName);
                taskCard.appendChild(dueDate);
                taskCard.appendChild(priority);
                taskCard.appendChild(completeButton);
                taskCard.appendChild(expandButton);
    
    
                taskContainer.appendChild(taskCard);
            }
        }
        

        const addButton = document.createElement("button");
        addButton.textContent = "Add Task";
        taskContainer.appendChild(addButton);

    }

    redrawSingleTask(taskId, task) {
        // Called when we want to redraw a task without expanding or collapsing (for example, toggling complete). Might be called after collapsing
        console.log(taskId);
        console.log(task);
    }

    expandTask(taskId, task) {
        // Called when we want to view the details of or edit a task
        const taskContainer = document.querySelector('[data-id="' + taskId +'"]');
        const newEl = document.createElement("p");
        newEl.textContent = "what's up";

        taskContainer.appendChild(newEl);

        console.log(taskId);
        console.log(task);
        
    }

    collapseTask(taskId, projectId) {
        // Called when we are done editing the details of a task
        console.log(taskId);
        console.log(task);
    }

    appendTask(taskId, projectId, task) {
        // appends a task to the end of the active tasks
        console.log(taskId, projectId, task);
    }

    expandAddTask() {
        // Called when we are adding a task at the bottom of the screen
    }

    collapseAddTask() {
        // Called when we are done adding a task at the bottom of the screen

    }

    redrawProjectSidebar(projects) {
        // Called to redraw the project sidebar
        const sidebar = document.querySelector("#sidebar");

        while (sidebar.firstChild) {
            sidebar.removeChild(sidebar.lastChild);
        }

        const title = document.createElement("h2");
        title.textContent = "Projects";
        sidebar.appendChild(title);

        const projList = document.createElement("ul");

        // all projects
        const button = document.createElement("button");
        button.textContent = "Unfiltered";
        button.dataset.id = "all";
        const li = document.createElement("li");
        li.appendChild(button);
        projList.appendChild(li)

        for (const project of projects) {
            const button = document.createElement("button");
            button.textContent = project[0];
            button.dataset.id = project[1];
            const li = document.createElement("li");
            li.appendChild(button);
            projList.appendChild(li)
        }
        sidebar.appendChild(projList);
    }
}