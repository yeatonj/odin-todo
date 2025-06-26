// Import stylesheet -----------
import "./styles.css";

// Import module -----------
import ToDoApplication from "./ToDoApplication.js";
import DisplayManager from "./DisplayManager.js";
import StorageManager from "./StorageManager.js";

// Add image -----------
// import testImage from "./test.png";
// const image = document.createElement("img");
// image.src = testImage;

class Controller {
    constructor() {
        this.app = new ToDoApplication();
        this.dispManager = new DisplayManager(this);
        this.storageManager = new StorageManager();
        this.activeProject = null;
        this.initializeProjects();
    }

    getActiveProjectName() {
        if (this.activeProject === null) {
            return null;
        } else {
            return this.app.getProjectName(this.activeProject);
        }
    }

    initializeProjects() {
        if (!this.storageManager.isActive()) {
            return;
        }
        const projectIds = this.storageManager.recoverProjectIds();
        for (const projId of projectIds) {
            const proj = this.storageManager.recoverProjectFromId(projId);
            if (proj != null) {
                console.log(proj);
                console.log(proj.projName);
                console.log(proj.id);
                this.app.addProject(proj.projName, proj.id);
                for (const projTask of proj.tasks) {
                    const toAdd = this.storageManager.recoverTaskFromId(projTask);
                    this.app.addTaskToProject(toAdd.projectId, toAdd.taskName, toAdd.description, toAdd.dueDate, toAdd.priority, toAdd.id, toAdd.isComplete);
                }
            }
        }
    }

    expandTaskCallback(taskId, projectId) {
        // Get the task info from the app and pass back to the display manager
        this.dispManager.expandTask(taskId, 
            this.app.getTaskFromIds(taskId, 
                projectId), 
                this.submitEditTaskCallback.bind(this), 
                this.cancelEditTaskCallback.bind(this), 
                this.removeTaskCallback.bind(this));
    }

    removeTaskCallback(taskId, projectId) {
        this.storageManager.deleteTask(this.app.getTaskFromIds(taskId, projectId));
        this.app.removeTask(projectId, taskId);
        this.storageManager.persistProject(this.app.getProjectFromId(projectId));
    }

    submitEditTaskCallback(taskId, projectId, taskName, description, dueDate, priority, isComplete) {
        this.app.updateTask(projectId, taskId, taskName, description, dueDate, priority, isComplete);
        console.log(this.app.getTaskFromIds(taskId, projectId));
        this.storageManager.persistTask(this.app.getTaskFromIds(taskId, projectId));
        this.dispManager.collapseTask(taskId, 
            this.app.getTaskFromIds(taskId, projectId), 
            this.expandTaskCallback.bind(this));
    }

    cancelEditTaskCallback(taskId, projectId) {
        this.dispManager.collapseTask(taskId, 
            this.app.getTaskFromIds(taskId, projectId), 
            this.expandTaskCallback.bind(this));
    }

    addProjectCallback(projectName) {
        this.storageManager.persistProject(this.app.addProject(projectName, null));
        this.dispManager.redrawProjectSidebar(this.app.getProjectList(), 
            this.addProjectCallback.bind(this), 
            this.unfilteredProjectCallback.bind(this), 
            this.filteredProjectCallback.bind(this), 
            this.deleteProjectCallback.bind(this));
    }

    unfilteredProjectCallback() {
        this.activeProject = null;
        this.dispManager.redrawActiveTasks(this.app.getAllTasks(), 
            this.expandTaskCallback.bind(this), 
            this.addTaskCallback.bind(this), 
            this.app.getProjectList.bind(this.app), 
            this.toggleCallback.bind(this), 
            this.getActiveProjectName());
    }

    filteredProjectCallback(projectId) {
        this.activeProject = projectId;
        this.dispManager.redrawActiveTasks(this.app.getProjectTasks(projectId), 
            this.expandTaskCallback.bind(this), 
            this.addTaskCallback.bind(this), 
            this.app.getProjectList.bind(this.app), 
            this.toggleCallback.bind(this), 
            this.getActiveProjectName());
    }

