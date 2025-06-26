import Project from "./Project.js";

export default class ToDoApplication {
    constructor() {
        this.projectList = [new Project("Unclassified Tasks")];
    }

    addProject(name) {
        const proj = new Project(name);
        this.projectList.push(proj);
        return proj.id;
    }

    getProjectId(index) {
        if (index >=0 && index < this.projectList.length) {
            return this.projectList[index].id;
        }
        return null;
    }

    getProjectName(id) {
        const ind = this.#findProjectIndex(id);
        if (ind === -1) {
            return null;
        } else {
            return this.projectList[ind].projectName;
        }
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
        console.log(id);
        // index at one to prevent removing default project
        const findInd = this.#findProjectIndex(id);
        if (findInd < 0) {
            return;
        }
        this.projectList.splice(findInd, 1);
    }

    addTaskToProject(projectId, taskName, description, dueDate, priority) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            return this.projectList[findInd].addTask(taskName, description, dueDate, priority);
        }
    }

    removeTask(projectId, taskId) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            this.projectList[findInd].removeTask(taskId);
        }
    }

    toggleTaskCompletion(projectId, taskId) {
        const findInd = this.#findProjectIndex(projectId);
        if (findInd >= 0) {
            this.projectList[findInd].toggleTaskCompletion(taskId);
        }
    }

    updateTask(projectId, taskId, taskName, description, dueDate, priority, isComplete) {
        const findInd = this.#findProjectIndex(projectId);
        // console.log(this.projectList[findInd].updateProjectTask);
        console.log(this);
        if (findInd >= 0) {
            this.projectList[findInd].updateProjectTask(taskId, taskName, description, dueDate, priority, isComplete);
        }
    }


    // The below should return a list of the required tasks
    getAllTasks() {
        var finalArr = [];
        for (const project of this.projectList) {
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

    getProjectList() {
        const projects = [];
        for (const project of this.projectList) {
            projects.push([project.projectName, project.id]);
        }
        return projects;
    }

    getTaskFromIds(taskId, projectId) {
        const projInd = this.#findProjectIndex(projectId);
        if (projInd > -1) {
            return this.projectList[projInd].getTaskFromId(taskId);
        }
        return null;
    }
}