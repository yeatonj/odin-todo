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

    removeProject(id) {
        // index at one to prevent removing default project
        for (var i = 1; i < this.projectList.length; i++) {
            if (this.projectList[i].id === id) {
                this.projectList.splice(i, 1);
                return;
            }
        }
    }

    addTaskToProject(projectId, taskName, description, dueDate, priority) {
        for (var i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].id === projectId) {
                const task = new Task(taskName, description, dueDate, priority, false);
                this.projectList[i].addTask(task);
                return task.id;
            }
        }
    }

    removeTask(projectId, taskId) {
        for (var i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].id === projectId) {
                this.projectList[i].removeTask(taskId);
            }
        }
    }
}