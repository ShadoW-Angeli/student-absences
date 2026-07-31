const hMonth = document.getElementById("month");
const btn_day = document.getElementById("btn_day");
const weekReport = document.getElementById("week_report");

const params = new URLSearchParams(window.location.search);
const monthId = params.get("id");
loadMonth(monthId);

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

async function loadMonth(id) {
    const res = await fetch(`/month/${id}`);
    const data = await res.json();

    hMonth.textContent = monthNames[data.month_number];

    const [y1, m1, d1] = data.start_date.split("-").map(Number);
    const start = new Date(y1, m1 - 1, d1);

    const [y2, m2, d2] = data.end_date.split("-").map(Number);
    const end = new Date(y2, m2 - 1, d2);

    const current = new Date(start);

    let weekNumber = 1;

    let currentWeek = createWeek(weekNumber);

    while(current <= end){

        if (current.getDay() === 1 && current.getTime() !== start.getTime()) {
            btn_day.append(currentWeek.week);
            weekNumber++;
            currentWeek = createWeek(weekNumber);
        }

        if (current.getDay() >= 1 && current.getDay() <= 5) {
            const btn = document.createElement("button");
            btn.classList.add("buttonD");

            const dayFormat = `${current.getDate()}.${String(current.getMonth() + 1).padStart(2, '0')}`;
            btn.textContent = dayFormat;

            const year = current.getFullYear();
            const month = String(current.getMonth() + 1).padStart(2, "0");
            const day = String(current.getDate()).padStart(2, "0");
            
            const fullDate = `${year}-${month}-${day}`;
            btn.dataset.date = fullDate;

            currentWeek.days.append(btn);
            btn.addEventListener("click", ()=>{
                window.location.href = `day.html?date=${btn.dataset.date}`
            });
        }
        current.setDate(current.getDate() + 1);
    }
    btn_day.append(currentWeek.week);
};

function createWeek(number){
    const week = document.createElement("div");
    week.classList.add("week");

    const p = document.createElement("p");
    p.classList.add("titleW");
    p.textContent = `${number} тиждень`;

    const days = document.createElement("div");
    days.classList.add("days");

    const reportBtn = document.createElement("button");
    reportBtn.classList.add("buttonReport");
    reportBtn.textContent = "Тижнева відомість";
    reportBtn.dataset.week = number;

    reportBtn.addEventListener("click", () => {
     window.location.href = `week-raport.html?month=${monthId}&week=${reportBtn.dataset.week}`
});

    week.append(p, days, reportBtn);
    return { week, days, reportBtn };
}