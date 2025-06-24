export default class DisplayManager {
    constructor() {
        this.activeProject = null;
    }

    redrawActiveTasks() {
        // Called when we apply a filter of some sort to redraw the main task window
    }

    updateTask(projectId, taskId) {
        // Called when we want to redraw a task without expanding or collapsing (for example, toggling complete)
    }

    expandTask(projectId, taskId) {
        // Called when we want to view the details of or edit a task
    }

    collapseTask(projectId, taskId) {
        // Called when we are done editing the details of a task
    }

    expandAddTask() {
        // Called when we are adding a task at the bottom of the screen
    }

    collapseAddTask() {
        // Called when we are done adding a task at the bottom of the screen

    }
}