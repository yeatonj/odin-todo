export default class StorageManager {
    constructor() {
        // Check to see if we can use it
        let storage;
        try {
            storage = window["localStorage"];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            this.storageActive = true;
        } catch (e) {
            this.storageActive = false;
        }
        if (!this.storageActive) {
            return;
        }
        this.projectIds = {};
    }

    isActive() {
        return this.storageActive;
    }

    persistProject(project) {
        if (!this.storageActive) {
            return;
        }
        this.projectIds[project.id] = project.id;
        localStorage.setItem('projectIds', JSON.stringify(this.projectIds));
        const taskIds = [];
        for (const task of project.taskList) {
            taskIds.push(task.id);
        }
        const jsonProj = {};
        jsonProj["tasks"] = taskIds;
        jsonProj["projName"] = project.projectName;
        jsonProj["id"] = project.id;
        localStorage.setItem(project.id, JSON.stringify(jsonProj));
    }

    persistTask(task) {
        if (!this.storageActive) {
            return;
        }
        console.log(task);
        localStorage.setItem(task.id, JSON.stringify(task));
    }

    deleteProject(project) {
        if (!this.storageActive) {
            return;
        }
        delete this.projectIds[project.id];
        for (const task of project.tasklist) {
            this.deleteTask(task);
        }
    }

    deleteTask(task) {
        if (!this.storageActive) {
            return;
        }
        localStorage.removeItem(task.id);
    }

    recoverProjectIds() {
        // project ids are stored as a json, we will return as an array of id's
        if (!localStorage.getItem('projectIds')) {
            localStorage.setItem('projectIds', JSON.stringify({}));
            return [];
        }
        this.projectIds = JSON.parse(localStorage.getItem('projectIds'));
        return Object.keys(this.projectIds);
    }

    recoverProjectFromId(id) {
        // just returns project name, we recover tasks separately
        if (!localStorage.getItem(id)) {
            return null;
        }
        return JSON.parse(localStorage.getItem(id));
    }

    recoverTaskFromId(id) {
        if (!localStorage.getItem(id)) {
            return null;
        }
        return JSON.parse(localStorage.getItem(id));
    }


}