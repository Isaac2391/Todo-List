import './styling.css'
const { compareAsc } = require("date-fns")

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

    RightContent.style = ""

    RightContent.style.color = "purple"
    RightContent.style.fontSize = "1.2rem"
    RightContent.style.fontWeight = "500"

    RightContent.innerHTML = ""
    RightContent.innerHTML = `

    <form action="#" method="post" id="frm1"> 
    <h1 style="color:blue;text-decoration:underline"> Create Task </h1> 
    Task Title: <input type="text" name="tasktitle" id="taskTitle"> <br>
    <br> Task Description: <input type="text" name="taskdescription" id="taskDesc"><br>
    <br> Task Due Date: <input type="date" name="taskdate" id="taskDueDate"><br> 
    <br> Task Project? ( leave blank if none ) <input type="text" name="taskproject" id="taskProject"><br>
    <br><input type="button" value="Submit Task!" id="TaskForm-Button"></form>
    `

    document.getElementById("TaskForm-Button").addEventListener("click", ()=>{ HandleTaskInput() })

}

const HandleTaskInput = function() { 

    let taskTitle = document.getElementById("taskTitle").value || "?"
    let taskDescrip = document.getElementById("taskDesc").value || "?"
    let taskDue = document.getElementById("taskDueDate").value || "?"

    let taskID = (crypto.randomUUID) 
        ? crypto.randomUUID() 
        : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

    let taskProject = AddTaskToProject(document.getElementById("taskProject").value, taskID)

    let newTask = createTask(taskTitle,taskDescrip,taskDue,taskProject || "",taskID)
    localStorage.setItem(`task_${taskID}`, JSON.stringify(newTask))
}

const AddTaskToProject = function (taskProjectInputVal, taskID) { 
    if (taskProjectInputVal === "") { return "" }

    for (let i = 0; i < localStorage.length; i++) { 
        let projectKey = localStorage.key(i)

        if (projectKey.startsWith('project_')) {

            let projectData = JSON.parse(localStorage.getItem(projectKey))
            if (String(projectData.ProjectTitle) === String(taskProjectInputVal)) {

                projectData.ProjectTasks.push(taskID)
                localStorage.setItem(projectKey, JSON.stringify(projectData))
                return taskProjectInputVal 
            }
        }
    }
    return "" 
}

NewProjectButton.addEventListener("click", ()=> { NewProject() })

const NewProject = function() {

    RenderNewProject() 

}

    const RenderNewProject = function() {

    RightContent.style = ""

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
    document.getElementById("ProjectForm-Button").addEventListener("click", ()=> { HandleProjectInput(), RenderProjectsSidebar() })
}

const HandleProjectInput = function() { 

    let projectTitle = document.getElementById("projectTitle").value || "?"
    let projectDescription = document.getElementById("projectDesc").value || "?"

    let projectDueDate = document.getElementById("projectDue").value || "?"

    let projectID = (crypto.randomUUID) 
        ? crypto.randomUUID() 
        : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

    let projectTasks = [] 

    let newProject = createProject(projectTitle,projectDescription,projectDueDate,projectID,projectTasks)  
    localStorage.setItem(`project_${projectID}`, JSON.stringify(newProject))
}

UpcomingTasksButton.addEventListener("click", ()=> { RenderUpcomingTasks() })

