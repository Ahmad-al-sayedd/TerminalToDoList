var readlineSync = require("readline-sync");
var chalk = require("chalk");
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
  displayTasks(currentDate) {
    console.log(`
 ${currentDate()}.
 Current Task List:`);

    for (let key in this.objectOfTask) {
      // console.log(`${key}: ${this.objectOfTask[key]}`);
      console.log(chalk.blue(`${key}: ${this.objectOfTask[key]}`)); // You can use different colors (like .red, .yellow, etc.)
    }
  }
}

///////////////////////////////////////////////////////////////Editing Class with remove and edit methods/////////////////////////////////////////////////////////////////////////
class EditingTasks extends TodoListTask {
  constructor() {
    super();
  }

  editTask(taskKey, newTask) {
    //checking if newTask is not an empty  show the message to the user  otherwise  keep it empty and check if the taskKey is a num than render the message
    newTask =
      taskKey != "" && !isNaN(taskKey)
        ? readlineSync.question("write a new Task:")
        : console.log(chalk.red(` No number was added `));
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
    } else {
      taskKey = console.log(chalk.red(` No number was added `));
    }
  }
}
//Class to Get the currently Date
class GetTheDate {
  constructor() {}

  getTheDate() {
    const date = new Date();
    return `${date.getDate()},${
      date.getMonth() + 1
    },${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  }
}

const currentDate = new GetTheDate();

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
taskEditing.displayTasks(currentDate.getTheDate);
