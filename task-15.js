const bagCount = document.querySelector(".bag-count");
const cartStatus = document.querySelector("#cart-status");
const addButtons = document.querySelectorAll(".add-to-cart");
const cartList = document.querySelector("#cart-items");
const cartPanel = document.querySelector("#cart-panel");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotalRow = document.querySelector("#cart-total-row");
const cartTotal = document.querySelector("#cart-total");
const cartMrp = document.querySelector("#cart-mrp");
const cartSavings = document.querySelector("#cart-savings");
const cartItemCount = document.querySelector("#cart-item-count");
const viewCartButton = document.querySelector("#view-cart");
const closeCartButton = document.querySelector("#close-cart");

let cart = [];

function updateCart() {
    let itemCount = 0;
    let totalPrice = 0;
    let originalTotal = 0;
    cartList.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        itemCount += item.quantity;
        totalPrice += item.price * item.quantity;
        originalTotal += item.mrp * item.quantity;

        const row = document.createElement("li");
        row.className = "cart-item";

        const name = document.createElement("span");
        name.className = "cart-item-name";
        name.textContent = item.name + " × " + item.quantity;

        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = "₹" + (item.price * item.quantity);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-cart-item";
        removeButton.textContent = "Remove";
        removeButton.setAttribute("aria-label", "Remove " + item.name + " from cart");
        removeButton.addEventListener("click", function () {
            cart.splice(cart.indexOf(item), 1);
            updateCart();
            cartStatus.textContent = item.name + " removed from your cart.";
        });

        row.append(name, price, removeButton);
        cartList.append(row);
    }

    bagCount.textContent = itemCount;
    cartItemCount.textContent = itemCount;
    cartEmpty.hidden = cart.length > 0;
    cartTotalRow.hidden = cart.length === 0;
    cartMrp.textContent = "₹" + originalTotal;
    cartSavings.textContent = "₹" + (originalTotal - totalPrice);
    cartTotal.textContent = "₹" + totalPrice;
}

for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function () {
        const name = this.getAttribute("data-product-name");
        let item = null;

        for (let j = 0; j < cart.length; j++) {
            if (cart[j].name === name) {
                item = cart[j];
                break;
            }
        }

        if (item) {
            item.quantity++;
        } else {
            cart.push({
                name: name,
                price: Number(this.getAttribute("data-product-price")),
                mrp: Number(this.getAttribute("data-product-mrp")),
                quantity: 1
            });
        }

        updateCart();
        cartStatus.textContent = name + " added to your cart.";
    });
}

viewCartButton.addEventListener("click", function () {
    cartPanel.hidden = !cartPanel.hidden;
    viewCartButton.setAttribute("aria-expanded", !cartPanel.hidden);
});

closeCartButton.addEventListener("click", function () {
    cartPanel.hidden = true;
    viewCartButton.setAttribute("aria-expanded", "false");
});

updateCart();
