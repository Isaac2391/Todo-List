import './styling.css'
const { compareAsc, compareDesc } = require("date-fns")

let RightContent = document.getElementById("Right-Content")
let MyProjectsContent = document.getElementById("MyProjects-Content")

const NewProjectButton = document.querySelector(".LeftColButton.First")
const NewTaskButton = document.querySelector(".LeftColButton.Second")
const UpcomingTasksButton = document.querySelector(".LeftColButton.Third")


function createTask(Title,Description,DueDate,Project,id) {

    return { 
        TaskTitle: Title,
        TaskDescription: Description, 
        TaskDueDate: DueDate, 
        TaskProject: Project,
        Taskid: id,
     }
}

function createProject(Title,Description,DueDate,id,Tasks) { 

    return {
        ProjectTitle : Title,
        ProjectDescription: Description,
        ProjectDueDate: DueDate, 
        Projectid: id,
        ProjectTasks: Tasks,
    }
}

const NewTask = function() {

    RenderNewTask()

}

NewTaskButton.addEventListener("click", ()=> { NewTask() })

const RenderNewTask = function() { 

    RightContent.style.color = "purple"
    RightContent.style.fontSize = "1.2rem"
    RightContent.style.fontWeight = "500"

    RightContent.innerHTML = ""
    RightContent.innerHTML = `

    <h1 style="color:blue;text-decoration:underline"> Create Task </h1> 

    <form action="#" method="post" id="Right-Content"> 
    Task Title: <input type="text" name="tasktitle" id="taskTitle"> <br>
    <br> Task Description: <input type="text" name="taskdescription" id="taskDesc"><br>
    <br> Task Due Date: <input type="date" name="taskdate" id="taskDueDate"><br> 
    <br> Task Project? (if none then "N/A") <input type="text" name="taskproject" id="taskProject"><br>
    <br><input type="button" value="Submit Task!" id="TaskForm-Button"></form>
    `

    document.getElementById("TaskForm-Button").addEventListener("click", ()=>{ HandleTaskInput() })


}

const HandleTaskInput = function() { 

    let taskTitle = document.getElementById("taskTitle").value 
    let taskDescrip = document.getElementById("taskDesc").value 
    
    let taskDue = document.getElementById("taskDueDate").value 

    let taskProject = document.getElementById("taskProject").value 

        let taskID = (crypto.randomUUID) 
        ? crypto.randomUUID() 
        : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
 

    let newTask = createTask(taskTitle,taskDescrip,taskDue,taskProject,taskID)
    localStorage.setItem(`task_${taskID}`, JSON.stringify(newTask))
}

NewProjectButton.addEventListener("click", ()=> { NewProject() })

const NewProject = function() {

    RenderNewProject() 

}

const RenderNewProject = function() { 

    RightContent.style.color = "orange"
    RightContent.style.fontSize = "1.2rem"
    RightContent.style.fontWeight = "500"


    RightContent.innerHTML = ""
    RightContent.innerHTML = 
    
    `<form id="frm1"> 
    <h1 style="color:red;text-decoration:underline"> Create New Project </h1>
    Project Title: <input type="text" name="projectTitle" id="projectTitle"> <br>
    <br> Project Description: <input type="text" name="projectdescription" id="projectDesc"><br>
    <br> Project Due Date: <input type="date" name="projectduedate" id="projectDue"><br>
    <br><input type="button" value="Submit Project!" id="ProjectForm-Button"></form>
    `
    document.getElementById("ProjectForm-Button").addEventListener("click", ()=> { HandleProjectInput() })
}

const HandleProjectInput = function() { 

    let projectTitle = document.getElementById("projectTitle").value 
    let projectDescription = document.getElementById("projectDesc").value

    let projectDueDate = document.getElementById("projectDue").value 

    let projectID = (crypto.randomUUID) 
        ? crypto.randomUUID() 
        : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

    let newProject = createProject(projectTitle,projectDescription,projectDueDate,projectID)  
    localStorage.setItem(`project_${projectID}`, JSON.stringify(newProject))
}

UpcomingTasksButton.addEventListener("click", ()=> { RenderUpcomingTasks() })

const RenderUpcomingTasks = function (){ 

    RightContent.innerHTML = ""
    RightContent.style.color = ""

    RightContent.style.fontWeight = "420"

    let UpcomingTasksArr = [] 

    for (let i = 0; i < localStorage.length; i++) { 
    let taskKey = localStorage.key(i)
    
    if (taskKey.startsWith('task_')) {
        let taskData = JSON.parse(localStorage.getItem(taskKey))
        UpcomingTasksArr.push(taskData)
    }}

    const sortedUpcomingTasksArr = UpcomingTasksArr.sort((a,b) => { 
        return compareAsc(new Date(a.TaskDueDate), new Date(b.TaskDueDate))
    })

     let tasksHtml = sortedUpcomingTasksArr.map(task => {
        return ` <div style="margin-bottom: 10px; padding: 5px;">
                <strong>${task.TaskTitle}</strong><br>
                Due: ${task.TaskDueDate}
                <br> Description: ${task.TaskDescription}
            </div>`}).join("")

    RightContent.innerHTML = ` <h1 style="color:green;">View Upcoming Tasks</h1>
        <div> ${tasksHtml} </div>`
}

const RenderProjectsSidebar = function () {

    MyProjectsContent.style.height = "fit-content"

    for (let i = 0; i < localStorage.length; i++) { 
    let projectKey = localStorage.key(i)
    
    if (projectKey.startsWith('project_')) {
        
        let projectData = JSON.parse(localStorage.getItem(projectKey))

        MyProjectsContent.innerHTML += `<h1>${projectData.ProjectTitle}</h1>`

        let ProjectViewerObject = projectData 

    }
   }
}()

const ProjectViewer = function () { 




}