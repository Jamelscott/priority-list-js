/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */
//Please note i've included all of my (Jamel's) comments with a [J] prefix, I have left your comments as is.
function priorityQueue() {
  //[J] I removed the size argument originally included in the function declaration as it was never called inside the function. 
  //[J] If you'd like to impliment a max queue size, be sure to include in the .add method a conditional to check for total items in the queue.
  this.store = {}; //keys are priorities, values are arrays of elements
  this.count = 0; //[J] total number of items in the queue at a given moment

  // adds an item from the queue
  // priority must be an integer (higher value has higher priority)
  priorityQueue.prototype.add = function (value, priority) {
    //[J] I don't see anything that isn't working as intended here. I just added a return that provides some additional context
    if (this.store[priority] == undefined) this.store[priority] = [];
    this.store[priority].push(value);
    this.count++;
    return `${value} has been added to the queue`;
  };

  //removes an item from the queue
  //returns the oldest-added value with the highest priority
  //[J] I updated the name here to a more standard naming convention
  priorityQueue.prototype.dequeue = function () {
    maxKey = Math.max(...Object.keys(this.store));
    //[J] this edge case covers us in the case where there aren't any items in the queue to dequeue
    if (maxKey === -Infinity) return "there are no more items to dequeue";
    let removedItem = this.store[maxKey].shift();
    this.count--; //[J] we need to reduce the count
    //[J] we don't want any lingering empty priorirty queues, so we can deleted them when they're empty
    if (this.store[maxKey].length === 0) {
      delete this.store[maxKey];
    }
    //[J] display which item was removed
    return `${removedItem} has been removed from the queue`;
  };

  //[J] get a list of the total number of items in the queue
  //[J] I renamed this method using camelCase instead of snake_case so it conforms to the rest of the style of the other functions
  priorityQueue.prototype.totalItemCount = function () {
    return this.count;
  };

  //[J] get a list of all of the priority categories in the queue
  priorityQueue.prototype.getAllPriorities = function () {
    return Object.keys(this.store);
  };

  // iterates through all the queue elements in priority-then-FIFO order
  //[J] I chose to update the name of this funciton as forEach is the name of an array method and at a glance it may confuse others
  //[J] I also chose to re-factor this method as it was not quite working as intended
  //[J] I've commented on each step for you as it seemed you were having some trouble on this one.
  priorityQueue.prototype.order = function () {
    let order = []; //establish an order that we add items into based on priority
    var keys = Object.keys(this.store).sort().reverse(); //we are reversing the list here because we want to iterate over the largest number keys first
    //[J] great job setting up the loop here, I chose to change it slightly as it's easier for me to visualise the code when iterating forward instaed of backward.
    for (let i = 0; i < keys.length; i++) {
      if (this.store[keys[i]].length > 1) {
        //[J] I chose to add an if statement here to capture arrays of lenght 1, they will be skipped if included in the folloinwg for loop
        for (var b = 0; b < this.store[keys[i]].length; b++) {
          //[J] I am setting up this loop to iterate over the arrays of each priority
          order.push(this.store[keys[i]][b]); //add item to order list
        }
      } else {
        order.push(this.store[keys[i]][0]); //[J] add item to order list
      }
    }
    return order; //[J] return order so you can see the list in the console
  };

  priorityQueue.prototype.changePriority = function (value, newPriority) {
    //[J] I decided to remove the foundItem variable as i couldn't find a use for it, please let me know why you chose to add it, maybe you see something that I don't
    //[J] forEach loops are designed for iterating over arrays where 'for in' loops are better for iterate over objects
    for (const item in this.store) {
      if (this.store[item].includes(value)) { //[J] confirm if value was already established
        foundItem = true; //[J] update the foundItem variable
        if (item == newPriority) return; //[J] check if the priority is already correct
        let idx = this.store[item].indexOf(value); //f[J] ind the index of the found item in the priorty array
        let removedItem = this.store[item].splice(idx, 1); //[J] remove that item from the priority array
        this.count--; //[J] reduce count by 1 as an item was removed
        this.add(removedItem[0], newPriority); //[J] give the item a new priority based on user input
        return;
      }
    }
  };
}
