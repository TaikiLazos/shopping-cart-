// global variables
var shoppingCart = [];
var namesarr = [];

// addToCart buttons
// For loop for adding buttons by Taiki, inspired by Web dev Simplified (Youtube) and W3School
var addToCartButtons = document.getElementsByClassName("addToCart");
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
}


// function that adds an item in shopping cart by Taiki
function addToCartClicked(event) {
	var button = event.target;
	var item = button.parentElement;
  // each time the button clicked quantity will raise
  for (var i = 0; i < shoppingCart.length; i++) {
    if (item == shoppingCart[i]) {
      document.getElementsByClassName("cost")[i].value++;
      productTotalPrice();
      totalPrice();
      return;
    }
  }
	shoppingCart.push(item);
  cartDisplay(item);
}

// functions for delte, increment and decrement buttons
// it had to be put before cartDisplay function to call them
function deleteButton() {
  var buttonClicked = event.target;
  var products = document.getElementsByClassName("product");
  buttonClicked.parentElement.parentElement.remove();
  // gets the name of the deleted item, IMPROVE THIS!!!!!!!!
  var item = buttonClicked.parentElement.parentElement;
  var itemdetail = item.children[2];
  var itemName = itemdetail.children[0].innerText;

  // delete this item from the shoppingCart list
  for (var i = 0; i <= namesarr.length; i++) {
    if (itemName == namesarr[i]) {
      shoppingCart.splice(i,1);
      namesarr.splice(i,1);
      break;
    }
  }
  productTotalPrice();
  totalPrice();
}

function incrementButton() {
  var buttonClicked = event.target;
  var value = buttonClicked.parentElement.children[1].value;
  var value = parseInt(value);
  var newValue = value + 1;
  buttonClicked.parentElement.children[1].value = newValue;
  productTotalPrice();
  totalPrice();
}

function decrementButton() {
  var buttonClicked = event.target;
  var value = buttonClicked.parentElement.children[1].value;
  var value = parseInt(value);
  if (value > 1){
      var newValue = value - 1;
      buttonClicked.parentElement.children[1].value = newValue;
      productTotalPrice();
      totalPrice();
  }
  else{
      buttonClicked.parentElement.children[1].value = 1;
      productTotalPrice();
      totalPrice();
  }
}

function cartDisplay(item) {
    var div = document.createElement("div");
    var itemName = item.getElementsByClassName("productName")[0].innerText;
    var itemPrice = item.getElementsByClassName("productPrice")[0].innerText;
    var itemImage = item.getElementsByClassName("productImage")[0].src;
    // makes an array of itemName for delete buttons.
    namesarr.push(itemName);
    // adds this html code for each row
    var cartRow = `
    <div class="product">

          <div>
            <p class="vknop" type="button" onclick="deleteButton()">X</p>
          </div>

          <div class="image">
            <img src="${itemImage}" alt="mask">
          </div>

          <div class="detail">
            <p>${itemName}</p>
            <p>${itemPrice}</p>
          </div>

          <div class="quantity">
            <button class="add" type="button" name="button" onclick="incrementButton()">
              +
            </button>
            <input class="cost" type="text" name="amount" value="1" readonly>
            <button class="remove" type="button" name="button" onclick="decrementButton()">
              -
            </button>
          </div><div class="price"></div>
      </div>`;
      div.innerHTML = cartRow;
      document.getElementById("cartlist").appendChild(div);
      productTotalPrice();
      totalPrice();
}

// total price per item calculator by Taiki
function productTotalPrice() {
	var products = document.getElementsByClassName("product");
	for (var i = 0; i < products.length; i++) {
		// Please improve this if you can!! so many variables \o_o/
		var current_product = products[i];
		var productdetail = current_product.children[2];
		var priceElement = productdetail.children[1];
		var productPrice = parseFloat(priceElement.innerText.replace("€", ""));
		var productQuantity = document.getElementsByClassName("cost")[i].value;
		var priceXquantity = productPrice * productQuantity;
		var price = "€" + priceXquantity;
		document.getElementsByClassName("price")[i].innerText = price;
	}
}

// total price calculator by Taiki
function totalPrice() {
	var totalPriceElement = document.getElementsByClassName("totalPrice")[0];
	var totalPrice = 0;
	var products = document.getElementsByClassName("product");
	if (products.length <= 0) {
		document.getElementsByClassName("totalPrice")[0].innerText = "€ " + totalPrice;
	}
	else {
		var prices = document.getElementsByClassName("price");
		for (var i = 0; i < products.length; i++){
			var productTotalPrice = parseFloat(prices[i].innerText.replace("€", ""));

			totalPrice = totalPrice + productTotalPrice;
		}
		document.getElementsByClassName("totalPrice")[0].innerText = "€ " + totalPrice.toFixed(2);
	}
}
