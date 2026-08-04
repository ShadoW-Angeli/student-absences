const tbody = document.getElementById("tbody");
const spans = document.querySelectorAll(".pairs");

function createRow(day, students, schedule, absences, documents){

    schedule.forEach(function(lesson, index){
        spans[index].textContent = lesson.subject_name;
    });
        students.forEach(function(student, index){
            const tr = document.createElement("tr");
            tbody.append(tr);

            const tdNumber = document.createElement("td");
            const tdName = document.createElement("td");
            //tdName.textContent = student.surname + " " + student.name;

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

            select.addEventListener("change", async () =>{
                const value = 
                select.value === "" 
                ? null 
                :select.value === true;

                await fetch("/absence/reason", {
                    method: "PATCH", 
                    headers: {
                    "Content-Type" : "application/json"
                     }, 
                     body: JSON.stringify({
                        studentId: student.id,
                        dayId: day.id,
                        isValidReason: value
                     })
                })
            });

            const tdNote = document.createElement("td");
            const inp = document.createElement("input");
            inp.classList.add("text");
            inp.type = "text";
            tdNote.append(inp);

            inp.addEventListener("change", async () =>{
                console.log(student.id, inp.value);
                await fetch("/absence/note", {
                    method: "PATCH",
                    headers: {
                    "Content-Type" : "application/json"
                     }, 
                     body: JSON.stringify({
                        studentId: student.id,
                        dayId: day.id,
                        note: inp.value
                     })
                })
            });

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

            inputFile.addEventListener("change", async ()=>{
                console.log(inputFile.files[0]);
                
                const formData = new FormData();

                formData.append("file", inputFile.files[0]);
                formData.append("studentId", student.id);
                formData.append("dayId", day.id);
                const res = await fetch("/absence/file", {
                    method: "POST",
                    body: formData
                })
                 
            });

            if(documents.length > 0){
                    text.textContent = "Змінити"
                 } else{
                    text.textContent = "Додати"
                 };
            
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
        });
        subject(day.id);
    };

    function createEmpty(day){
    const tr = document.createElement("tr");

    const tdNumber = document.createElement("td");
    tdNumber.textContent = tbody.children.length + 1;

    const tdName = document.createElement("td");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("student_input");

    input.addEventListener("input", async()=>{
        const userId = localStorage.getItem("userId");

       const res = await fetch(`/students?q=${input.value}&userId=${userId}`);
       const data = await res.json();
       console.log(data);
    });

    tdName.append(input);

    const tdLessons = [];

    for (let i = 0; i < 4; i++) {
        const td = document.createElement("td");
        tdLessons.push(td);
    }

    const tdHours = document.createElement("td");

    const tdReason = document.createElement("td");

    const tdNote = document.createElement("td");

    const tdFile = document.createElement("td");

    const tdDelete = document.createElement("td");

    tr.append(
        tdNumber,
        tdName,
        ...tdLessons,
        tdHours,
        tdReason,
        tdNote,
        tdFile,
        tdDelete
    );

    tbody.append(tr);
    }

    function subject(dayId){

        spans.forEach((span, index) =>{
            const lessonNumber = index + 1;

            span.addEventListener("click", ()=>{
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("subject_input");

            span.replaceWith(input);
            input.focus();

            input.addEventListener("input", async ()=> {
                const res = await fetch(`/subject?q=${input.value}`);
                const data = await res.json();
                renderSub(data, input, dayId, lessonNumber);
            })
        });
        });
    }

   async function renderSub(data, input, dayId, lessonNumber){
        let list = input.parentElement.querySelector(".sub_list");

        if(!list){
            list = document.createElement("div");
            list.classList.add("sub_list");
            input.after(list);
        }
        
        list.innerHTML = "";

        data.forEach(subject =>{
            const item = document.createElement("div");
            item.textContent = subject.subject_name;

            item.addEventListener("click", async ()=>{

                console.log({
                    attendanceDayId: dayId,
                            lessonNumber: lessonNumber,
                            subjectId: subject.id
                });
                await fetch("/subject/schedule", {
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json"
                        }, 
                        body: JSON.stringify({
                            attendanceDayId: dayId,
                            lessonNumber: lessonNumber,
                            subjectId: subject.id
                        })
                    })

                const span = document.createElement("span");
                span.classList.add("pairs");
                span.textContent = subject.subject_name;

                input.replaceWith(span);
                list.remove();
            })

            list.append(item);
        })
    }

    import { dayRender } from "./lead/day-rapotr.js";
export { createRow, renderSub, createEmpty };