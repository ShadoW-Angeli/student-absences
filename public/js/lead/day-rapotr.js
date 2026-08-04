const params = new URLSearchParams(window.location.search);
const date = params.get("date");  

const [y, m, d] = date.split("-").map(Number);
const dateS = new Date(y, m - 1, d);

let currentDay = null;

const days = document.getElementById("days");
days.textContent = `${dateS.getDate()}.${String(dateS.getMonth() + 1).padStart(2, "0")}`;

async function dayRender() {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`/day/${date}?userId=${userId}`);
    const data = await res.json();
    console.log(data);

    const { day, students, schedule, absences, documents} = data;
    //createRow(day, students, schedule, absences, documents);

    currentDay = day;
}
dayRender();

const add = document.getElementById("add");
add.addEventListener("click", ()=>{
    createEmpty(currentDay);
});

const modal = document.getElementById("modal");
const windowModal = document.getElementById("window");
const sawPhoto = document.getElementById("sawPhoto");

sawPhoto.addEventListener("click", async () =>{

    modal.classList.remove("hidden");
    const text = document.createElement("h2");
    text.textContent = "Фото";
    openDocument();

    const exit = document.createElement("button");
    exit.textContent = "X";

    exit.addEventListener("click", ()=>{
        modal.classList.add("hidden");
        windowModal.innerHTML = "";
    })

    windowModal.innerHTML = "";

    windowModal.append(text, exit);
})

async function openDocument() {
    const res = await fetch(`/documents/${currentDay.id}`);
    const documents = await res.json();
    renderDoc(documents);
}

function renderDoc(documents) {
    documents.forEach(doc => {
        const block = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = doc.file_name;

        const img = document.createElement("img");
        img.classList.add("photo");
        img.src = "/" + doc.file_path;

        const del = document.createElement("button");
        del.textContent = "Видалити";
        del.classList.add("button");

        del.addEventListener("click", async ()=>{
            await fetch(`/documents/${doc.id}`, {
                method: "DELETE"
            });
        })
        block.append(name, img, del);
        windowModal.append(block);
    });
}

import{ createRow, renderSub, createEmpty } from "../day.js"; 
export { dayRender };