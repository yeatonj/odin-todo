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

    // Assumes that each task has an identifier
    removeTask(id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList.splice(i, 1);
                return;
            }
        }
    }

    sortTasks(sortFunc) {
        this.taskList.sort(compareFunc);
    }
}