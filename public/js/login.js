const login = document.getElementById("login");
const password = document.getElementById("password");
const enter = document.getElementById("enter");
const dark = document.getElementById("dark");
const errors = document.getElementById("errors");

enter.addEventListener("click", async (event)=> {
    event.preventDefault();
    const loginValue = login.value;
    const passwordValue = password.value;
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: loginValue,
            password: passwordValue
        })
    })
    .then(res => res.json())
    .then(data =>{
        errors.textContent = data.message;
            if(data.role === 1){
                window.location.href = "../admin.html"
            } 
             if(data.role === 2){
                window.location.href = "../head.html"
            } 
            if(data.role === 3){
                window.location.href = "../lead.html";
            }
    });
});

dark.addEventListener("click", function(){
    document.body.classList.toggle("dark");
    if(dark.textContent == "☼"){
        dark.textContent = "☽";
    } else {
        dark.textContent = "☼";
    }
});