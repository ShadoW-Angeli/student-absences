const tbody = document.getElementById("tbody");
const headers = document.querySelectorAll(".pairs");

function createRow(day, students, schedule, absences){
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
                    const lesson = schedule[i];

                    const absence = absences.find(a =>
                   a.student_id === student.id &&
                   a.day_schedule_id === lesson.id
                ); 

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                 checkbox.classList.add("checkbox");

                  checkbox.checked = !!absence;

                checkbox.addEventListener("change", async () => {
                    if(checkbox.checked){
                        await fetch("/absence", {
                            method: "POST", 
                            headers: {
                                "Content-Type" : "application/json"
                            }, 
                            body: JSON.stringify({
                                studentId: student.id,
                                dayScheduleId: lesson.id
                            })
                        });
                    } else{
                        await fetch("/absence", {
                            method: "DELETE", 
                            headers: {
                                "Content-Type" : "application/json"
                            }, 
                            body: JSON.stringify({
                                studentId: student.id,
                                dayScheduleId: lesson.id
                            })
                        });
                    }
                    calculateHours();
                });

                 td.append(checkbox);
                }
                 tdLessons.push(td);
            } 

            const tdHours = document.createElement("td");
            tdHours.classList.add("tdHour");

            function calculateHours() {
                let hours = 0;
                tdLessons.forEach(td => {
                    const checkbox = td.querySelector("input");
                    if (checkbox && checkbox.checked) {
                        hours += 2;
                    }
                });
                
                tdHours.textContent = hours;
            } calculateHours();

            const studentAbs = absences.find(a => a.student_id ===  student.id);
            const tdReason = document.createElement("td");
            const select = document.createElement("select");

            const reason = [
                {value: "", text: "Виберіть причину"},
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

            if(studentAbs){
                select.value = String(studentAbs.is_valid_reason);
                inp.value = studentAbs.note ?? "";
            }

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

            dell.addEventListener("click", async () => {
                console.log(student.id);
                const res = await fetch(`/absence/${student.id}/${day.id}`, {
                    method: "DELETE"
                });
                const data = await res.json();
                console.log(data);
                tbody.innerHTML = "";
                dayRender();
            });
            tr.append(tdNumber, tdName, ...tdLessons, tdHours, tdReason, tdNote, label, tdDell);
        })
    };

    import { dayRender } from "./lead/day-rapotr.js";
export { createRow };