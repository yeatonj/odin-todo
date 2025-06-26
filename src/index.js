// Import stylesheet -----------
import "./styles.css";

// Import module -----------
import ToDoApplication from "./ToDoApplication.js";
import DisplayManager from "./DisplayManager.js";

// Add image -----------
// import testImage from "./test.png";
// const image = document.createElement("img");
// image.src = testImage;

class Controller {
    constructor() {
        this.app = new ToDoApplication();
        this.dispManager = new DisplayManager(this);
    }

    expandTaskCallback(taskId, projectId) {
        // Get the task info from the app and pass back to the display manager
        this.dispManager.expandTask(taskId, this.app.getTaskFromIds(taskId, projectId), this.submitEditTaskCallback.bind(this), this.cancelEditTaskCallback.bind(this));
    }

    submitEditTaskCallback(taskId, projectId, taskName, description, dueDate, priority, isComplete) {
        this.app.updateTask(projectId, taskId, taskName, description, dueDate, priority, isComplete);
        this.dispManager.collapseTask(taskId, this.app.getTaskFromIds(taskId, projectId), this.expandTaskCallback.bind(this));
    }

    cancelEditTaskCallback(taskId, projectId) {
        this.dispManager.collapseTask(taskId, this.app.getTaskFromIds(taskId, projectId), this.expandTaskCallback.bind(this));
    }

    addProjectCallback(projectName) {
        this.app.addProject(projectName);
        this.dispManager.redrawProjectSidebar(this.app.getProjectList(), this.addProjectCallback.bind(this), this.unfilteredProjectCallback.bind(this), this.filteredProjectCallback.bind(this));
    }

    unfilteredProjectCallback() {
        this.dispManager.redrawActiveTasks(this.app.getAllTasks(), this.expandTaskCallback.bind(this));
    }

    filteredProjectCallback(projectId) {
        this.dispManager.redrawActiveTasks(this.app.getProjectTasks(projectId), this.expandTaskCallback.bind(this));
    }
}



// TESTING -----------------
const controller = new Controller();

// Add some projects and some tasks
controller.app.addProject("Coding");
controller.app.addProject("TOP");

controller.app.addTaskToProject(controller.app.getProjectId(0), "groceries", "get groceries", "1/2/25", 1);
controller.app.addTaskToProject(controller.app.getProjectId(0), "get car", "pick it up", "1/2/29", 3);

controller.app.addTaskToProject(controller.app.getProjectId(1), "homework", "for coding", "1/2/23", 2);

controller.app.addTaskToProject(controller.app.getProjectId(2), "todo app", "for top", "1/2/22", 1);

// Draw project list    
controller.dispManager.redrawProjectSidebar(controller.app.getProjectList(), controller.addProjectCallback.bind(controller), controller.unfilteredProjectCallback.bind(controller), controller.filteredProjectCallback.bind(controller));

// Draw tasks
controller.dispManager.redrawActiveTasks(controller.app.getAllTasks(), controller.expandTaskCallback.bind(controller));
