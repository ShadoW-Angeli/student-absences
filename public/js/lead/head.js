const first = document.getElementById("first");
const two = document.getElementById("two");
const welcome = document.getElementById("welcome_user");
const year = document.getElementById("year");

const name = localStorage.getItem("username");
welcome.textContent = name;

fetch("/year")
.then(res => res.json())
.then(data =>{
    year.textContent = data.academicYear;
});

first.addEventListener("click", ()=>{
    window.location.href = "../lead/semester.html?semester=1"
});

two.addEventListener("click", ()=>{
    window.location.href = "../lead/semester.html?semester=2"
});