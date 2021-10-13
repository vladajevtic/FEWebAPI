let baseUrl = "https://localhost:44377";
// const token = '{
//   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfb…zNjF9.OkRpk56rQoseQGfZQebIQRJNLPd66M5AkDwGEJJcHa8"
// }'
// const token = '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfb…zNjF9.OkRpk56rQoseQGfZQebIQRJNLPd66M5AkDwGEJJcHa8"}'

// const obj = JSON.parse(token);
// console.log(obj)

function getMyOrders(){
    let req = new Request(baseUrl + "/api/order/my", (
      {
        method : "GET",
        headers: {
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE0Iiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNjMzOTU2NDA1LCJleHAiOjE2MzQ1NjEyMDUsImlhdCI6MTYzMzk1NjQwNX0.4axeuqejZpVf6ddD7PDLKOnR_h4c2kUG7TrSr8gJ3tk',
             'Content-Type': 'application/json'
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
        show(arr);
        console.log(arr);
        //console.log('resolved second promise', arr);
      })
      .catch(err => {
        console.log(err);
      })
    }
    getMyOrders();

    function show(arr){
      let container = document.querySelector(".container");
      arr.forEach((element, i ) => {
        i++;
        let card = document.createElement("div");
        let orderNo = document.createElement("h2");
        orderNo.textContent = "Order " + i;
        card.appendChild(orderNo);
        card.className = "card";
        
          element.orderItems.forEach((p) =>{
            let product = document.createElement("div");
            product.className = "product";
            let name = document.createElement("h3");
            name.textContent = p.product.name;
            let price = document.createElement("p");
            price.textContent = "price: " + p.product.unitPrice;
            let size = document.createElement("p");
            size.textContent = "size: " + p.product.size;
            
            product.appendChild(name);
            product.appendChild(price);
            product.appendChild(size);
            card.appendChild(product);
          })
        let totalAmount = document.createElement("p");
        totalAmount.className = "total"
        totalAmount.textContent = "total amount: " + +element.totalAmount;
        card.appendChild(totalAmount);
          
          container.appendChild(card);
        });
    }