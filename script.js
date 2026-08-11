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

// --- PlanBuddy AI Agent Logic ---

const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatContainer = document.getElementById('chatContainer');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatMessages = document.getElementById('chatMessages');

// Toggle Chat Window
chatToggleBtn.addEventListener('click', () => {
    chatContainer.classList.add('active');
});

closeChatBtn.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Handle Sending Messages
function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Add User Message to UI
    appendMessage(text, 'user');
    chatInput.value = '';

    // 2. Simulate AI Processing Delay
    setTimeout(() => {
        const response = generatePlanBuddyResponse(text);
        appendMessage(response, 'bot');
    }, 800);
}

// Event Listeners for Send
sendMessageBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// Append Message to Chat DOM
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerText = text;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
}

// --- The Simulated AI Brain (Tier-1 Deflection) ---
// Later, this function will be replaced by an API call (e.g., fetch('https://api.openai...'))
function generatePlanBuddyResponse(userInput) {
    const lowerInput = userInput.toLowerCase();

    // Deflection Rule 1: WISMO (Where is my order?)
    if (lowerInput.includes('where') || lowerInput.includes('track') || lowerInput.includes('order')) {
        return "I checked our warehouse system. Your latest order for 'Noise-Canceling Wireless Headphones' is out for delivery and will arrive by 7:00 PM today via our Express fleet.";
    }
    
    // Deflection Rule 2: Returns and Refunds
    if (lowerInput.includes('return') || lowerInput.includes('refund')) {
        return "I can help with that. Since your item falls under our low-risk tier, I have automatically pre-cleared a refund to your original payment method. It will reflect in 2-3 business days.";
    }

    // Escalation Rule: Complex or Disputed Queries
    if (lowerInput.includes('broken') || lowerInput.includes('angry') || lowerInput.includes('manager') || lowerInput.includes('fraud')) {
        return "I understand this is frustrating. I have prepared a case summary and am escalating this directly to a human dispute specialist. They will review it and connect with you shortly.";
    }

    // Default Fallback
    return "I'm PlanBuddy, BrightCart's AI assistant. I can help with order tracking, standard refunds, or navigating the store. Could you provide a bit more detail?";
}
