import Task from "./Task.js";
import Project from "./Project.js";
import DisplayManager from "./DisplayManager.js";

export default class ToDoApplication {
    constructor() {
        this.projectList = [new Project("Unclassified Tasks")];
        this.diplayManager = new DisplayManager();
    }

    addProject(name) {
        const proj = new Project(name);
        this.projectList.push(proj);
        return proj.id;
    }

    #findProjectIndex(id) {
        for (var i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    removeProject(id) {
        // index at one to prevent removing default project
        const findInd = this.#findProjectIndex(id);
        if (findInd < 1) {
            return;
        }
        this.projectList.splice(i, 1);
    }

    addTaskToProject(projectId, taskName, description, dueDate, priority) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            const task = new Task(taskName, description, dueDate, priority, false);
            this.projectList[i].addTask(task);
            return task.id;
        }
    }

    removeTask(projectId, taskId) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            this.projectList[i].removeTask(taskId);
        }
    }
}