let search=document.getElementById("search");
let createButton=document.getElementById("create-button");
let main=document.getElementById("main");
let task=document.getElementById("create-task");
let find=document.getElementById("find-task");



createButton.addEventListener("click",()=>{

    task.innerHTML="" ;
    main.innerHTML="";

    const container=document.createElement("div");
    container.className="mt-6 space-y-4 flex flex-col items-center";


    const title=document.createElement("input");
    title.placeholder="Title";
    title.id="title";
    title.className = "border p-2 px-4 rounded-lg w-64";
    container.appendChild(title);


    const description=document.createElement("input");
    description.placeholder="Description";
    description.id="description";

    description.className = "border p-2 px-4 rounded-lg w-64";
    container.appendChild(description);

    const saveButton=document.createElement("Button");
    saveButton.textContent="Save";
    saveButton.className="px-28 py-2 rounded-xl bg-purple-200 font-medium cursor-pointer "
 
    
    saveButton.addEventListener("click",()=>{
            const title=document.getElementById("title").value;
            const description=document.getElementById("description").value;
        
            console.log(title,description);

            const task={
                title:title,
                description:description
            };

            const tasks=JSON.parse(localStorage.getItem('tasks')) || [];

            tasks.push(task);

            localStorage.setItem('tasks',JSON.stringify(tasks));

            // title=" ";
            // description=" ";


            alert("Tasks Saved Successfully");


        


})

container.appendChild(saveButton);
    
task.appendChild(container);

})

// let saveButton=document.getElementById("saveButton");


// saveButton.addEventListener("click",()=>{
//     const title=document.getElementById("title").value;
//     const description=document.getElementById("description").value;

//     console.log(title,description);

// })