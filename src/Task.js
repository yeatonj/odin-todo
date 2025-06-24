export default class Task {
    constructor(taskName, description, dueDate, priority, isComplete) {
        this.taskName = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.id = crypto.randomUUID();
    }
}