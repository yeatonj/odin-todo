import Project from "./Project.js";

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
            return this.projectList[i].addTask(taskName, description, dueDate, priority);
        }
    }

    removeTask(projectId, taskId) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            this.projectList[i].removeTask(taskId);
        }
    }

    toggleTaskCompletion(projectId, taskId) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            this.projectList[i].toggleTaskCompletion(taskId);
        }
    }

    updateTask(projectId, taskId, taskName, description, dueDate, priority, isComplete) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            this.projectList[i].updateProjectTask(taskId, taskName, description, dueDate, priority, isComplete);
        }
    }


    // The below should return a list of the required tasks
    getAllTasks() {
        finalArr = [];
        for (project of this.projectList) {
            finalArr = finalArr.concat(project.taskList);
        }
        return finalArr;
    }

    getProjectTasks(projectId) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd < 0) {
            return [];
        } else {
            return this.projectList[findInd].taskList;
        }
    }
}