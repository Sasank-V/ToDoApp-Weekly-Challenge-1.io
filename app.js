const currDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const icons = document.querySelectorAll(".icons span");

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
    let taskDay = document.querySelector(".date .day");
    let taskMonth = document.querySelector(".date .month");
    let taskYear = document.querySelector(".date .year");
    taskDay.innerText = event.target.outerText;
    taskMonth.innerText = months[currMonth];
    taskYear.innerText = currYear;
}

let updateTasks = (event) => {
    let day = event.target.outerText;
    todayTasks = [];
    for(task of tasks){
        if(task[0] == day && task[1] === currMonth && task[2] ===currYear){
            for(let i = 3;i<task.length;i++){
                todayTasks.push(task[i]);
            }
        }
    }
    let todayList = document.querySelector(".today-tasks");
    todayList.innerHTML = "";
    let tasksTag = "";
    for(task of todayTasks){
        tasksTag += `<div class="task">${task}</div>`;
    }
    todayList.innerHTML = tasksTag;

    let upcomingList = document.querySelector(".upcoming-tasks");
    upcomingList.innerHTML = "";
    upcomingTasksTag = "";
    for(task of tasks){
        if(!todayTasks.includes(task) && task[0] > day && task[1] >= currMonth && task[2] >= currYear){
            upcomingTasksTag += `<div class="task">${task[3]}</div>`;
        }
    }
    upcomingList.innerHTML = upcomingTasksTag;
}
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
    for(let i = 1;i<=lastDateofMonth;i++){
        if(markedDays.includes(i)){
            liTag += `<li class="marked">${i}</li>`;
        }else{
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
    })
});