const RenderUpcomingTasks = function (){ 

    RightContent.innerHTML = ""
    RightContent.style = ""

    RightContent.style.fontWeight = "420"

    let UpcomingTasksArr = [] 

    for (let i = 0; i < localStorage.length; i++) { 
    let taskKey = localStorage.key(i)
    
    if (taskKey.startsWith('task_')) {
        let taskData = JSON.parse(localStorage.getItem(taskKey))
        UpcomingTasksArr.push({...taskData,taskKey})
    }}

    const sortedUpcomingTasksArr = UpcomingTasksArr.sort((a,b) => { 
        return compareAsc(new Date(a.TaskDueDate), new Date(b.TaskDueDate))
    })

     let tasksHtml = sortedUpcomingTasksArr.map(task => {
        return ` <div style="margin-bottom: 10px; padding: 5px;">
        <strong> Title: ${task.TaskTitle || "?"}</strong> 
        <button style="background-color:red; padding: 5px; border-radius: 25%;" class="task-deleter"
        data-key="${task.taskKey}"> X </button><br>
        Due: ${task.TaskDueDate || "?"}
        <br> Description: ${task.TaskDescription || "?"}
        </div> 
        `
            }).join("")

    RightContent.innerHTML = ` <h1 style="color:green;">View Upcoming Tasks</h1>
        <div> ${tasksHtml} </div>`

 document.querySelectorAll(".task-deleter").forEach(TaskDeleteButton=> {
        TaskDeleteButton.addEventListener("click", ()=> { 
            
        const key = TaskDeleteButton.getAttribute("data-key")
        TaskDeleteFunction(key)})
 })

}

const TaskDeleteFunction = function(key) { 
    localStorage.removeItem(key)
    location.reload()
}

const RenderProjectsSidebar = function () {

    MyProjectsContent.innerHTML = ""

    MyProjectsContent.style.height = "fit-content"

    for (let i = 0; i < localStorage.length; i++) { 

    let projectKey = localStorage.key(i)
    
    if (projectKey.startsWith('project_')) {
        
    let projectData = JSON.parse(localStorage.getItem(projectKey))

    MyProjectsContent.innerHTML += `<div style="display:flex; gap: 5%;"> 
    <h1 style="cursor:cell;" class="project-view-btn" data-project='${JSON.stringify(projectData)}'>${projectData.ProjectTitle}</h1>
    <button style="background-color:red; padding: 4.5%; border-radius: 25%; height: 1vh; width: 1vw;"
    class="projects-deleter" data-key="${projectKey}"> X </button> 
    </div>`
  }
 }

    document.querySelectorAll(".projects-deleter").forEach(ProjectDeleteButton=> {
    ProjectDeleteButton.addEventListener("click", ()=> { 
            
    const key = ProjectDeleteButton.getAttribute("data-key")
    ProjectDelete(key)
 })
})
        
  document.querySelectorAll(".project-view-btn").forEach(button => {
        button.addEventListener("click", () => { 
            const projectData = JSON.parse(button.getAttribute("data-project"))
            ProjectView(projectData)
        })
    })

}

RenderProjectsSidebar() 

const ProjectDelete = function (Key) {
    localStorage.removeItem(Key)
    location.reload()
}

const ProjectView = function(ProjectObject) { 

    RightContent.innerHTML = ""

    RightContent.style.fontWeight = "450"
    RightContent.style.textAlign = "center"

    RightContent.style.backgroundColor = "orange"
    RightContent.style.color = "orangered"
    RightContent.style.boxShadow = "10px 10px 20px black"
    RightContent.style.height = "auto"
    RightContent.style.marginBottom = "auto"

    RightContent.style.borderRadius = "15%"
    RightContent.style.padding = "0.5%"

    RightContent.innerHTML = 
`
<h2> ${ProjectObject.ProjectTitle} </h2><br>
<strong><p>Description: ${ProjectObject.ProjectDescription} </p></strong><br>
<strong><p>Due Date: ${ProjectObject.ProjectDueDate} </p></strong><br>
<p> Project Tasks: </p>
    <p>${
        (ProjectObject.ProjectTasks && ProjectObject.ProjectTasks.length > 0)
        ? ProjectObject.ProjectTasks.map(taskID => {
            const task = JSON.parse(localStorage.getItem(`task_${taskID}`));
            return task ? `<div> ${task.TaskTitle} <br>${task.TaskDueDate}</div><br>` : "";
        }).join("")
        : "None"
    }
</p>
`
 }
