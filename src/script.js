import './styling.css'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

let RightContent = document.getElementById("Right-Content")
let RightContentTitle = document.getElementById("RightContent-Title")

const NewProjectButton = document.querySelector(".LeftColButton.First")
const NewTaskButton = document.querySelector(".LeftColButton.Second")
const viewUpcomingButton = document.querySelector(".LeftColButton.Third")

function createTask(Title,Description,DueDate,Priority,Checklist,id) {

    return { 
        TaskTitle: Title,
        TaskDescription: Description, 
        TaskDueDate: DueDate, 
        TaskPriority: Priority, 
        TaskComplete: Checklist,
        Taskid: id,
     }
}

function createProject(Title,Description,TaskItems,Type,DueDate,Priority,id) { 

    return {
        ProjectTitle : Title,
        ProjectDescription: Description,
        ProjectItems: TaskItems,
        ProjectType: Type,
        ProjectDueDate: DueDate, 
        ProjectPriority : Priority, 
        Projectid: id,
    }
}

NewTaskButton.addEventListener("click", ()=> { NewTask() })

const NewTask = function() {

    RenderNewTask()

}

const RenderNewTask = function() { 

    RightContentTitle.innerText = ""
    RightContentTitle.style.color = "blue"
    RightContentTitle.style.textDecoration = "underline"

    RightContentTitle.innerText = "Create New Task"

    RightContent.style.color = "purple"
    RightContent.style.fontSize = "1.2rem"
    RightContent.style.fontWeight = "500"

    RightContent.innerHTML = ""
    RightContent.innerHTML = `

    <form action="#" method="post" id="taskForm"> 
    Task Title: <input type="text" name="tasktitle" id="taskTitle"> <br>
    <br> Task Description: <input type="text" name="taskdescription" id="taskDesc"><br>
    <br> Task Due Date: <input type="date" name="taskdate" id="taskDueDate"><br> 
    <br> Task Priority: <input type="number" name="taskpriority" id="taskPriority"><br>
    <br> Task Project? (if none then "N/A") <input type="text" name="taskproject" id="taskProject"><br>
    <br><input type="button" value="Submit Task!" id="TaskForm-Button"></form>
    `

    document.getElementById("TaskForm-Button").addEventListener("click", ()=>{ HandleTaskInput() })


}

const HandleTaskInput = function() { 

    let taskTitle = document.getElementById("taskTitle").value 
    let taskDescrip = document.getElementById("taskDesc").value 
    
    let taskDue = document.getElementById("taskDueDate").value 
    let taskPriority = document.getElementById("taskPriority").value

    let taskProject = document.getElementById("taskProject").value 

    let taskID = crypto.randomUUID() 

    let newTask = createTask(taskTitle,taskDescrip,taskDue,taskPriority,taskPriority,taskProject,taskID)
    localStorage.setItem(`task${taskID}`, JSON.stringify(newTask))
}

NewProjectButton.addEventListener("click", ()=> { NewProject() })

const NewProject = function() {

    RenderNewProject() 

}

const RenderNewProject = function() { 

    RightContentTitle.innerText = ""
    RightContentTitle.style.color = "orangered"
    RightContentTitle.style.textDecoration = "underline"

    RightContentTitle.innerText = "Create New Project"

    RightContent.style.color = "orange"
    RightContent.style.fontSize = "1.2rem"
    RightContent.style.fontWeight = "500"


    RightContent.innerHTML = ""
    RightContent.innerHTML = 
    
    `<form id="frm1"> 
    Project Title: <input type="text" name="projectTitle" id="projectTitle"> <br>
    <br> Project Description: <input type="text" name="projectdescription" id="projectDesc"><br>
    <br> Project Tasks (comma seperated): <input type="text" name="projecttasks" id="projectTasks"><br>
    <br> Project Type: <input type="text" name="projecttype" id="projectType"><br>
    <br> Project Due Date: <input type="date" name="projectduedate" id="projectDue"><br>
    <br> Project Priority: <input type="number" name="projectpriority" id="projectPriority"><br>
    <br><input type="button" value="Submit Project!" id="ProjectForm-Button"></form>
    `
    document.getElementById("ProjectForm-Button").addEventListener("click", ()=>{ HandleProjectInput() })
}

const HandleProjectInput = function() { 

    let projectTitle = document.getElementById("projectTitle").value 
    let projectDescription = document.getElementById("projectDesc").value

    let projectTasks = document.getElementById("projectTasks").value 

    let projectType = document.getElementById("projectType").value 
    let projectDueDate = document.getElementById("projectDue").value 
    let projectPriority = document.getElementById("projectPriority").value 

    let projectID = crypto.randomUUID() 

    let newProject = createProject(projectTitle,projectDescription,projectTasks,projectType,projectDueDate,projectPriority,projectID)  
    localStorage.setItem(`project${projectID}`, JSON.stringify(newProject))

}

viewUpcomingButton.addEventListener("click", ()=> { Upcoming() })

const Upcoming = function() { 

    RenderUpcoming() 

}

const RenderUpcoming = function () { 

    RightContentTitle.innerText = ""
    RightContent.innerHTML = ""
    RightContentTitle.style.textDecoration = ""

    RightContentTitle.style.color = "green"

    RightContentTitle.innerText = "View Upcoming Tasks"

}