import './styling.css'

let RightContent = document.getElementById("Right-Content")
let RightContentTitle = document.getElementById("RightContent-Title")

const NewProjectButton = document.querySelector(".LeftColButton.First")
const NewTaskButton = document.querySelector(".LeftColButton.Second")
const UpcomingTasksButton = document.querySelector(".LeftColButton.Third")

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

function createProject(Title,Description,TaskItems,DueDate,Priority,id) { 

    return {
        ProjectTitle : Title,
        ProjectDescription: Description,
        ProjectItems: TaskItems,
        ProjectDueDate: DueDate, 
        ProjectPriority : Priority, 
        Projectid: id,
    }
}

const NewTask = function() {

    RenderNewTask()

}

NewTaskButton.addEventListener("click", ()=> { NewTask() })

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

        let taskID = (crypto.randomUUID) 
        ? crypto.randomUUID() 
        : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
 

    let newTask = createTask(taskTitle,taskDescrip,taskDue,taskPriority,taskProject,taskID)
    localStorage.setItem(`task_${taskID}`, JSON.stringify(newTask))
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
    <br> Project Due Date: <input type="date" name="projectduedate" id="projectDue"><br>
    <br> Project Priority: <input type="number" name="projectpriority" id="projectPriority"><br>
    <br><input type="button" value="Submit Project!" id="ProjectForm-Button"></form>
    `
    document.getElementById("ProjectForm-Button").addEventListener("click", ()=> { HandleProjectInput() })
}

const HandleProjectInput = function() { 

    let projectTitle = document.getElementById("projectTitle").value 
    let projectDescription = document.getElementById("projectDesc").value

    let projectTasks = document.getElementById("projectTasks").value 

    let projectDueDate = document.getElementById("projectDue").value 
    let projectPriority = document.getElementById("projectPriority").value 

    let projectID = (crypto.randomUUID) 
        ? crypto.randomUUID() 
        : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

    let newProject = createProject(projectTitle,projectDescription,projectTasks,projectDueDate,projectPriority,projectID)  
    localStorage.setItem(`project_${projectID}`, JSON.stringify(newProject))

}

UpcomingTasksButton.addEventListener("click", ()=> { RenderUpcomingTasks() })

const RenderUpcomingTasks = function (){ 

    RightContent.innerHTML = ""
    RightContent.style.color = ""
    
    RightContentTitle.style.color = ""
    RightContentTitle.innerText = ""

    RightContentTitle.style.color = "green"
    RightContentTitle.innerText = "View Upcoming Tasks"
    RightContentTitle.style.textDecoration = "" 

    RightContent.style.fontWeight = "420"

    let UpcomingTasksArr = [] 

    for (let i = 0; i < localStorage.length; i++) { 
    let taskKey = localStorage.key(i)
    
    if (taskKey.startsWith('task_')) {
        let taskData = JSON.parse(localStorage.getItem(taskKey))

        UpcomingTasksArr.push(`<h1>${taskData.TaskTitle}</h1> <p>Description: ${taskData.TaskDescription}</p> 
            <p>Due Date: ${taskData.TaskDueDate}</p> <p>Priority: ${taskData.TaskPriority}</p>`)

    }

    RightContent.innerHTML = UpcomingTasksArr 

  }
}