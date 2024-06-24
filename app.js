const currDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const icons = document.querySelectorAll(".icons span");
const inpTask = document.querySelector(".inp-task");
const inpBtn = document.querySelector(".inp-btn");

const taskMonth = document.querySelector(".date .month");
const taskYear = document.querySelector(".date .year");
const taskDay = document.querySelector(".date .day");

const todayList = document.querySelector(".today-tasks");
const upcomingList = document.querySelector(".upcoming-tasks");



let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const tasks = [[22,5,2024,"Build a To-Do App"],[23,5,2024,"Attend Weekly Contest"],[18,5,2024,"Attend the club Meeting"]];
let todayTasks = [];

const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

const  getMarkedDays = () =>{
    let markedDays = [];
    for(task of tasks){
        if(task[1] === currMonth && task[2] === currYear){
            markedDays.push(task[0]);
        }
    }
    return markedDays;
}

let updateTaskBarHead = (event) =>{
    let day = "";
    let mon = "";
    let year = "";
    try{
        day = event.target.outerText;
        mon = months[currMonth];
        year = currYear;
    }catch{
        day = date.getDate();
        mon = months[date.getMonth()];
        year  = date.getFullYear();
    }
    taskDay.innerText = day;
    taskMonth.innerText = mon;
    taskYear.innerText = year;
}
updateTaskBarHead();
let updateTasks = (event) => {
    let day = "";
    try{
        day = event.target.outerText; 
    }catch{
        day = event;
    }
    todayTasks = [];
    for(task of tasks){
        if(task[0] == day && task[1] === currMonth && task[2] ===currYear){
            for(let i = 3;i<task.length;i++){
                todayTasks.push(task[i]);
            }
        }
    }

    todayList.innerHTML = "";
    let tasksTag = "";
    for(task of todayTasks){
        tasksTag += `<div class="task">${task}<i class="fa-regular fa-circle-xmark del"></i></div>`;
    }
    if(todayTasks.length == 0){
        tasksTag = '<div class="task">No tasks today</div>';
    }
    todayList.innerHTML = tasksTag;

    upcomingList.innerHTML = "";
    upcomingTasksTag = "";
    for(task of tasks){
        if(!todayTasks.includes(task) && task[0] > day && task[1] >= currMonth && task[2] >= currYear){
            upcomingTasksTag += `<div class="task">${task[3]}<i class="fa-regular fa-circle-xmark del"></i></div>`;
        }
    }
    if(upcomingTasksTag.length == 0){
        upcomingTasksTag = '<div class="task">No upcoming tasks</div>';
    }
    upcomingList.innerHTML = upcomingTasksTag;

    let delBtns = document.querySelectorAll(".del");
    delBtns.forEach(del =>{
        del.addEventListener("click",() => {
            let delTask = del.parentElement.innerText;
            for(task of tasks){
                if(task[3] === delTask){
                    tasks.splice(tasks.indexOf(task),1);
                    break;
                }
            }
            del.parentElement.remove();
            renderCalendar();
        });
    });
}
updateTasks(new Date().getDate());
const renderCalendar = () =>{
    let firstDayOfMonth = new Date(currYear,currMonth,1).getDay();
    let lastDateofMonth = new Date(currYear,currMonth+1,0).getDate();
    let lastDayofMonth = new Date(currYear,currMonth,lastDateofMonth).getDay();
    let lastDateofPrevMonth = new Date(currYear,currMonth,0).getDate();
    
    let liTag = "";
    let markedDays = getMarkedDays();
    for(let i= firstDayOfMonth;i>0;i--){
        liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
    }
    let today = new Date();
    for(let i = 1;i<=lastDateofMonth;i++){
        if(markedDays.includes(i)){
            liTag += `<li class="marked">${i}</li>`;
        }else if(i == today.getDate() && currMonth == today.getMonth() && currYear == today.getFullYear()){
            liTag += `<li class="hover today">${i}</li>`;
        }
        else{
            liTag += `<li class="hover">${i}</li>`;
        }
    }
    for(let i = lastDayofMonth; i<6;i++){
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    let daysOfMonth = document.querySelectorAll(".days li");
    daysOfMonth.forEach(day => {
        if(!day.classList.contains("inactive")){
            day.addEventListener("click",updateTasks);
            day.addEventListener("click",updateTaskBarHead);
        }
    });
}
renderCalendar();

icons.forEach(icon => {
    icon.addEventListener("click",()=>{
        currMonth = icon.id == "prev" ? currMonth-1: currMonth+1;
        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear,currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }else{
            date = new Date();
        }
        renderCalendar();
    });
});

let refreshTasks = (currDay) => {
    updateTasks(currDay);
    renderCalendar();
};

inpBtn.addEventListener("click",()=>{
    let newTask = inpTask.value;
    inpTask.value = "";
    if(newTask != ""){
        let newDay = parseInt(taskDay.textContent);
        let newMonth = months.indexOf(taskMonth.textContent); 
        let newYear= parseInt(taskYear.textContent);

        if(newMonth == -1){
            alert("Pick a date to add task");
        }else{
            tasks.push([newDay,newMonth,newYear,newTask]);
            refreshTasks(newDay);
        }
    }
});

const placeText = ["Add a Task  ","Learn Tailwind and React","Complete Club Weekly Challenge","Math Test on Algebra"];


let charIdx = 0;
let egIdx = 0;

function updatePlaceholder(){
    charIdx++;
    inpTask.placeholder = placeText[egIdx].slice(0,charIdx);
    if(charIdx == placeText[egIdx].length){
        egIdx++;
        charIdx = 0;
    }
    if(egIdx == placeText.length){
        egIdx = 0;
    }
    setTimeout(updatePlaceholder,250);
}
updatePlaceholder();

