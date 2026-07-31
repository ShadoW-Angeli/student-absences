const tbody = document.getElementById("tbody");
const headers = document.querySelectorAll(".pairs");

function createRow(students, schedule){
    schedule.forEach(function(lesson, index){
        headers[index].textContent = lesson.subject_name;
    });
        students.forEach(function(student, index){
            const tr = document.createElement("tr");
            tbody.append(tr);

            const tdNumber = document.createElement("td");
            tdNumber.textContent = index + 1;
            const tdName = document.createElement("td");
            tdName.textContent = student.surname + " " + student.name;

            const tdLessons = [];

            for(let i = 0; i < 4; i++){
                const td = document.createElement("td");
                if(i < schedule.length){
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                 checkbox.classList.add("checkbox");

                checkbox.addEventListener("change", () => {
                    calculateHours();
                });

                 td.append(checkbox);
                }
                 tdLessons.push(td);
            }

            const tdHours = document.createElement("td");
            tdHours.classList.add("tdHour");
            tdHours.textContent = 0;

            function calculateHours() {
                let hours = 0;
                tdLessons.forEach(td => {
                    const checkbox = td.querySelector("input");
                    if (checkbox && checkbox.checked) {
                        hours += 2;
                    }
                });
                
                tdHours.textContent = hours;
            }

            const tdReason = document.createElement("td");
            const select = document.createElement("select");

            const reason = [
                {vslue: "", text: "Виберіть причину"},
                {value:"true", text: "Поважна"},
                {value: "false", text: "Неповажна"}
            ];
            reason.forEach(reason =>{
                const opt = document.createElement("option");
                opt.value = reason.value;
                opt.textContent = reason.text;
                select.append(opt);
            });
            tdReason.append(select);

            select.addEventListener("change", function(){
                console.log(student.id, select.value);
            });

            const tdNote = document.createElement("td");
            const inp = document.createElement("input");
            inp.classList.add("text");
            inp.type = "text";
            tdNote.append(inp);

            inp.addEventListener("change", function(){
                console.log(student.id, inp.value);
            })

            const tdAdd = document.createElement("td")
            const label = document.createElement("label");
            label.classList.add("file");

            const text = document.createElement("span");
            text.textContent = "Додати";

            const inputFile = document.createElement("input");
            inputFile.type = "file";
            label.append(inputFile, text);
            label.append(tdAdd);

            inputFile.addEventListener("change", ()=>{
                console.log(inputFile.files[0]);
                text.textContent = "Змінити";
            });
            
            const tdDell = document.createElement("td");
            const dell = document.createElement("button");
            dell.classList.add("button");
            dell.textContent = "Видалити";
            tdDell.append(dell);

            dell.addEventListener("click", () => {
                console.log(student.id);
            });
            tr.append(tdNumber, tdName, ...tdLessons, tdHours, tdReason, tdNote, label, tdDell);
        })
    };

export { createRow };