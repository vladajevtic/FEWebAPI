const inputUserName = document.querySelector("#userName");
const inputPassword = document.querySelector("#password");
const submit = document.querySelector("#submit");



let baseUrl = "https://localhost:44377";

function submitUser() {
    const data = {
        userName : inputUserName.textContent,
        password : inputPassword.textContent
    }
    let req = new Request(baseUrl + '/api/user', 
          ({ method: 'POST',
             headers: {'Content-Type': 'application/json',},
             body: JSON.stringify(data) 
            }));
    fetch(req)
    .then(res => {
      if(res.ok){
          continue;
      }
    })
    .catch(err => {
      let error = document.createElement("h1");
      error.textContent = err;
      let doc = document.querySelector(".container");
      doc.appendChild(error);
    });
  }

  submit.addEventListener("click", submitUser );