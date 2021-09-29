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
      
        myFunction(res);
    })
    .catch(err => {
     console.log(err);
    });
  }
  function myFunction() {
    
    location.replace("http://127.0.0.1:5500/Home.html");
  }
  submit.addEventListener("click", submitUser );