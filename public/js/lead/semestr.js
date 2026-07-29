const semestr_number = document.getElementById("semestr_number");
const months = document.getElementById("months");

const monthNames = {
    1: "Січень",
    2: "Лютий",
    3: "Березень",
    4: "Квітень",
    5: "Травень",
    6: "Червень",
    7: "Липень",
    8: "Серпень",
    9: "Вересень",
    10: "Жовтень",
    11: "Листопад",
    12: "Грудень"
};

const params = new URLSearchParams(window.location.search);
const semesterNumber = params.get("semester");
if(semesterNumber){
    loadSemestr(semesterNumber);
}

async function loadSemestr(number) {
    const res = await fetch(`/semestr/${number}`);
    const data = await res.json();
    if(number == 1){
        semestr_number.textContent = "Перший семестр";
    } else {
        semestr_number.textContent = "Другий семестр";
    };
    data.forEach(month => {
        const btn = document.createElement("button");
        btn.classList.add("button");
        btn.textContent = monthNames[month.month_number];
        months.append(btn);
    });
}