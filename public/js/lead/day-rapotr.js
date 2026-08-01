const params = new URLSearchParams(window.location.search);
const date = params.get("date");  

const [y, m, d] = date.split("-").map(Number);
const dateS = new Date(y, m - 1, d);

const days = document.getElementById("days");
days.textContent = `${dateS.getDate()}.${String(dateS.getMonth() + 1).padStart(2, "0")}`;

async function dayRender() {
    const res = await fetch(`/day/${date}`);
    const data = await res.json();
    console.log(data);

    const { day, students, schedule, absences } = data;
    createRow(day, students, schedule, absences);
}
dayRender();

import{ createRow } from "../day.js"; 
export { dayRender };