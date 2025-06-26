export default class Task {
    constructor(taskName, description, dueDate, priority, isComplete, projectId, projectName) {
        this.taskName = taskName;           // string
        this.description = description;     // string 
        this.dueDate = dueDate;             // Date()
        this.priority = priority;           // 1, 2, 3
        this.isComplete = isComplete;       // boolean
        this.id = crypto.randomUUID();
        this.projectId = projectId;
        this.projectName = projectName;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }

    updateTask(taskName, description, dueDate, priority, isComplete) {
        this.taskName = taskName;           // string
        this.description = description;     // string 
        this.dueDate = dueDate;             // Date()
        this.priority = priority;           // 1, 2, 3
        this.isComplete = isComplete;       // boolean
    }
}