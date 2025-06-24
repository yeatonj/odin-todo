import Task from "./Task.js";
import Project from "./Project.js";
import DisplayManager from "./DisplayManager.js";

export default class ToDoApplication {
    constructor() {
        this.projectList = [new Project("Unclassified Tasks")];
        this.diplayManager = new DisplayManager();
        this.defaultId = this.projectList[0].id; // used to ensure we don't delete the default project
    }

    removeProject(id) {
        if (id === this.defaultId) {
            return;
        }
    }
}