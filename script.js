// Global Cart Counter State
let cartCount = 0;

// Function to handle Add to Cart actions
function addToCart(productName) {
    cartCount++;
    const cartCountElement = document.getElementById('cartCount');
    
    // Update counter text
    cartCountElement.innerText = cartCount;

    // Trigger scale animation on cart icon
    const cartWrapper = id => document.getElementById(id);
    const cartBtn = cartWrapper('cartBtn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);

    // Display Toast Notification
    showToast(`"${productName}" added to cart!`);
}

// Function to display toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Interactive Category Filter Tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });
});
