var readlineSync = require("readline-sync");
var chalk = require("chalk");

class TodoListTask {
  constructor() {
    //AN EMPTY  OBJECT TO LET THE USER ADD THE TASKS IN IT  LATER
    this.objectOfTask = {};

    console.log(this.instructions());

    this.addTasksToTheObj();

  }

  //  adding some instructions
  instructions() {

    return chalk.bgYellow.bold("To Stop adding tasks,type [Finish].");

  }










  //Adding the user input value to the task object
  addTasksToTheObj() {

    let userInput;

    //Setting an index to be able to increment it  later when the user insert more tasks and it will be added  once every time  when the user add a task   later on

    let key = 1;

    // allow the user to add more tasks and add it  to the object of task
    do {

      userInput = readlineSync.question(chalk.bgBlue.bold("Add a Task:"));

      if (userInput === "") {

        this.objectOfTask[key] = "Your Task is empty";

      } 
      else if (userInput === "Finish") {

        break;

      } 
      else {

        // adding the keys and the values of object

        this.objectOfTask[key++] = userInput;

      }

      console.log(this.objectOfTask);

    } while (userInput !== "Finish");

    return this.objectOfTask;
  }





  //Displaying the Current Tasks and includes  the current date as a Callback 

  displayTasks(currentDate) {

    console.log("####################################################");

    console.log(
  chalk.bgGray.bold(`
 ${currentDate()}
 Current Task List:`)
    );

    for (let key in this.objectOfTask) {
    
  // converting the first letter of the key   to upperCase and then print the key and the value  
  let task = this.objectOfTask[key];


         //checking if the task not an empty string  and not a number  if true run the upperCase method 

     if(task !='' ){

      let upperCaseTask = task[0].toUpperCase() + task.slice(1);

     console.log(chalk.blue.bold(`${key}: ${upperCaseTask}`));
  

     }else{
      console.log(chalk.blue.bold(`${key}: ${task}`));

     }
    
    }


    console.log("####################################################");
  }
}














///////////////////////////////////////////////////////////////Editing Class with remove and edit methods/////////////////////////////////////////////////////////////////////////
class EditingTasks extends TodoListTask {

  constructor() {

    super();

  }







  editTask(taskKey, newTask) {

    //checking if taskKey is not an empty and the taskKey is a number...
    //  if true than let the user edit the task otherwise show no number provided  and the newtask will be an empty string


    newTask = taskKey != "" && !isNaN(taskKey) ? readlineSync.question("write a new Task:") :  console.log(chalk.red.bold(` No number was provided `));

    if (this.objectOfTask[taskKey]) {

      this.objectOfTask[taskKey] = newTask;


      console.log(chalk.yellow(`Task ${taskKey} has been updated to: ${newTask}`));

    }
  }







  //Deleting Task

  remove(taskKey) {

    //checking if object has the property which the user gives if yes remove it if no  No number was provided

    if (this.objectOfTask.hasOwnProperty(taskKey)) {


      delete this.objectOfTask[taskKey];


      console.log(chalk.yellow(`Task ${taskKey} has been deleted.`));
    } else {

      taskKey = console.log(chalk.red.bold(` No number was provided `));

    }
  }
}







//Class to Get the currently Date and ask the user if he is satisfied with his task and if not to let him change or remove some tasks 
class Additional {

  constructor() {
   
  }









//Getting the date and the time 
  getTheDate() {


    const date = new Date();


    return `${date.getDate()},${ date.getMonth() + 1},${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

  }










 // function that asks  if the user is satisfied and returns the callback functions based on  conditions (editing,removing ,displaying) if the answer 

  userSatisfaction(editCallback, removeCallback, displayCallback) {

    let input =readlineSync.question( chalk.blackBright.bold(` 
  Are you satisfied with your task list? Press [Enter] to view your final list,
  or type any [Letter] or [Number]  to edit or remove tasks.
      `));

      //if the user hit Enter then display the task list

    if (input=== '' ) {


      displayCallback(this.getTheDate);


    } 
    // if the user input was not empty then run the functions below 
    
    else  {


      editCallback(
        readlineSync.question(`To (Edit),Write the Task [number] otherwise hit [Enter]:`),""
      );

      removeCallback(
        readlineSync.question(`To (Remove),Write the Task [number] otherwise hit [Enter]:`)
      );

      // The display function takes the getTheDate function as a callback and render it 

      displayCallback(this.getTheDate);


    }


     //Ask the user if he has some ideas or  something  what  he wasn't unhappy with  and  let the user to add his feedback
    
    let input2 =readlineSync.question( chalk.bgYellow.bold(` Do you have some ideas to improve our App  or  there anything you're unhappy with? if Yes type [y]`));

    if(input2==='y'){


    let userFeedback=readlineSync.question( ` Your feedback is important to us. Feel free to leave a comment! `)

        

  console.log(`
  Your comment (${userFeedback})
  will be taken in consideration,Thank You for using our App,see u again. 🤗
        
        `);
       
    }
    else{
      console.log('Thank You for using our App,see u again. 🤗')
    }

      

  }
}








const currentDate = new Additional();

const taskEditing = new EditingTasks();

// taskEditing.editTask(
//   readlineSync.question(
//     `
// To continue without (Editing) hit [Enter].
// To (Edit) some of the  Tasks,Write the Task [number]:
//   `
//   ),
//   ""
// );

// // taskEditing.remove(readlineSync.question("write the number of the  Task to remove"));
// taskEditing.remove(
//   readlineSync.question(`
// To continue without (Removing) hit [Enter].
// To (Remove) some of the  Tasks, Write the Task [number]:
//     `)
// );
  
currentDate.userSatisfaction
(
  taskEditing.editTask.bind(taskEditing), // Bind editTask to taskEditing
  taskEditing.remove.bind(taskEditing),
  taskEditing.displayTasks.bind(taskEditing, currentDate.getTheDate.bind(currentDate)) // Pass currentDate function
);
