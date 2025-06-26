export default class DisplayManager {
    constructor(controller) {
        this.activeProject = null;
        this.controller = controller;
    }

    redrawActiveTasks(taskList, expandCallback, addTaskCallback, projectCallback) {
        // Called when we apply a filter of some sort to redraw the main task window
        // tasklist should simply be an array of tasks

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

        for (const task of taskList) {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.classList.add("collapsed");
            taskCard.dataset.id = task.id;

            this.#drawCollapsedTask(task, taskCard, expandCallback);
            taskContainer.appendChild(taskCard);
        }

        const addButton = document.createElement("button");
        addButton.textContent = "Add Task";
        addButton.id = "add-task";
        addButton.addEventListener("click", () => {
            this.expandAddTask(addTaskCallback, projectCallback);
        })
        taskContainer.appendChild(addButton);

    }

    #drawCollapsedTask(task, taskCard, expandCallback) {
        const taskName = document.createElement("p");
        taskName.textContent = task.taskName;
        const dueDate = document.createElement("p");
        dueDate.textContent = task.dueDate;
        const priority = document.createElement("div");
        priority.textContent = task.priority;
        const completeButton = document.createElement("button");
        if (task.isComplete) {
            completeButton.classList.add("complete");
        }
        else {
            completeButton.classList.add("incomplete");
        }
        const expandButton = document.createElement("button");
        expandButton.textContent = "+";
        expandButton.addEventListener("click", () => {
            expandCallback(task.id, task.projectId);
        })

        taskCard.appendChild(taskName);
        taskCard.appendChild(dueDate);
        taskCard.appendChild(priority);
        taskCard.appendChild(completeButton);
        taskCard.appendChild(expandButton);
    }

    expandTask(taskId, task, submitCallback, cancelCallback) {
        // Called when we want to view the details of or edit a task
        // select card and change to expanded
        const taskCard = document.querySelector('[data-id="' + taskId +'"]');
        taskCard.classList.remove("collapsed")
        taskCard.classList.add("expanded");

        while (taskCard.firstChild) {
            taskCard.removeChild(taskCard.lastChild);
        }
        const inputForm = document.createElement("form");

        // Task Name
        const nameLabel = document.createElement("label");
        nameLabel.htmlFor = "name";
        nameLabel.textContent = "Task Name:";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "name";
        nameInput.id = "name";
        nameInput.required = true;
        nameInput.value = task.taskName;
        inputForm.appendChild(nameLabel);
        inputForm.appendChild(nameInput);

        // Project
        const projectLabel = document.createElement("label");
        projectLabel.htmlFor = "project";
        projectLabel.textContent = "Project:";
        const projectInput = document.createElement("input");
        projectInput.classList.add("read-only");
        projectInput.type = "text";
        projectInput.readOnly = true;
        projectInput.name = "project";
        projectInput.id = "project";
        projectInput.value = task.projectName;
        inputForm.appendChild(projectLabel);
        inputForm.appendChild(projectInput);


        // Due Date
        const dateLabel = document.createElement("label");
        dateLabel.htmlFor = "due-date";
        dateLabel.textContent = "Due Date:";
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.name = "due-date";
        dateInput.id = "due-date";
        dateInput.value = task.dueDate;
        inputForm.appendChild(dateLabel);
        inputForm.appendChild(dateInput);

        // Description
        const descrLabel = document.createElement("label");
        descrLabel.htmlFor = "descr";
        descrLabel.textContent = "Description:";
        const descrInput = document.createElement("textarea");
        descrInput.name = "descr";
        descrInput.id = "descr";
        descrInput.rows = 5;
        descrInput.cols = 40;
        descrInput.value = task.description;
        inputForm.appendChild(descrLabel);
        inputForm.appendChild(descrInput);

        // Priority
        const priorLabel = document.createElement("label");
        priorLabel.htmlFor = "priority";
        priorLabel.textContent = "Priority:";
        const priorInput = document.createElement("select");
        priorInput.name = "priority";
        priorInput.id = "priority";
        for (var i = 1; i < 4; i++) {
            const prior = document.createElement("option");
            prior.value = i;
            prior.textContent = String(i);
            if (task.priority === i) {
                prior.selected = true;
            }
            priorInput.appendChild(prior);
        }
        // priorInput.value = task.priority;
        inputForm.appendChild(priorLabel);
        inputForm.appendChild(priorInput);

        // Is Complete
        const completeLabel = document.createElement("label");
        completeLabel.htmlFor = "complete";
        completeLabel.textContent = "Complete?";
        const completeInput = document.createElement("input");
        completeInput.type = "checkbox";
        completeInput.name = "complete";
        completeInput.id = "complete";
        if (task.isComplete) {
            completeInput.checked = true;
        }
        inputForm.appendChild(completeLabel);
        inputForm.appendChild(completeInput);
        

        const submit = document.createElement("button");
        submit.textContent = "Update Task";
        submit.type = "submit";
        submit.addEventListener("click", (event) => {
            event.preventDefault();
            submitCallback(
                task.id, 
                task.projectId, 
                nameInput.value, 
                descrInput.value, 
                dateInput.value, 
                priorInput.value, 
                completeInput.checked);
        });

        const cancel = document.createElement("button");
        cancel.classList.add("cancel");
        cancel.textContent = "Cancel Changes";
        cancel.addEventListener("click", (event) => {
            event.preventDefault();
            cancelCallback(task.id, task.projectId);
        });

        inputForm.appendChild(submit);
        inputForm.appendChild(cancel);


        taskCard.appendChild(inputForm);
    }

    collapseTask(taskId, task, expandCallback) {
        // Called when we are done editing the details of a task
        // select card and change to expanded
        const taskCard = document.querySelector('[data-id="' + taskId +'"]');
        taskCard.classList.remove("expanded")
        taskCard.classList.add("collapsed");

        while (taskCard.firstChild) {
            taskCard.removeChild(taskCard.lastChild);
        }
        this.#drawCollapsedTask(task, taskCard, expandCallback);
    }

    appendTask(taskId, projectId, task) {
        // appends a task to the end of the active tasks
        console.log(taskId, projectId, task);
    }

    expandAddTask(addCallback, projectCallback) {
        // Called when we are adding a task at the bottom of the screen
        const taskContainer = document.querySelector("#task-container");
        // Hide add button
        const addButton = document.querySelector("#add-task");
        addButton.style.visibility = "hidden";
        
        const inputForm = document.createElement("form");
        inputForm.id = "add-form";
        const head = document.createElement("h3");
        head.textContent = "New Task Details:";
        inputForm.appendChild(head);
        // Task Name
        const nameLabel = document.createElement("label");
        nameLabel.htmlFor = "name";
        nameLabel.textContent = "Task Name:";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "name";
        nameInput.id = "name";
        nameInput.required = true;
        inputForm.appendChild(nameLabel);
        inputForm.appendChild(nameInput);

        // Project
        const curProjects = projectCallback();

        const projectLabel = document.createElement("label");
        projectLabel.htmlFor = "project";
        projectLabel.textContent = "Project:";
        const projectInput = document.createElement("select");
        projectInput.name = "priority";
        projectInput.id = "priority";

        for (var i = 0; i < curProjects.length; i++) {
            const proj = document.createElement("option");
            proj.value = curProjects[i][1];
            proj.textContent = curProjects[i][0];
            projectInput.appendChild(proj);
        }
        inputForm.appendChild(projectLabel);
        inputForm.appendChild(projectInput);

        // Due Date
        const dateLabel = document.createElement("label");
        dateLabel.htmlFor = "due-date";
        dateLabel.textContent = "Due Date:";
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.name = "due-date";
        dateInput.id = "due-date";
        inputForm.appendChild(dateLabel);
        inputForm.appendChild(dateInput);

        // Description
        const descrLabel = document.createElement("label");
        descrLabel.htmlFor = "descr";
        descrLabel.textContent = "Description:";
        const descrInput = document.createElement("textarea");
        descrInput.name = "descr";
        descrInput.id = "descr";
        descrInput.rows = 5;
        descrInput.cols = 40;
        inputForm.appendChild(descrLabel);
        inputForm.appendChild(descrInput);

        // Priority
        const priorLabel = document.createElement("label");
        priorLabel.htmlFor = "priority";
        priorLabel.textContent = "Priority:";
        const priorInput = document.createElement("select");
        priorInput.name = "priority";
        priorInput.id = "priority";
        for (var i = 1; i < 4; i++) {
            const prior = document.createElement("option");
            prior.value = i;
            prior.textContent = String(i);
            priorInput.appendChild(prior);
        }
        // priorInput.value = task.priority;
        inputForm.appendChild(priorLabel);
        inputForm.appendChild(priorInput);
        

        const submit = document.createElement("button");
        submit.textContent = "Add Task";
        submit.type = "submit";
        submit.addEventListener("click", (event) => {
            event.preventDefault();
            addCallback(
                nameInput.value, 
                descrInput.value, 
                projectInput.value,
                dateInput.value, 
                priorInput.value
            );
        });

        const cancel = document.createElement("button");
        cancel.classList.add("cancel");
        cancel.textContent = "Cancel";
        cancel.addEventListener("click", (event) => {
            event.preventDefault();
            this.collapseAddTask();
        })

        inputForm.appendChild(submit);
        inputForm.appendChild(cancel);

        taskContainer.append(inputForm);
    }

    collapseAddTask() {
        // Called when we are done adding a task at the bottom of the screen
        const addForm = document.querySelector("#add-form");
        addForm.remove();
        const taskContainer = document.querySelector("#task-container");
        // Hide add button
        const addButton = document.querySelector("#add-task");
        taskContainer.appendChild(addButton);
        addButton.style.visibility = "visible";

    }

    redrawProjectSidebar(projects, addCallback, unfilteredCallback, filteredCallback) {
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
        button.addEventListener("click", () => unfilteredCallback());
        const li = document.createElement("li");
        li.appendChild(button);
        projList.appendChild(li)

        for (const project of projects) {
            const button = document.createElement("button");
            button.textContent = project[0];
            button.dataset.id = project[1];
            button.addEventListener("click", () => filteredCallback(project[1]));
            const li = document.createElement("li");
            li.appendChild(button);
            projList.appendChild(li)
        }
        sidebar.appendChild(projList);

        // For new projects
        const newProj = document.createElement("form");
        const input = document.createElement("input");
        const label = document.createElement("label");
        label.htmlFor = "new";
        label.textContent = "New Project Name: ";
        label.style.display = "none";
        input.name = "new";
        input.id = "new";
        input.style = "text";
        newProj.appendChild(label);
        newProj.appendChild(input);
        const add = document.createElement("button");
        add.type = "submit";
        add.textContent = "Add Project";
        add.addEventListener("click", (event) => {
            event.preventDefault();
            addCallback(input.value);
        })


        newProj.appendChild(add);
        sidebar.appendChild(newProj);
    }
}