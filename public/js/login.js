const login = document.getElementById("login");
const password = document.getElementById("password");
const enter = document.getElementById("enter");
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
        console.log(data);
        errors.textContent = data.message;
            if(data.user.role === 1){
                window.location.href = "../html/admin.html"
            } 
             if(data.user.role === 2){
                window.location.href = "../html/head.html"
            } 
            if(data.user.role === 3){
                window.location.href = "../html/lead/head.html";
            }
    });
});