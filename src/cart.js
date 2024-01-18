let bill = document.getElementById('bill');
let spcart = document.getElementById('shoppingcart');

let stores = JSON.parse(localStorage.getItem("Data")) || [];

let summation = () =>{
    let cartsum = document.getElementById("cartPrice");
    cartsum.innerHTML = stores.map((x)=>x.qty).reduce((x,y)=>x+y,0); // X and y used for summation of values.
};
summation();

let purchaseditems = () => {
    if (stores.length !== 0) {
      return (spcart.innerHTML = stores.map((x) => {  
          let { id, qty } = x;
          let search = cardData.find((y) => y.id == id) || [];
          let {img, name, amt} = search; // destructuring of an object.
          return `
              <div class="end-products">
                <img width="150" src=${img} alt="" />

                <div class="end-products-details">

                  <div class="ItemName-price-bill" >
                    <h3 class="Item-amt">
                      <p>${name}</p>
                      <p class="Amt-of-each-item">₹ ${amt}</p>
                    </h3>
                    <i onclick="deleteFinalItem(${id})" class="bi bi-x-circle-fill"></i>
                  </div>

                  <div class="buttons">
                    <i onclick="decMinus(${id})" class="bi bi-dash-square"></i>
                    <div id=${id} class="qty">${qty}</div>
                    <i onclick="incPlus(${id})" class="bi bi-plus-square"></i>   
                  </div>

                  <h3 style="margin-top: 25px; margin-left: 5px;">₹ ${qty * search.amt}</h3>

                </div>
                
              </div>`;
        })
        .join(""));
    } else {
      spcart.innerHTML = ``;
      bill.innerHTML = `
         <h1>Cart is Empty</h1>
         <a href="index.html">
            <button class="Homebtn">ADD ITEMS</button>
         </a>
         `;
    }
  };
purchaseditems();


let incPlus = (id) => {
  let itemSelected = id;
  let SearchedId = stores.find((x)=> x.id === itemSelected);//Finds the item id in stores, if selectedId is not there: then it adds item to "stores" else just ++qty of that selected item.

  if(SearchedId === undefined){
      stores.push({
          id:itemSelected,
          qty:1,
      });
  }
  else{
      SearchedId.qty+=1;
  }
  purchaseditems();
  updateqty(itemSelected);

  localStorage.setItem("Data", JSON.stringify(stores));// Setting id and qty values inside LocalStorage ( Console => Applications => LocalStorage)
};


let decMinus = (id)=> {
  let itemSelected = id;
  let SearchedId = stores.find((x)=> x.id === itemSelected);//Finds the item id in stores, if selectedId is not there: then it adds item to "stores" else just ++qty of that selected item.
  
  if (SearchedId === undefined) return
  else if(SearchedId.qty === 0) return;// It stops decrementing at the moment qty hits 0 (-- Process stops).
  else{
      SearchedId.qty-=1;
  }
  updateqty(itemSelected);
  stores = stores.filter((i)=> i.qty !== 0);// if zero it runs, then below line re-renders the cards.
  purchaseditems(); // If zero items on any card of final item.
  localStorage.setItem("Data", JSON.stringify(stores));
};



let updateqty = (id) => {
  let SearchedId = stores.find((x)=> x.id === id);
  console.log(SearchedId.qty);
  document.getElementById(id).innerHTML = SearchedId.qty;
  summation();
  finalAmount();
};

let deleteFinalItem = (id) => {
    let delItem = id;
    //console.log(delItem);
    stores = stores.filter((x)=>x.id !== delItem);
    purchaseditems();
    finalAmount();
    summation();
    localStorage.setItem("Data", JSON.stringify(stores));

};


let clearCart = () => {
  stores = [];
  purchaseditems();
  summation();
  localStorage.setItem("Data", JSON.stringify(stores));
};

let finalAmount = () => {
  if(stores.length !== 0){
    let finalamt = stores.map((x)=>{
      let {qty, id} =x;
      let search = cardData.find((y) => y.id == id) || [];
      return  qty * search.amt;
    }).reduce((x,y)=> x+y, 0);
    //console.log(finalamt);
    bill.innerHTML =`
      <h1>Total Amount :  ₹ ${finalamt} </h1>
      <button onclick="clearCart()" class="clear-all">Clear Cart</button>
    `;
  }
  else return;
};
finalAmount();