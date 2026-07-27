const student = document.getElementById("student");
const add = document.getElementById("add");
const number = document.getElementById("number");
const tbody = document.getElementById("tbody");
const clean = document.getElementById("clean");
const modal = document.getElementById("modal");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const saveChange = document.getElementById("saveChange");
const edit = document.getElementById("edit");
const sort = document.getElementById("sort");
const returns = document.getElementById("return");
const dark = document.getElementById("dark");

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
function calculateHours(element){
    let hours = 0; 
    for(let i = 0; i < 4; i++){
        let some = "pair" + (i + 1);
        if(element[some] == true){
            hours += 2;
        }
    }
    element.hours = hours;
};
function studentCount(){
    number.textContent = "Кількість студентів: " + task.length;
};
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
            tdHours.classList.add("tdHour");

            const check = [td1, td2, td3, td4];
            for(let i = 0; i < check.length; i++){
            const checkbox = document.createElement("input");
            checkbox.disabled = !editMode;
            checkbox.type = "checkbox";
            checkbox.classList.add("checkbox");

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
            select.disabled = !editMode;
           const reasons = ["Виберіть причину", "Поважна", "Непов."]
            for(let i = 0; i < reasons.length; i++){
                const opt = document.createElement("option");
                opt.textContent = reasons[i];
                if(i === 0 ){
                    opt.value = "";
                } else{
                    opt.value = reasons[i];
                }
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
            inp.classList.add("text");
            inp.disabled = !editMode;
            inp.type = "text";
            inp.value = element.note;
            inp.addEventListener("input", function(){
                element.note = inp.value;
                saveData();
            })
            tdNote.append(inp);

            const label = document.createElement("label");
            label.textContent = "Додати";
            label.classList.add("file");
            const tdAdd = document.createElement("input");
            tdAdd.type = "file";
            label.append(tdAdd);

            const tdDell = document.createElement("td");
            const dell = document.createElement("button");
            dell.classList.add("delet");
            dell.disabled = !editMode;
            dell.textContent = "Видалити";
            dell.addEventListener("click", function(){
                deleteIndex =  index;
                modal.classList.remove("hidden");
            });
            tdDell.append(dell);

            tr.append(tdNumber, tdName, td1, td2, td3, td4, tdHours, tdReason, tdNote, label, tdDell);
        })
    }
    editMode = true;
function renderTable(){
    tbody.innerHTML = "";
    createRow();
    studentCount();
}
yes.addEventListener("click", function(){
    task.splice(deleteIndex, 1);
    deleteIndex = null;
    saveData();
    renderTable();
     modal.classList.add("hidden");
 });
no.addEventListener("click", function(){
    deleteIndex = null;
    modal.classList.add("hidden");
 });

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
saveChange.classList.remove("hidden");
saveChange.addEventListener("click", function(){
    editMode = false;
    renderTable();
   // saveChange.classList.add("hidden");
});
edit.classList.remove("hidden");
edit.addEventListener("click", function(){
    editMode = true;
    renderTable();
   // saveChange.classList.remove("hidden");
   // edit.classList.add("hidden");
});

dark.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});

sort.addEventListener("click", function(){
    task.sort(function(a, b){
        return a.name.localeCompare(b.name);
    });
    saveData();
    renderTable();
});