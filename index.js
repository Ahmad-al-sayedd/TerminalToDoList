var readlineSync = require("readline-sync");

class TodoListTask {
  constructor() {
    this.objectOfTask = {};
    console.log(this.instructions());

    this.addTasksToTheObj();
  }

  //  adding some instructions
  instructions() {
    return `To See ur Tasks List type [Finish]  `;
  }

  //Adding the user input value to the task list
  addTasksToTheObj() {
    let userInput;
    let key = 1;

    // allow the user to add more tasks and add it  to the object of task
    do {
      userInput = readlineSync.question("Add a Task:");

      if (userInput === "") {
        this.objectOfTask[key] = "Your Task is empty";
      } else if (userInput === "Finish") {
        break;
      } else {
        // adding the keys and the values of object
        this.objectOfTask[key++] = userInput;
      }

      console.log(this.objectOfTask);
    } while (userInput !== "Finish");

    return this.objectOfTask;
  }
  //Displaying the Current Tasks
  displayTasks() {
    console.log("Current Task List:");
    for (let key in this.objectOfTask) {
      console.log(`${key}: ${this.objectOfTask[key]}`);
    }
  }
}

///////////////////////////////////////////////////////////////Editing Class with remove and edit methods/////////////////////////////////////////////////////////////////////////
class EditingTasks extends TodoListTask {
  constructor() {
    super();
  }

  editTask(taskKey, newTask) {
    //checking if newTask is not an empty  show the message to the user  otherwise  keep it empty
    newTask = taskKey != "" ? readlineSync.question("write a new Task:") : "";

    if (this.objectOfTask[taskKey]) {
      this.objectOfTask[taskKey] = newTask;
      console.log(`Task ${taskKey} has been updated to: ${newTask}`);
    }
  }

  //Deleting Task

  remove(taskKey) {
    //checking if object

    if (this.objectOfTask.hasOwnProperty(taskKey)) {
      delete this.objectOfTask[taskKey];
      console.log(`Task ${taskKey} has been deleted.`);
    }
  }
}
const taskEditing = new EditingTasks();

taskEditing.editTask(
  readlineSync.question(
    `
To continue without (Editing) hit [Enter].
To (Edit) some of the  Tasks,Write the Task [number]:
  `
  ),
  ""
);

// taskEditing.remove(readlineSync.question("write the number of the  Task to remove"));
taskEditing.remove(
  readlineSync.question(`
To continue without (Removing) hit [Enter].
To (Remove) some of the  Tasks, Write the Task [number]:
    `)
);
taskEditing.displayTasks();
