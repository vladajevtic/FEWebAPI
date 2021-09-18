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
        //console.log('resolved second promise', arr);
      })
      .catch(err => {
        console.log(err);
      })
    }
    getProducts();

  
    function renderList(arr){
        
        let cardContainer = document.querySelector(".container .container-card-container")
        arr.forEach(element => {
            let card = document.createElement("div");
            card.className = "card";
            let imageContainer = document.createElement("div");
            imageContainer.className = 'photo';
            let img = document.createElement("img");
            //img.setAttribute("src", element.image.Path);
            img.setAttribute("alt", "NEKA slika");
            imageContainer.appendChild(img);

            let name = document.createElement("h3");
            name.textContent = element.name;

            let price = document.createElement("p");
            price.textContent = element.price + " " +"Dinara";

            let size = document.createElement("p");
            size.textContent = "Velicina : " + element.size;

            let btnDiv = document.createElement("div");
            btnDiv.className = "btnDiv";

            let addBtn = document.createElement("button");
            addBtn.textContent = "Add to order";
            let detailsBtn = document.createElement("a");
            detailsBtn.textContent = "Details";
            detailsBtn.setAttribute("href", baseUrl + "/api/product/" + element.id);
            btnDiv.appendChild(addBtn);
            btnDiv.appendChild(detailsBtn);
            addBtn.addEventListener("click", function(){

              addToList(arr,element.id)
            })
            
            card.appendChild(imageContainer);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(size);
            card.appendChild(btnDiv);
            cardContainer.appendChild(card);
          });
        }
// ShoppingCart 
const listOfOrder = [];

function addToList(arr,id){
  let element =  arr.findIndex(function(el) {
    return el.id === id;
  })
  console.log(arr[element]);

  let list = document.querySelector("header .list");
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  let name = document.createElement("h3");
  name.textContent = arr[element].name;

  let price = document.createElement("p");
  price.textContent = arr[element].price + " " +"Dinara";

  let size = document.createElement("p");
  size.textContent = "Velicina : " + arr[element].size;
  
  li.appendChild(name);
  li.appendChild(price);
  li.appendChild(size);
  ul.appendChild(li);
  list.appendChild(ul);
  let item = {
    name: arr[element].name,
    price: arr[element].price,
    size: arr[element].size
  }
  listOfOrder.push(item);
} 

let shoppingCart = document.querySelector("header .cart .cartBtn");
   
//console.log(shoppingCart)
shoppingCart.addEventListener("click", function(){
let list = document.querySelector("header .list");
list.style.display = "block";
console.log(listOfOrder);
})

//Button SEND
let sendBtn = document.querySelector("header .list .send");

function postOrder(arr) {
  arr.forEach(element =>{

    let req = new Request(baseUrl + '/api/order', 
          ({ method: 'POST',
             headers: {'Content-Type': 'application/json',},
             body: JSON.stringify(element) 
            }));
    fetch(req)
    .then(res => {
      console.log(res);
      getSliders();
    })
    .catch(err => {
      console.log(err);
    });
  })
}
sendBtn.addEventListener("click", function(){
  postOrder(listOfOrder);
})