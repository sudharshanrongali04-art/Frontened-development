function tasksadd(){
    let task=document.getElementById("tasks");
    let taskValue=task.value.trim();
    if(taskValue===""){
        alert("Please enter a task!");
        return;
    }
    let li=document.createElement("li");
    let span=document.createElement("span");
    span.textContent=taskValue;
    span.className="task_text";
    span.onclick=function(){
        span.classList.toggle("completed");
    };
    let deleteBtn=document.createElement("button");
    deleteBtn.textContent="Delete";
    deleteBtn.className="delete_btn";
    deleteBtn.onclick=function(){
        li.remove();
    }
    li.appendChild(span);
    li.appendChild(deleteBtn);
    let tasklist=document.getElementById("task_list");
    tasklist.appendChild(li);
    task.value="";

}