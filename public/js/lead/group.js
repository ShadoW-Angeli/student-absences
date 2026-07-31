const row = document.getElementById("row");

async function groupTable() {
    const res = await fetch("/group");
    const data = await res.json();
    data.forEach((student, index) => {
        let number = index + 1;
        const tr = document.createElement("tr");

        const tdNumber = document.createElement("td");
        tdNumber.textContent = number;

        const tdName = document.createElement("td");
        tdName.textContent = student.surname + " " + student.name + " " + student.patronymic;

        const studType = document.createElement("td");
        studType.textContent = student.stud_type;

        const note = document.createElement("td");
        note.textContent = student.note;

        row.append(tr);
        tr.append(tdNumber, tdName, studType, note);
    });
}
groupTable();