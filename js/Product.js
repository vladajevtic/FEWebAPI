const baseUrl = "https://localhost:44377";
function getProducts(){
    let req = new Request(baseUrl + "/api/product", ({method : "GET"}));
    fetch(req)
    .then(res => {
        console.log('res', res)
        if (res.ok) {
          return res.json();
        } else {
          throw 'Doslo je do greske';
        }
      })
      .then(arr => {
        renderList(arr);
        console.log('resolved second promise', arr);
      })
      .catch(err => {
        console.log(err);
      })
    }
    getProducts();

    function renderList(arr){
        
        const cardContainer = document.querySelector(".container .container-card-container")
        arr.forEach(element => {
            const card = document.createElement("div");
            card.className = "card";
            const imageContainer = document.createElement("div");
            imageContainer.className = 'photo';
            let img = document.createElement("img");
            //img.setAttribute("src", element.image.Path);
            img.setAttribute("alt", "NEKA slika");
            imageContainer.appendChild(img);

            const name = document.createElement("h3");
            name.textContent = element.name;

            const price = document.createElement("p");
            price.textContent = element.price + " " +"Dinara";

            const size = document.createElement("p");
            size.textContent = "Velicina : " + element.size;

            const btnDiv = document.createElement("div");
            btnDiv.className = "btnDiv";

            let addBtn = document.createElement("button");
            addBtn.textContent = "Add to order";
            let detailsBtn = document.createElement("a");
            detailsBtn.textContent = "Details";
            detailsBtn.setAttribute("href", "/Details");
            btnDiv.appendChild(addBtn);
            btnDiv.appendChild(detailsBtn);
            addBtn.addEventListener("click", /*addToList(this.id)*/function(){
                this.style.background = "yellow"
                this.style.color = "black"
            })
            
            card.appendChild(imageContainer);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(size);
            card.appendChild(btnDiv);
            cardContainer.appendChild(card);
        });
    }

    function addToList(arr, id){
            arr.Filter(x => x.id == id)
    }