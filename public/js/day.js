const tbody = document.getElementById("tbody");

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

export function createRow(){};
export function calculateHours(){};