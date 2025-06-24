export default class Task {
    constructor(taskName, description, dueDate, priority, isComplete) {
        this.taskName = taskName;           // string
        this.description = description;     // string 
        this.dueDate = dueDate;             // Date()
        this.priority = priority;           // 1, 2, 3
        this.isComplete = isComplete;       // boolean
        this.id = crypto.randomUUID();
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