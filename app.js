const mainDiv = document.querySelector("main")
const formBox = document.querySelector(".form")
const task_parent = document.querySelector(".task_parent")
const form = document.querySelector("form")
const field1 = document.querySelector(".taskname")
const field2 = document.querySelector(".taskdesk")
const field3 = document.querySelector("#category")
const feild4 = document.querySelector(".deadline")

const taskArr = []

let editID = null;;
let id = 0;

let card = () => {
    task_parent.innerHTML = "";
    taskArr.forEach((elem, i) => {
        task_parent.innerHTML += `<div class="task_card">
                <div class="task_header">
                    <select name="status" id="status">
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Pending</option>
                        <option>Completed</option>
                    </select>

                    <i class="fa-solid fa-ellipsis"></i>
                </div>


                <div class="task_main">
                    <h4>${elem.taskName}</h4>
                    <p>${elem.taskDesk}</p>
                </div>


                <div class="task_footer">
                    <div class="work_cat">${elem.category}</div>
                    <p>${elem.deadline}</p>
                </div>

                <div class="task_footer">
                    <button class="edit" data-index="${i}">Edit</button>
                    <button>Delete</button>
                </div>
            </div>`
    })
}


mainDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains("add")) {
        formBox.style.display = "flex"
    }
    if (e.target.classList.contains("close")) {
        formBox.style.display = "none"
    }
    if (e.target.classList.contains("submit")) {
        e.preventDefault()

        let taskName = field1.value
        let taskDesk = field2.value
        let category = field3.value
        let deadline = feild4.value

        let obj = {
            id,
            taskName,
            taskDesk,
            category,
            deadline
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
        feild4.value = taskExist.deadline;

        editID = index;

    }
})
