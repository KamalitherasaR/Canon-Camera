const cartContainer = document.getElementById("cartContainer");
const grandTotal = document.getElementById("grandTotal");

function displayCart() {
    let cartItems = JSON.parse(
        localStorage.getItem("canonCartItems")
    ) || [];

    cartContainer.innerHTML = "";

    let total = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        grandTotal.textContent = "Total: $0.00";
        return;
    }

    cartItems.forEach(function (item, index) {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img
                src="./images/1.jpg"
                alt="Canon Camera"
                class="cart-image"
            >

            <div class="cart-details">
                <h3>${item.name}</h3>

                <p>Price: $${Number(item.price).toFixed(2)}</p>

                <div class="cart-quantity">
                    <button onclick="changeQuantity(${index}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <p>Subtotal: $${itemTotal.toFixed(2)}</p>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartContainer.appendChild(cartItem);
    });

    grandTotal.textContent = "Total: $" + total.toFixed(2);
}

function changeQuantity(index, change) {
    let cartItems = JSON.parse(
        localStorage.getItem("canonCartItems")
    ) || [];

    cartItems[index].quantity += change;

    if (cartItems[index].quantity < 1) {
        cartItems[index].quantity = 1;
    }

    localStorage.setItem(
        "canonCartItems",
        JSON.stringify(cartItems)
    );

    displayCart();
}

function removeItem(index) {
    let cartItems = JSON.parse(
        localStorage.getItem("canonCartItems")
    ) || [];

    cartItems.splice(index, 1);

    localStorage.setItem(
        "canonCartItems",
        JSON.stringify(cartItems)
    );

    displayCart();
}

function clearCart() {
    let confirmClear = confirm(
        "Are you sure you want to clear your cart?"
    );

    if (confirmClear) {
        localStorage.removeItem("canonCartItems");
        displayCart();
    }
}

document.getElementById("clearCart").addEventListener(
    "click",
    clearCart
);

displayCart();
