let baseUrl = "https://localhost:44377";
// const token = '{
//   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfb…zNjF9.OkRpk56rQoseQGfZQebIQRJNLPd66M5AkDwGEJJcHa8"
// }'
const token = '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfb…zNjF9.OkRpk56rQoseQGfZQebIQRJNLPd66M5AkDwGEJJcHa8"}'

const obj = JSON.parse(token);
console.log(obj)

function getProducts(){
    let req = new Request(baseUrl + "/api/product", (
      {
        method : "GET",
        headers: { 
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJyb2xlIjoiTWFuYWdlciIsIm5iZiI6MTYzMzM3MzQ0MiwiZXhwIjoxNjMzOTc4MjQyLCJpYXQiOjE2MzMzNzM0NDJ9.oVfp0LiRRxYkIgnxCDBCU4kW_nRf_64306r7d9KE9ts'
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
        renderList(arr);
        console.log(arr);
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
            let quantity = document.createElement("input");
            quantity.type = "number";
            quantity.min = 1;
            quantity.max = 10;
            quantity.value = 1;
            quantity.className = "Quantity";  
            
            btnDiv.appendChild(addBtn);
            btnDiv.appendChild(quantity);
            btnDiv.appendChild(detailsBtn);
              
            
            card.appendChild(imageContainer);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(size);
            card.appendChild(btnDiv);
            cardContainer.appendChild(card);
            
            addBtn.addEventListener("click", function(){
              addToList(arr,element.id, quantity )             
              // listForCart.push(element.id,quantity);
              // console.log(listForCart);
            })      
            
          });
        }
let listForCart = [];
let listForPOST = {
  "orderItems": listForCart
}


//Order for POST
// class listForPOST {
//   constructor(orderItems){

//     this.orderItems = [{
//       "ProductId": {get, set,}
//     }]
//   }
// };

//let toSend = new listForPOST();
////////////////////////


// function getTotal(arr){
//   let sum = 0;
//   arr.forEach(e =>{
//     sum += e.price;
//   })
//   return sum;
// }

// ShoppingCart 
function addToList(arr,id,quantity){
  let element =  arr.findIndex(function(el) {
    return el.id === id;
  })
  console.log(arr[element]);

  
  // let orderlist = document.querySelector("#orderList");
  let ol = document.querySelector(".cartList");
  let li = document.createElement("li");
  li.className = "listItems";
  let name = document.createElement("h3");
  name.textContent = arr[element].name;
  let price = document.createElement("p");
  price.textContent = arr[element].price + " " +"Dinara";
  let size = document.createElement("p");
  size.textContent = "Velicina : " + arr[element].size;
  let productPost = {
    "productId": arr[element].id,
    "quantity": Number(quantity.value)
  };
  
  listForCart.push(productPost);
  
  let quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = 1;
  quantityInput.max = 10;
  quantityInput.className = "listQuantity";
  quantityInput.value = quantity.value;
  // if(productPost["productId"] === arr[element].id){
  //   quantityInput.value += quantity.value;
  // }else{
  //   quantityInput.value = quantity.value;
  // }

  li.appendChild(name);
  li.appendChild(price);
  li.appendChild(quantityInput);
  
  li.appendChild(size);
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete order";
  deleteBtn.addEventListener("click", function(){
    for(let i=0; i<listForCart.length; i++){
        if(listForCart[i]["productId"] ===arr[element].id ){
          listForCart.splice(i, 1);
        }
    }
    li.remove();
  });
  li.appendChild(deleteBtn);
  
  ol.appendChild(li);
  
  
  // let item = {
  //   name: arr[element].name,
  //   price: arr[element].price,
  //   size: arr[element].size
  // }
  
  // let total = document.getElementById("total");
  // total.textContent = getTotal(listForPOST);
  // let quantityFromPage = document.querySelector(".container .container-card-container .card .btnDiv .Quantity").value;
  // let h3FromPage = document.querySelector(".container .container-card-container .card h3").textContent;
  // let quantityFromList = document.querySelector("header .list .cartList .listItems .listQuantity").value;
  // let h3FromList = document.querySelector("header .list .cartList .listItems h3").textContent;
  // let quantityFromListfinal = document.querySelector("header .list .cartList .listItems .listQuantity");
  // if(h3FromPage == h3FromList){
  //   quantityFromListfinal = quantityFromList + quantityFromPage;
  // }
  
} 

let shoppingCart = document.querySelector("header .cart .cartBtn");
   
//console.log(shoppingCart)
shoppingCart.addEventListener("click", function(){
  let list = document.getElementById("orderList");
  if(list.style.display === "block"){
    list.style.display ="none"
  }else{
    list.style.display ="block"
  };
})

//Button SEND
let sendBtn = document.querySelector("header .list .send");

function postOrder() {

  // arr.forEach(ele =>{
  //   let itemsList = document.querySelector("header .list .cartList .listItems .listQuantity");
  //   console.log(itemsList);
  //   ele["quantity"] = Number(itemsList.value);
  // });
  let nesto = document.querySelectorAll("#orderList .cartList .listQuantity");
  for(let i = 0; i < nesto.length; i++){
    console.log(nesto[i].value)
    listForCart[i].quantity = Number(nesto[i].value);
  }
  //console.log(nesto)
  // for(let i = 0; i<arr.length; i++){
   
    
  //   arr[i]["quantity"] = Number(nesto[i].input.value);
  // }
  //listForPOST["orderItems"] = arr;
    let req = new Request("https://localhost:44377/api/order", 
          ({ method: 'POST',
                         
             headers: {'Content-Type': 'application/json'},
             
             body: JSON.stringify( listForPOST )
            }));
    fetch(req)
    .then(res => {
      console.log(res);
      
    })
    .catch(err => {
      console.log(err);
    });
    listForPOST["orderItems"].splice(0,listForPOST["orderItems"].length);
    let col = document.querySelector("header .list .cartList").getElementsByTagName("LI");
    Array.from(col).map(e => {
      e.remove();
    })
    
      
    
    // ol.remove();
    let list = document.getElementById("orderList");
    list.style.display ="none";
}
sendBtn.addEventListener("click", function(){
  postOrder();
} )
console.log(listForPOST)