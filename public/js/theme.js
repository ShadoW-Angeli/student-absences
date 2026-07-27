const dark = document.getElementById("dark");
const moon = document.getElementById("moon");
const theme = localStorage.getItem("theme");
if(theme === "dark"){
    document.body.classList.add("dark");
    moon.textContent = "☼";
} else{
    moon.textContent = "☽";
}

dark.addEventListener("click", function(){
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    } else{
        localStorage.setItem("theme", "light");
    }
    moon.style.transform = "translateY(40px)";
    moon.style.opacity = "0";
    setTimeout(function(){
        if(moon.textContent == "☼"){
        moon.textContent = "☽";
    } else {
        moon.textContent = "☼";
    }
    moon.style.transform = "translateY(-40px)";

    setTimeout(function(){
        moon.style.transform = "translateY(0)";
           moon.style.opacity = "1";
    }, 20);
    }, 500);
});