const head = document.getElementById("head");
if(head){
    head.addEventListener("click", ()=>{
        window.location.href = "../lead/head.html"
    });
};

const group = document.getElementById("group");
if(group){
    group.addEventListener("click", ()=>{
    window.location.href = "../lead/group.html"
});
}
const profile = document.getElementById("profile");
if(profile){
    profile.addEventListener("click", ()=>{
        window.location.href = "../lead/profile.html"
    });
};

 const exit = document.getElementById("exit");
if(exit){
    exit.addEventListener("click", ()=>{
        window.location.href = "../login.html"
    });
};