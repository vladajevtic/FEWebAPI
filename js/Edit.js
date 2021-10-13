let baseUrl = "https://localhost:44377";
function getMyProfile(){
    let req = new Request(baseUrl + "/api/customer/my", (
      {
        method : "GET",
        headers: {
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE0Iiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNjMzOTU2NDA1LCJleHAiOjE2MzQ1NjEyMDUsImlhdCI6MTYzMzk1NjQwNX0.4axeuqejZpVf6ddD7PDLKOnR_h4c2kUG7TrSr8gJ3tk',
             //'Content-Type': 'application/json'
        }

      }));
    fetch(req)
    .then(res => {
        // console.log('res', res)
        if (res.ok) {

          return res.json();
        } else {
          throw 'Doslo je do greske';
        }
      })
      .then(arr => {
        // renderList(arr);
        //show(arr);
        console.log(arr);
        console.log(arr.name);
        showMyProfile(arr);
        //console.log('resolved second promise', arr);
      })
      .catch(err => {
        console.log(err);
      })
    }
    getMyProfile();

    function showMyProfile(arr){
      let name = document.querySelector(".name");
      name.value = arr.name;
      let image = document.querySelector(".img");
      image.value = arr.imagePath;
      let phone = document.querySelector(".Phone");
      phone.value = arr.contact.phone;
      let address = document.querySelector(".Address");
      address.value = arr.contact.address;
      let email = document.querySelector(".Email");
      email.value = arr.contact.email;     
    }

    function put(){
      let name = document.querySelector(".name");
      
      let image = document.querySelector(".img");
      
      let phone = document.querySelector(".Phone");
      
      let address = document.querySelector(".Address");
      
      let email = document.querySelector(".Email");
        
        let objectForSend = {
          Name: name.value,
          ImagePath: image.value,
          Phone: phone.value,
          Address: address.value,
          Email: email.value
        };

      let req = new Request(baseUrl + "/api/customer/put", 
          ({ method: 'PUT',
                         
             headers: {'Content-Type': 'application/json',
             'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE0Iiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNjMzOTU2NDA1LCJleHAiOjE2MzQ1NjEyMDUsImlhdCI6MTYzMzk1NjQwNX0.4axeuqejZpVf6ddD7PDLKOnR_h4c2kUG7TrSr8gJ3tk',
            },
             
             body: JSON.stringify( objectForSend )
            }));
    fetch(req)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw 'Doslo je do greske';
      }
    }).then(arr => {
      // renderList(arr);
      //show(arr);
      
      //getMyProfile(arr);
      console.log('resolved promise', arr);
    })
    .catch(err => {
      console.log(err);
    });
    }
    let buttonPut = document.querySelector(".sub");
    buttonPut.addEventListener("click", function(){
      put();
      //getMyProfile();
    });