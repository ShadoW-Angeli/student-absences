const student = document.getElementById("student");
const add = document.getElementById("add");
const number = document.getElementById("number");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");
const clean = document.getElementById("clean");
let task;
function loadData(){
const data = JSON.parse(localStorage.getItem("task"));
if(data){
    task = data;
} else {
    task = [];
}
};

function saveData(){
    localStorage.setItem("task", JSON.stringify(task));
};
function calculateHours(){
     
}

function createRow(){
        task.forEach(function(element, index){
            const tr = document.createElement("tr");
            tbody.append(tr);

            const tdNumber = document.createElement("td");
            tdNumber.textContent = index + 1;
            const tdName = document.createElement("td");
            tdName.textContent = element.name;

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");

            const check = [td1, td2, td3, td4];
            for(let i = 0; i < check.length; i++){
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            let some = "pair" + (i + 1);
            checkbox.checked = element[some];

            checkbox.addEventListener("change", function(){
                element[some] = checkbox.checked;
                saveData();
            });
             check[i].append(checkbox);
    };
            

            tr.append(tdNumber, tdName, td1, td2, td3, td4);
        })
    }
function renderTable(){
    tbody.innerHTML = "";
    createRow();
    
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
    localStorage.clear("task");
})