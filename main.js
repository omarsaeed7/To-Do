
let tasks=[
    {
        "title" : "Read Books",
        "date" : "13/13/51",
        "isDone" : false
    },
    {
        "title": "Read ",
        "date": "13/13/51",
        "isDone": false
    },
    {
        "title": "Books",
        "date": "13/13/51",
        "isDone": false
    }
]

// get the tasks from localStoratge
function getTasks(){

    let retrievedTasks= JSON.parse(localStorage.getItem("tasks"));
    if (retrievedTasks == null){ tasks=[];}else{tasks=retrievedTasks;};
};
getTasks();


function clearAndFill(){
    // clear the html element before adding new items 
    // There was a + here after = that make the code bug
    document.getElementById("uList").innerHTML = " "
    // this index is for make the del function for spacifc task unique
    let index=0;
    
    // this for loop go over the whole loop and return the items inside it 
for(item of tasks){
    let content = 
    `
        <li class="List ${item.isDone? 'Lists' : ''}">
                <p id="UserInput">${item.title}</p>
            <div id="icons">
                ${item.isDone ? `
                 <button onclick="done(${index})" class="list-btns" id="done">
            <i class="fa fa-times " aria - hidden="true" ></i>
                </button > ` : ` <button onclick="done(${index})" class="list-btns" id="done">
                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                </button>`}
               
                <button onclick="edit(${index})" class="list-btns" id="edit">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button onclick="del(${index})" class="list-btns " id="del">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
            </li>
        `
        // adding conctent to the list and + is for addin all element not just the last one
    document.getElementById("uList").innerHTML += content
    index++;
}
};

// Adding Function
let addButtons = document.getElementById("addBtn");
addButtons.addEventListener("click", function (){
        // Input field ✓
        let taskItem  = document.getElementById("inp");
        // Object contain user task item ✓
        let taskValue = { "title": taskItem.value, "date": "12/1/23", "isDone": false };
        // add item to the array ✓
        tasks.push(taskValue);
        // See the result of array ✓
        console.log(tasks);
        // Clear Input Field ✓
        taskItem.value = ' ';
        storeTasks();
        // Update The UI
        clearAndFill();
});

// Delete Function 
function del(index){
    // This check if the user is sure about deleting the task and the task title
    let isConfirmed = confirm("Are You Sure To Delete This Task?" + " "+tasks[index].title);
    // check if the user is sure 
    if(isConfirmed==true){
        // using splice to delete the item from the array
    tasks.splice(index,1);
    // update the UI Design after Deleting task
    clearAndFill();
    storeTasks();
    }else{
        storeTasks();
        console.log("do nothing");
        clearAndFill();
    };
};

// Edit Function
function edit(index){
    // this is pass by refrence that's mean any edit will apply on the tasks[index]
    let task = tasks[index];
    let newTaskTitle = prompt("Edit The Task" , task.title);
   
    if(newTaskTitle!=null){
        task.title = newTaskTitle;
        storeTasks();
        clearAndFill();
    }
    
    console.log(tasks);
};

// Checked Function
function done(index){
    let task= tasks[index];
    // this condition check if the task done or not then give him the choice to fall back
    if (task.isDone == false)
    {
        task.isDone=true;
        storeTasks();   
    }else{
        task.isDone=false;
        storeTasks();
    }
    
    console.log(tasks)
    clearAndFill();
}

// Locate Storage Function
function storeTasks(){
    // Transform Array To String Or JSON
    let taskString = JSON.stringify(tasks);
    // Local Storage 
    localStorage.setItem("tasks", taskString);
}

clearAndFill();