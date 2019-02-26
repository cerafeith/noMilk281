const cartStateKey = "cartState";

const myItems = {
  trapperCreek: {
    price: 15,
    quantity: 0,
    name: "Trapper Creek"
  },
  frenchRoast: {
    price: 15,
    quantity: 0,
    name: "French Roast"
  },
  aeropress: {
    price: 30,
    quantity: 0,
    name: "Aeropress"
  },
  frenchPress: {
    price: 36,
    quantity: 0,
    name: "French Press"
  },
  kit: {
    price: 215,
    quantity: 0,
    name: "Kit"
  }
};

function initLocalStorage() {
  if (localStorage.getItem(cartStateKey) === null) {
    localStorage.setItem(cartStateKey, JSON.stringify(myItems));
  }
}

function mutateShopState(itemKey, incrementValue) {
  const currentCartState = JSON.parse(localStorage.getItem(cartStateKey));
  const currentItemState = currentCartState[itemKey];
  const newQuanity = currentItemState.quantity + incrementValue;

  if(newQuanity === 0) { 
    return 0;
  }

  const newCurrentItemState = {
    ...currentItemState,
    quantity: newQuanity,
  };

  localStorage.setItem(
    cartStateKey,
    JSON.stringify({
      ...currentCartState,
      [itemKey]: newCurrentItemState
    })
  );

  return newQuanity;
}

function myFunction(element, itemKey, incrementValue) {
  let adderValue;
  var background = element;
  background.style.backgroundColor = "#CBB9AB";
  element.innerHTML = "Added to Cart";

  mutateShopState(itemKey, incrementValue);

  setTimeout(function() {
    element.innerHTML = "Add to Cart";
    background.style.backgroundColor = "#433727";
  }, 1000);
}

function getAllItems() {
  const state = JSON.parse(localStorage.getItem("cartState"));
  const cartPlaceholder = document.querySelector(".cart-placeholder");
  
  const totalTr = document.createElement("tr");
  const totalDescriptionTd = document.createElement("td");
  const totalValueTd = document.createElement("td");
  
  totalDescriptionTd.setAttribute("colspan", 2);
  totalDescriptionTd.setAttribute("class", "bottom");
  totalValueTd.setAttribute("class", "bottom");
  totalDescriptionTd.innerHTML = "Total"

  Object.entries(state)
    .filter(([key, value]) => value.quantity > 0)
    .map(([key, value]) => {
      const tr = document.createElement("tr");
      const itemNameTd = document.createElement("td");
      const itemCountTd = document.createElement("td");
      const itemPriceTd = document.createElement("td");

      const deButt = document.createElement("button");
      const inButt = document.createElement("button");
      const quantityContainer = document.createElement("span");


      // Adding onClick event listeners
      deButt.addEventListener("click", (event) => {
        const newQuantity = mutateShopState(key, -1);

        quantityContainer.innerHTML = newQuantity;
        itemPriceTd.innerHTML = `$${newQuantity * value.price}`;
      });

      inButt.addEventListener("click", (event) => {
        const newQuantity = mutateShopState(key, 1);

        quantityContainer.innerHTML = newQuantity;
        itemPriceTd.innerHTML = `$${newQuantity * value.price}`;
      });


      // Adding class attributes
      deButt.setAttribute("class", "counter_button");
      inButt.setAttribute("class", "counter_button");
      // totalTd.setAttribute("class", "bottom");

      // injecting the text for quantity
      itemNameTd.innerHTML = value.name;
      deButt.innerHTML = "-";
      inButt.innerHTML = "+";
      quantityContainer.innerHTML = value.quantity
      itemPriceTd.innerHTML = `$${value.price * value.quantity}`;
      // totalTd.innerHTML = `$${}`

      itemCountTd.appendChild(deButt);
      itemCountTd.appendChild(quantityContainer);
      itemCountTd.appendChild(inButt);


      tr.appendChild(itemNameTd);
      tr.appendChild(itemCountTd);
      tr.appendChild(itemPriceTd);

      cartPlaceholder.appendChild(tr);
    });

  // get total here
  setInterval(() => {
    const newState = JSON.parse(localStorage.getItem("cartState"));
    const total = Object.values(newState)
      .map(item => item.price * item.quantity)
      .reduce((total, current) => total + current, 0);
    
    totalValueTd.innerHTML = `$${total}`;
  }, 500);

  totalTr.appendChild(totalDescriptionTd);
  totalTr.appendChild(totalValueTd);
  cartPlaceholder.appendChild(totalTr);
}

function emptyCart() {
  window.localStorage.clear();
  location.reload();
}