    addTaskCallback(taskName, description, project, dueDate, priority) {
        if (project === "") {
            // Need to create a new project for this... all projects must be categorized!
            const newProject = this.app.addProject("Uncategorized Tasks", null);
            project = newProject.id;
            this.storageManager.persistProject(newProject);
            this.dispManager.redrawProjectSidebar(this.app.getProjectList(), 
                this.addProjectCallback.bind(this), 
                this.unfilteredProjectCallback.bind(this), 
                this.filteredProjectCallback.bind(this), 
                this.deleteProjectCallback.bind(this));
        }
        this.storageManager.persistTask(
            this.app.getTaskFromIds(
                this.app.addTaskToProject(project, taskName, description, dueDate, priority, null, false), project)
            );
        this.storageManager.persistProject(this.app.getProjectFromId(project));
        // redraw task window for active task
        if (this.activeProject === null) {
            this.dispManager.redrawActiveTasks(this.app.getAllTasks(), 
                this.expandTaskCallback.bind(this), 
                this.addTaskCallback.bind(this), 
                this.app.getProjectList.bind(this.app), 
                this.toggleCallback.bind(this), 
                this.getActiveProjectName());
        } else {
            this.dispManager.redrawActiveTasks(this.app.getProjectTasks(this.activeProject), 
                this.expandTaskCallback.bind(this), 
                this.addTaskCallback.bind(this), 
                this.app.getProjectList.bind(this.app), 
                this.toggleCallback.bind(this), 
                this.getActiveProjectName());
        }
    }

    deleteProjectCallback(projectId) {
        this.storageManager.deleteProject(this.app.getProjectFromId(projectId));
        this.app.removeProject(projectId);
        this.dispManager.redrawProjectSidebar(this.app.getProjectList(), 
            this.addProjectCallback.bind(this), 
            this.unfilteredProjectCallback.bind(this), 
            this.filteredProjectCallback.bind(this), 
            this.deleteProjectCallback.bind(this));
        if (this.activeProject === projectId || this.activeProject === null) {
            this.dispManager.redrawActiveTasks(this.app.getAllTasks(), 
                this.expandTaskCallback.bind(this), 
                this.addTaskCallback.bind(this), 
                this.app.getProjectList.bind(this.app),
                this.toggleCallback.bind(this),  
                this.getActiveProjectName());
        }
    }

    initialDraw() {
        this.dispManager.redrawProjectSidebar(this.app.getProjectList(), 
            this.addProjectCallback.bind(this), 
            this.unfilteredProjectCallback.bind(this), 
            this.filteredProjectCallback.bind(this), 
            this.deleteProjectCallback.bind(this));
        this.dispManager.redrawActiveTasks(this.app.getAllTasks(), 
            this.expandTaskCallback.bind(this), 
            this.addTaskCallback.bind(this), 
            this.app.getProjectList.bind(this.app), 
            this.toggleCallback.bind(this), 
            this.getActiveProjectName());
    }

    toggleCallback(taskId, projectId) {
        this.app.toggleTaskCompletion(projectId, taskId);
        this.storageManager.persistTask(this.app.getTaskFromIds(taskId, projectId));
    }
}



// TESTING -----------------
const controller = new Controller();

// Add some projects and some tasks
// controller.app.addProject("Unclassified Projects", null);
// controller.app.addProject("Coding", null);
// controller.app.addProject("TOP", null);

// controller.app.addTaskToProject(controller.app.getProjectId(0), "groceries", "get groceries", "1/2/25", 1);
// controller.app.addTaskToProject(controller.app.getProjectId(0), "get car", "pick it up", "1/2/29", 3);

// controller.app.addTaskToProject(controller.app.getProjectId(1), "homework", "for coding", "1/2/23", 2);

// controller.app.addTaskToProject(controller.app.getProjectId(2), "todo app", "for top", "1/2/22", 1);

controller.initialDraw();