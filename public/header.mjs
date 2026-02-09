import { toHtmlElement } from "./toHtmlElement.mjs";

const headerString = `<header class="intro">

            <div>
                <h1>Fabian Ballesteros-Limon</h1>
            </div>
            <div class="options">
                <nav class="links">
                    <a href="index.html">Home</a>
                    <a href="hobbies.html">My recent trips</a>
                </nav>
            <div>
                <label>
                    <input class="dark" type="checkbox" autocomplete="off"/>
                    Dark mode
                </label>
                <button class="menu">Menu</button>
            <div>
            </div>
        </header>`;


function isValidEmail(stringToTest) {
    const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
    // Regex from https://colinhacks.com/essays/reasonable-email-regex
    return emailRegex.test(stringToTest);
}        


const body = document.querySelector("body");
const header = toHtmlElement(headerString);
const form = document.querySelector(".contact-me")

body.prepend(header);

const checkbox = document.querySelector(".dark");

if(localStorage.getItem("checked") == "true"){
    checkbox.checked = true;
    document.body.classList.add("dark-mode");
}

const button = document.querySelector("button");

function toggleMenu(event){
    const nav = document.querySelector(".links");

    if(nav.classList.contains("toggle")){
        nav.classList.remove("toggle")
    }
    else{
        nav.classList.add("toggle"); 
    }
    
}

button.addEventListener("click", () => {
    toggleMenu()});

body.addEventListener("click", (event) => {
    const nav = document.querySelector(".links");
    const header = document.querySelector("header");
    if(!header.contains(event.target)){
        nav.classList.remove("toggle")
    }
   

});

checkbox.addEventListener("change", ()=> {
    if(checkbox.checked === true){
        document.body.classList.add("dark-mode");
    }
    else{
        document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("checked", checkbox.checked);
})

if(form != null){
    form.addEventListener("submit", (event) => {
        let invalidEmail = true;
        let invalidCheck = true;
    
        const pEmailError = document.querySelector("#invEmail");
        const emailIn = document.querySelector("#emailInput");
    
        if(isValidEmail(emailIn.value) == false){
            emailIn.ariaInvalid = true;
            emailIn.setAttribute("aria-describedby", "InvalidEmail")
            emailIn.focus();
    
            pEmailError.textContent = "Invalid Email";
            invalidEmail = true
        }
        else{
            pEmailError.textContent = ""
            invalidEmail = false;
        }
    
        const formCheckbox = document.querySelectorAll(".form-checkbox");
        let noneChecked = true;
    
        for(const e of formCheckbox){
            if(e.checked == true){
                noneChecked = false;
            }
        } 
        const pCheckError = document.querySelector("#noCheck");
        
        if(noneChecked == true){
           for(const e of formCheckbox){
                e.ariaInvalid = true;
                e.setAttribute("aria-describedby", "noCheck")
                
           }
            pCheckError.textContent = "Select at least one checkbox";
            formCheckbox[0].focus();
            invalidCheck = true
        }
        else {
            pCheckError.textContent = "";
            invalidCheck = false;
        }
    
        if(invalidEmail == true || invalidCheck == true){
            event.preventDefault();
        }
    
    });
    
}


