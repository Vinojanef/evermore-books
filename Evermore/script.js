
// Wait until the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Scroll to Top Button Functionality
    window.onscroll = function () {
        let scrollButton = document.getElementById("scrollToTop");
        if (document.documentElement.scrollTop > 200) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    };

    // Scroll to top function
    window.scrollToTop = function () {
        document.documentElement.scrollTop = 0;
    };

    // Attach event listeners to all "Add to Cart" buttons
    let buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            let bookTitle = this.parentElement.querySelector("h3").innerText;
            let bookPrice = this.parentElement.querySelector("p:nth-child(4)").innerText;

            // Clean price and call addToCart
            addToCart(bookTitle, bookPrice);
            alert(`${bookTitle} added to cart!`);
        });
    });

    // Update cart count when page loads
    updateCartCount();
});

// Book Search Function
function searchBooks() {
    let searchQuery = document.getElementById("bookSearch").value.toLowerCase();

    // Get all book elements
    let books = document.querySelectorAll(".book");

    // Loop through books and check if the title or author matches the search query
    books.forEach(book => {
        let title = book.querySelector("h3").textContent.toLowerCase();
        let author = book.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchQuery) || author.includes(searchQuery)) {
            book.style.display = "block"; // Show matching books
        } else {
            book.style.display = "none"; // Hide non-matching books
        }
    });

    console.log("Searched for:", searchQuery);
}

// Check if cart exists in local storage, if not, create an empty one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Updated Function to add book to cart (fixes NaN issue)
function addToCart(title, price) {
    // Remove currency symbols and convert to number
    let cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    let book = { title, price: cleanPrice };

    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to update cart count display
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}


