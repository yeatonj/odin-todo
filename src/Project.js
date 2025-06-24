import Task from "./Task.js";

export default class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.taskList = [];
        this.id = crypto.randomUUID();
    }

    addTask(taskName, description, dueDate, priority) {
        const task = new Task(taskName, description, dueDate, priority, false, this.id);
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

    updateProjectTask(taskId, taskName, description, dueDate, priority, isComplete) {
        const findInd = this.#findTaskIndex(taskId);
        if (findInd >= 0) {
            this.taskList[findInd].updateProjectTask(taskName, description, dueDate, priority, isComplete);
        }
    }

}