export default class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.taskList = [];
        this.id = crypto.randomUUID();
    }

    addTask(task) {
        this.taskList.push(task);
        // maybe sort?
    }

    removetask(task) {

    }
}