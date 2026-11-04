const mainImage = document.getElementById("img1");
const thumbnails = document.querySelectorAll(".container img");

thumbnails.forEach(function (image) {
    image.addEventListener("click", function () {
        mainImage.src = image.src;

        thumbnails.forEach(function (thumb) {
            thumb.classList.remove("active");
        });

        image.classList.add("active");
    });
});

const quantity = document.getElementById("qty");
const increase = document.getElementById("inc");
const decrease = document.getElementById("dec");

increase.addEventListener("click", function () {
    quantity.value = Number(quantity.value) + 1;
});

decrease.addEventListener("click", function () {
    let value = Number(quantity.value);

    if (value > 1) {
        quantity.value = value - 1;
    }
});

quantity.addEventListener("change", function () {
    let value = Number(quantity.value);

    if (!Number.isInteger(value) || value < 1) {
        quantity.value = 1;
    }
});

function updateCartCount() {
    let cartItems = JSON.parse(
        localStorage.getItem("canonCartItems")
    ) || [];

    let totalItems = cartItems.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    document.getElementById("cartCount").textContent = totalItems;
}

const cartButton = document.getElementById("cart");

cartButton.addEventListener("click", function () {
    let selectedQuantity = Number(quantity.value);

    if (!Number.isInteger(selectedQuantity) || selectedQuantity < 1) {
        alert("Please enter a valid quantity.");
        quantity.value = 1;
        return;
    }

    let cartItems = JSON.parse(
        localStorage.getItem("canonCartItems")
    ) || [];

    let existingProduct = cartItems.find(function (item) {
        return item.name === "Canon EOS 1500D";
    });

    if (existingProduct) {
        existingProduct.quantity += selectedQuantity;
    } else {
        cartItems.push({
            name: "Canon EOS 1500D",
            price: 40,
            quantity: selectedQuantity
        });
    }

    localStorage.setItem(
        "canonCartItems",
        JSON.stringify(cartItems)
    );

    document.getElementById("cartMessage").textContent =
        "Canon Camera added to cart successfully!";

    updateCartCount();
});

document.getElementById("viewCart").addEventListener("click", function () {
    window.location.href = "cart.html";
});

document.getElementById("buyNow").addEventListener("click", function () {
    let selectedQuantity = Number(quantity.value);

    if (!Number.isInteger(selectedQuantity) || selectedQuantity < 1) {
        alert("Please enter a valid quantity.");
        quantity.value = 1;
        return;
    }

    let buyNowItem = {
        name: "Canon EOS 1500D",
        price: 40,
        quantity: selectedQuantity
    };

    localStorage.setItem(
        "buyNowItem",
        JSON.stringify(buyNowItem)
    );

    window.location.href = "checkout.html";
});

window.addEventListener("pageshow", function () {
    updateCartCount();

    document.getElementById("cartMessage").textContent = "";
});
