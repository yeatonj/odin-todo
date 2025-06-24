import Task from "./Task.js";

export default class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.taskList = [];
        this.id = crypto.randomUUID();
    }

    addTask(task) {
        const task = new Task(taskName, description, dueDate, priority, false);
        this.taskList.push(task);
        return task.id;
    }

    #findTaskIndex(taskId) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === taskId) {
                return i;
            }
        }
        return -1;
    }

    // Assumes that each task has an identifier
    removeTask(id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList.splice(i, 1);
                return;
            }
        }
    }

    toggleTaskCompletion(taskId) {
        const findInd = this.#findTaskIndex(taskId);
        if (findInd >= 0) {
            this.taskList[findInd].toggleComplete();
        }
    }

    setTaskName(taskId, name) {
        const findInd = this.#findTaskIndex(taskId);
        if (findInd >= 0) {
            this.taskList[findInd].taskName = name;
        }
    }

    setTaskDueDate(taskId, date) {
        const findInd = this.#findTaskIndex(taskId);
        if (findInd >= 0) {
            this.taskList[findInd].dueDate = date;
        }
    }

    setTaskPriority(taskId, priority) {
        const findInd = this.#findTaskIndex(taskId);
        if (findInd >= 0) {
            this.taskList[findInd].priority = priority;
        }
    }

    setTaskDescription(taskId, description) {
        const findInd = this.#findTaskIndex(taskId);
        if (findInd >= 0) {
            this.taskList[findInd].description = description;
        }
    }

}