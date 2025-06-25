// Import stylesheet -----------
import "./styles.css";

// Import module -----------
import ToDoApplication from "./ToDoApplication.js";
import DisplayManager from "./DisplayManager.js";

// Add image -----------
// import testImage from "./test.png";
// const image = document.createElement("img");
// image.src = testImage;

// TESTING -----------------
const app = new ToDoApplication();
const dispManager = new DisplayManager();
// Add some projects and some tasks
app.addProject("Coding");
app.addProject("TOP");

app.addTaskToProject(app.getProjectId(0), "groceries", "get groceries", "1/2/25", 1);
app.addTaskToProject(app.getProjectId(0), "get car", "pick it up", "1/2/29", 3);

app.addTaskToProject(app.getProjectId(1), "homework", "for coding", "1/2/23", 2);

app.addTaskToProject(app.getProjectId(2), "todo app", "for top", "1/2/22", 1);

// Draw project list
console.log(app.getProjectList());
dispManager.redrawProjectSidebar(app.getProjectList());

// Draw tasks
console.log(app.getAllTasks());
dispManager.redrawActiveTasks(true, app.getAllTasks());
