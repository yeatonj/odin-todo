export default class DisplayManager {
    constructor() {
        this.activeProject = null;
    }

    redrawActiveTasks(displayProjectName, taskList) {
        // Called when we apply a filter of some sort to redraw the main task window
        // displayProjectName should either be true or false depending on whether we're looking at all tasks
        // tasklist should simply be an array of tasks
    }

    redrawSingleTask(taskId, task) {
        // Called when we want to redraw a task without expanding or collapsing (for example, toggling complete). Might be called after collapsing
    }

    expandTask(taskId, task) {
        // Called when we want to view the details of or edit a task
    }

    collapseTask(taskId, task) {
        // Called when we are done editing the details of a task
    }

    appendTask(taskId, projectId, task) {
        // appends a task to the end of the active tasks
    }

    expandAddTask() {
        // Called when we are adding a task at the bottom of the screen
    }

    collapseAddTask() {
        // Called when we are done adding a task at the bottom of the screen

    }

    redrawProjectSidebar(projects) {
        // Called to redraw the project sidebar
    }
}