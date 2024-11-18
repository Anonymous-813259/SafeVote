// For category.html
function navigateTo(page){
    alert("You selected: "+page);
    if(page=="Election Commission"){
        window.location.href="chiefLogin.html";
    }
    else if(page=="Vote Registration"){
        window.location.href="voterRegistration.html";
    }
    else if(page=="Voting"){
        window.location.href="voting.html";
    }
    else{
        window.location.href="result.html";// Thinking to create different pages for chief and user/voter(both for register/not resgistered)
    }
}