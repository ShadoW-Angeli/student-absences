const username = document.getElementById("username");
const info = document.getElementById("info");

async function infoProfile() {
    const res = await fetch("/profile");
    const data = await res.json();
    
    username.textContent = data.username;

    const spanR = document.createElement("span");
    spanR.textContent = "Роль: ";
    spanR.style.fontWeight = "bold";

    const pRole = document.createElement("p");
    pRole.append(spanR);
    pRole.append(data.role_name);

    const spanG = document.createElement("span");
    spanG.textContent = "Група: ";
    spanG.style.fontWeight = "bold";

    const pGroup = document.createElement("p");
    pGroup.append(spanG);
    pGroup.append(data.group_name);

    const spanY = document.createElement("span");
    spanY.textContent = "Навчальний рік: ";
    spanY.style.fontWeight = "bold";

    const pYear = document.createElement("p");
    pYear.append(spanY);
    pYear.append(data.academic_year);

    info.append(pRole, pGroup, pYear);
};
infoProfile();