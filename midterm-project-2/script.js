class ProductList {
  constructor(element) {
    this.element = element;
    this.state = {
      products: [],
      cartList: [],
    };
  }

  static template(item, idx) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let divCardOverlay = document.createElement("div");
    divCardOverlay.classList.add("card-overlay");
    let divCardOverlayHeading = document.createElement("div");
    divCardOverlayHeading.classList.add("card-overlay-heading");
    let divCardOverlayParagraph = document.createElement("div");
    divCardOverlayParagraph.classList.add("card-overlay-paragraph");
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("add-btn");
    let image = document.createElement("img");
    image.classList.add("card-img");

    divCard.appendChild(divCardOverlay);
    divCardOverlay.appendChild(divCardOverlayHeading);
    divCardOverlay.appendChild(divCardOverlayParagraph);
    divCardOverlay.appendChild(btn);
    divCard.appendChild(image);

    divCardOverlayHeading.textContent = item.name;
    divCardOverlayParagraph.textContent = `$${item.price}`;
    divCardOverlayHeading.textContent = item.name;
    btn.textContent = "Add to the cart";
    btn.setAttribute("key", idx);
    image.setAttribute("src", item.imgPath);
    return divCard;
  }

  // static template(item, idx) {
  //   return `<div class="card">
  //     <div class="card-overlay">
  //       <h1 class="card-overlay-heading ">${item.name}</h1>
  //       <p class="card-overlay-paragraph">Price: $ ${item.price}</p>
  //       <button type="button" class="btn add-btn" onclick="addToCart(${idx});">Add to the cart</button>
  //     </div>
  //     <img src="${item.imgPath}" class="card-img " />
  //   </div>`;
  // }

  static cartTemplate(item, idx) {
    let cartBoxItem = document.querySelector(".cart-box-item");
    // ==== elements&class
    //sibling <div>
    let divCartItemImage = document.createElement("div");
    divCartItemImage.classList.add("cart-box-item-img");
    let divCartItemContain = document.createElement("div");
    divCartItemImage.classList.add("cart-box-item-contain");
    let divCartItemRemove = document.createElement("div");
    divCartItemRemove.classList.add("cart-box-item-remove");
    //inside <div>
    let cartImage = document.createElement("img");
    let breadName = document.createElement("h4");
    let breadPrice = document.createElement("h5");
    let breadQuant = document.createElement("p");
    let breadQuantSpan = document.createElement("span");
    let removeItem = document.createElement("span");
    removeItem.classList.add("remove-item");
    removeItem.setAttribute("key", idx);

    // === text
    let textBreadName = document.createTextNode(`${item.name}`);
    let textBreadPrice = document.createTextNode(`$${item.price}`);
    let textBreadQuant = document.createTextNode(`Quantity:`);
    let textBreadQuantSpan = document.createTextNode(`$${item.quantity}`);
    let textRemoveItem = document.createTextNode(`remove`);

    // === appending stage
    //text
    removeItem.appendChild(textRemoveItem);
    breadName.appendChild(textBreadName);
    breadPrice.appendChild(textBreadPrice);
    breadQuantSpan.appendChild(textBreadQuantSpan);
    breadQuant.appendChild(textBreadQuant);
    cartImage.setAttribute("src", item.imgPath);
    //div(1)
    divCartItemImage.appendChild(cartImage);
    //div(2)
    divCartItemContain.appendChild(breadName);
    divCartItemContain.appendChild(breadPrice);
    breadQuant.appendChild(breadQuantSpan);
    divCartItemContain.appendChild(breadQuant);
    //div(3)
    divCartItemRemove.appendChild(removeItem);
    // div(1-3) into div big papa
    cartBoxItem.appendChild(divCartItemImage);
    cartBoxItem.appendChild(divCartItemContain);
    cartBoxItem.appendChild(divCartItemRemove);

    return cartBoxItem;
  }

  async getProducts() {
    // read our JSON
    // let response = await fetch("api"); // TODO: for production
    let response = await fetch("http://localhost:3000/products"); // TODO: for development 
    let productData = await response.json();
    productData.forEach((item) => {
      this.state.products.push(item);
    });
    // update dom with fetched data
    this.update();
  }

  update() {
    // Remove all products
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.state.products.forEach((item, idx) => {
      this.element.appendChild(ProductList.template(item, idx));
    });
  }

  resetCart() {
    productList.state.cartList = [];
    this.cartItemsCounter();
    document.querySelector(".cart-box-item").innerHTML = "";
    document.querySelector(".total-price").innerHTML = "0";
  }

  cartItemsCounter() {
    const $cartBtn = document.querySelector(".cart-btn");
    if (this.state.cartList.length <= 0) {
      $cartBtn.value = "Start to shopping";
    } else {
      let totalItem = 0;
      this.state.cartList.forEach((item) => {
        totalItem = totalItem + item.quantity;
      });
      $cartBtn.value = `(${totalItem}) items`;
    }
  }

  getItem(idx) {
    if (this.state.products[idx].quantity === undefined) {
      return Object.assign(this.state.products[idx], { quantity: 1 });
    } else {
      return this.state.products[idx];
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.state.cartList.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    return totalPrice;
  }

  addToCart(idx) {
    // Remove all products
    let cartBoxItem = document.querySelector(".cart-box-item");
    cartBoxItem.innerHTML = "";

    // Adding to cartList
    let newItem = this.getItem(idx);
    let itemIdx = 0;
    this.state.cartList.forEach((item) => {
      // item had added
      if (item.id === newItem.id) {
        item.quantity++;
        // Delete to old item
        itemIdx = this.state.cartList.indexOf(item);
        this.state.cartList.splice(itemIdx, 1);
      }
    });
    this.state.cartList.push(newItem);

    // Alert
    // alert(`The item ${idx} added to your cart!`);
    console.log(`The item ${newItem.name} added to your cart!`);
    // document.querySelectorAll(".add-btn")[idx].textContent = "Added!";

    console.log(this.state.cartList);

    this.cartItemsCounter();
    document.querySelector(
      ".total-price"
    ).innerHTML = `${this.getTotalPrice()}`;

    // Update template
    this.state.cartList.forEach((item, idx) => {
      ProductList.cartTemplate(item, idx);
    });
  }

  removeItem(idx){
    if(this.state.cartList[idx].quantity <= 1) {
      this.state.cartList.splice(idx, 1);
    } else {
      this.state.cartList[idx].quantity--;
    }
    this.cartItemsCounter();
    document.querySelector(
      ".total-price"
    ).innerHTML = `${this.getTotalPrice()}`;
      
    // Update template
    document.querySelector(".cart-box-item").innerHTML = "";
    this.state.cartList.forEach((item, idx) => {
      ProductList.cartTemplate(item, idx);
    });
  }
}

// Register ProductList
const $productsWrapper = document.querySelector(".menu-imgbox");
const productList = new ProductList($productsWrapper);

// Selectors
const $cartBtn = document.querySelector(".cart-btn");
const $closeCartBtn = document.querySelector(".close-cart");
const $cartOverlay = document.querySelector(".cart");
const $resetCart = document.querySelector(".clear-cart-btn");

// Events
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList[1] === "add-btn") {
    productList.addToCart(event.target.getAttribute("key"));
  }
  if (event.target && event.target.classList[0] === "remove-item") {
    productList.removeItem(event.target.getAttribute("key"));
  }
});

$cartBtn.addEventListener("click", function () {
  $cartOverlay.classList.add("showCart");
});

$closeCartBtn.addEventListener("click", function () {
  $cartOverlay.classList.remove("showCart");
});

$resetCart.addEventListener("click", function () {
  productList.resetCart();
});


// DOM Content Loaded => document.ready
document.addEventListener("DOMContentLoaded", function () {
  productList.getProducts();
});
