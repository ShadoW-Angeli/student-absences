const student = document.getElementById("student");
const add = document.getElementById("add");
const number = document.getElementById("number");
const clean = document.getElementById("clean");
const sort = document.getElementById("sort");
const returns = document.getElementById("return");

import{ createRow, calculateHours} from "./day"; 

let deleteIndex = null;
let editMode = false;
let task;
function loadData(){
     fetch("/students")
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        console.log(data);
    })
//const data = JSON.parse(localStorage.getItem("task")); //було закоментоване
if(data){
    task = data;
} else {
    task = [];
}
};

function saveData(){
    /*localStorage.setItem("task", JSON.stringify(task));*/
};
function studentCount(){
    number.textContent = "Кількість студентів: " + task.length;
};
    editMode = true;
function renderTable(){
    tbody.innerHTML = "";
    createRow();
    studentCount();
}

loadData();
renderTable();
add.addEventListener("click", function(event){
    event.preventDefault();

    if(student.value.trim() == ""){
        return;
    };

    task.push(
        {
            name: student.value,
            pair1: false,
            pair2: false,
            pair3: false,
            pair4: false,
            hours: 0,
            reason: "",
            note: ""
        }
    );
    saveData();
    renderTable();
    student.value = "";
    console.log(task);
})

clean.addEventListener("click", function(){
    localStorage.clear();
    task = [];
    renderTable();
})
sort.addEventListener("click", function(){
    task.sort(function(a, b){
        return a.name.localeCompare(b.name);
    });
    saveData();
    renderTable();
});