const inputUserName = document.querySelector("#userName");
const inputPassword = document.querySelector("#password");
const submit = document.querySelector("#submit");



let baseUrl = "https://localhost:44377";

function submitUser(e) {
  e.preventDefault();
    const data = {
        userName : inputUserName.value,
        password : inputPassword.value
    }
    
    let req = new Request(baseUrl + '/api/user', 
          ({ method: 'POST',
             headers: {'Content-Type': 'application/json',},
             body: JSON.stringify(data) 
            }));
    fetch(req)
    .then(res => {
      if(res.ok){
        myFunction();
      }else{
        let error = document.createElement("h3");
        error.textContent = "UserName  or password are incorrect";
        error.style.color = 'red'
        let cont = document.querySelector(".container");
        cont.appendChild(error);
        
      }
        
    })
    .catch(err => {
     console.log(err);
    });
  }
  function myFunction() {
    
    location.replace("http://127.0.0.1:5500/Product.html");
  }
  submit.addEventListener("click", submitUser );