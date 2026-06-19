const mainDiv = document.querySelector("main")
const formBox = document.querySelector(".form")
const task_parent = document.querySelector(".task_parent")
const form = document.querySelector("form")
const field1 = document.querySelector(".taskname")
const field2 = document.querySelector(".taskdesk")
const field3 = document.querySelector("#category")
const total = document.querySelector(".total")


const toggleBtn = document.querySelector(".toggle_icon");
const toggleEmoji = toggleBtn.querySelector("span");


toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleEmoji.textContent = "🌙";
    } else {
        toggleEmoji.textContent = "☀️";
    }
});



const taskArr = []

total.innerHTML = `<h4>Total Tasks: ${taskArr.length}</h4>`

let editID = null;;
let id = 0;

let card = () => {
    task_parent.innerHTML = "";
    taskArr.forEach((elem, i) => {
        task_parent.innerHTML += `<div class="task_card">
                <div class="task_header">
                    
                    <div class="work_cat">${elem.category}</div>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>


                <div class="task_main">
                    <h4>${elem.taskName}</h4>
                    <p>${elem.taskDesk}</p>
                </div>

                <div class="task_footer">
                    <button class="edit" data-index="${i}">Edit</button>
                    <button class="delete" data-delete="${i}">Delete</button>
                </div>
            </div>`
    })
}


mainDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains("add")) {
        formBox.style.display = "flex"
    }
    if (e.target.classList.contains("close")) {
        formBox.style.display = "none";
        form.reset();
        editID = null;
    }
    if (e.target.classList.contains("submit")) {
        e.preventDefault()

        let taskName = field1.value
        let taskDesk = field2.value
        let category = field3.value

        let obj = {
            id,
            taskName,
            taskDesk,
            category,
        }

        if (taskName.trim() === "" || taskDesk.trim() === "") {
            return
        }

        if (editID !== null) {
            obj.id = taskArr[editID].id;
            taskArr[editID] = obj;
            editID = null;
        } else {
            taskArr.push(obj);
            id++
            total.innerHTML = `<h4>Total Tasks: ${taskArr.length}</h4>`
        }

        card()






        // taskArr.forEach((n) => {

        // })




        form.reset()
        formBox.style.display = "none";
    }


    if (e.target.classList.contains("edit")) {
        formBox.style.display = "flex"

        let index = e.target.dataset.index

        let taskExist = taskArr[index]

        field1.value = taskExist.taskName;
        field2.value = taskExist.taskDesk;
        field3.value = taskExist.category;

        editID = index;


    }


    if (e.target.classList.contains("delete")) {
        let index = e.target.dataset.delete
        taskArr.splice(index, 1);
        card()
        total.innerHTML = `<h4>Total Tasks: ${taskArr.length}</h4>`
    }

})
