/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */
function priorityQueue(size) {
  //this could be structured as a class but using a function works too. I am not sure which is more efficient of a build at this time. Also, from my understanding functions should be named using camelCase.
  this.store = {}; //keys are priorities, values are arrays of elements
  this.count = 0; //total number of items in the queue at a given moment

  // adds an item from the queue
  // priority must be an integer (higher value has higher priority)
  priorityQueue.prototype.add = function (value, priority) {
    //this function looks really good! i just added a return that provides some context
    if (this.store[priority] == undefined) this.store[priority] = [];
    this.store[priority].push(value);
    this.count++;
    return `${value} has been added to the queue`;
  };

  //removes an item from the queue
  // returns the oldest-added value with the highest priority
  priorityQueue.prototype.dequeue = function () {
    // I updated the name here to a more standard nomenclature for priorty queues
    maxKey = Math.max(...Object.keys(this.store));
    //this edge case covers us in the case where there aren't any items in the queue to dequeue
    if (maxKey === -Infinity) return "there are no more items to dequeue";
    let removedItem = this.store[maxKey].shift();
    this.count--; //we need to reduce the count
    //we don't want any lingering empty priorirty queues, so we can deleted them when they're empty
    if (this.store[maxKey].length === 0) {
      delete this.store[maxKey];
    }
    //display which item was removed
    return `${removedItem} has been removed from the queue`;
  };

  //get a list of the total number of items in the queue
  priorityQueue.prototype.totalItemCount = function () {
    //this looks good but I wanted to change the syntax slightly so it conforms to the rest of the style of the other functions.
    return this.count;
  };

  //get a list of all of the priority categories in the queue
  priorityQueue.prototype.getAllPriorities = function () {
    return Object.keys(this.store);
  };

  // iterates through all the queue elements in priority-then-FIFO order
  priorityQueue.prototype.order = function () {
    //I chose to update the name of this funciton as forEach is the name of an array method and at a glance it may confuse others
    let order = []; //establish an order that we add items into based on priority
    var keys = Object.keys(this.store).sort().reverse(); //we are reversing the list here because we want to iterate over the largest number keys first

    for (let i = 0; i < keys.length; i++) {
      // great job setting up the loop here, I chose to change it slightly as it's easier for me to visualise the code when iterating up from 0 instead of down. but the way you had it definitely works too!
      if (this.store[keys[i]].length > 1) {
        //I chose to add an i statement here to capture arrays of lenght 1, they will be skipped if included in the folloinwg for loop
        for (var b = 0; b < this.store[keys[i]].length; b++) {
          // I am setting up this loop to iterate over the arrays of each priority
          order.push(this.store[keys[i]][b]); //add item to order list
        }
      } else {
        order.push(this.store[keys[i]][0]); //add item to order list
      }
    }
    return order; //return order so you can see the list in the console
  };

  priorityQueue.prototype.changePriority = function (value, newPriority) {
    //I decided to remove the foundItem variable as i couldn't find a use for it, please let me know why you chose to add it, maybe you see something that I don't
    //forEach loops are designed for iterating over arrays where for in loops can iterate over objects
    for (const item in this.store) {
      //confirm if value was already established
      if (this.store[item].includes(value)) {
        foundItem = true; //update the foundItem variable
        if (item == newPriority) return; //check if the priority is already correct
        let idx = this.store[item].indexOf(value); //find the index of the found item in the priorty array
        let removedItem = this.store[item].splice(idx, 1); //remove that item from the priority array
        this.count--; //reduce count by 1 as an item was removed
        this.add(removedItem[0], newPriority); //give the item a new priority based on user input
        return;
      }
    }
  };
}

//queue initialization
const queue = new priorityQueue();
queue.add("grapes", 5);
queue.add("orange", 1);
queue.add("apple", 3);
queue.add("pineapple", 5);
queue.add("chocolate1", 6);
queue.add("chocolate2", 6);
queue.add("chocolate3", 6);
queue.add("chocolate4", 6);
queue.add("chocolate5", 6);
queue.add("chocolate6", 6);
queue.add("chocolate9", 2);
queue.add("chocolate7", 6);
queue.add("chocolate8", 6);

// //Final thoughts// //
//I think you did a great job on this, especially for a junior developer, you have a lot to be proud of and it's a treat to watch you progress as a developer. You not only showed me how to use prototyping and make functions usable in the dev tools but you also showed me that if statements don't require curly brackets! Oh, and setting up the function to be used as a class or function was apprecated. A couple things I think you could improve on are as follows;
//more consistency on syntax (example using this. instead of prototype) also type to keep all naming conventions the same, try not to use snake_case and camelCase in the same project
//test your code before submitting. there were a couple functions that did not work.
