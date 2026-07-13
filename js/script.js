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
function calculateHours(element){
    let hours = 0; 
    for(let i = 0; i < 4; i++){
        let some = "pair" + (i + 1);
        if(element[some] == true){
            hours += 2;
        }
    }
    element.hours = hours;
}
function studentCount(){
    number.textContent = "Кількість студентів: " + task.length;
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
            const tdHours = document.createElement("td");

            const check = [td1, td2, td3, td4];
            for(let i = 0; i < check.length; i++){
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            let some = "pair" + (i + 1);
            checkbox.checked = element[some];

            checkbox.addEventListener("change", function(){
                element[some] = checkbox.checked;
                calculateHours(element);
                saveData();
                renderTable();
            });
             check[i].append(checkbox);
            };
            tdHours.textContent = element.hours;

            const tdReason = document.createElement("td");
            const select = document.createElement("select");
           const reasons = ["Виберіть причину", "Поважна", "Неповажна"]
            for(let i = 0; i < reasons.length; i++){
                const opt = document.createElement("option");
                opt.textContent = reasons[i];
                select.append(opt);
            };
            tdReason.append(select);
            select.value = element.reason;
            select.addEventListener("change", function(){
                element.reason = select.value;
                saveData();
            });

            const tdNote = document.createElement("td");
            const inp = document.createElement("input");
            inp.type = "text";
            inp.value = element.note;
            inp.addEventListener("input", function(){
                element.note = inp.value;
                saveData();
            })
            tdNote.append(inp);

            const tdAdd = document.createElement("input");
            tdAdd.type = "file";

            const tdDell = document.createElement("td");
            const dell = document.createElement("button");
            dell.textContent = "Видалити";
            dell.addEventListener("click", function(){
                task.splice(index, 1);
                saveData();
                renderTable();
            });
            tdDell.append(dell);

            tr.append(tdNumber, tdName, td1, td2, td3, td4, tdHours, tdReason, tdNote, tdAdd, tdDell);
        })
    }
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
    localStorage.clear("task");
    task = [];
    renderTable();
})