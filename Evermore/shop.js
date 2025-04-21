// JavaScript Document
document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    // Search Functionality
    function searchShop() {
        let query = document.getElementById("shopSearch").value.toLowerCase();
        let books = document.querySelectorAll(".book");

        books.forEach(book => {
            let title = book.getAttribute("data-title").toLowerCase();
            if (title.includes(query)) {
                book.style.display = "block";
            } else {
                book.style.display = "none";
            }
        });
    }

    document.getElementById("shopSearch").addEventListener("input", searchShop);

    // Function to add book to cart
function addToCart(title, price) {
    // Remove currency symbol and convert to number
    let cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ""));

    let book = { title, price: cleanPrice };

    // Add book to cart array
    cart.push(book);

    // Save cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart counter
    updateCartCount();
}


    // Update Cart Display
    function updateCart() {
        let cartList = document.getElementById("cartItems");
        let totalPrice = 0;
        cartList.innerHTML = "";

        cart.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `£{item.title} - £${item.price.toFixed(2)}`;
            cartList.appendChild(li);
            totalPrice += item.price;
        });

        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    }

    // Clear Cart
    window.clearCart = function () {
        cart = [];
        updateCart();
    };
});
function addToCart(title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ title, price: parseFloat(price) });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
}
