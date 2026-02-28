function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields!");
        return false;
    }

    alert("Message sent successfully!");
    return true;
}

// Cart state
const cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name, price: Number(price), qty: 1 });

    updateCartDisplay();
}

function changeQty(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function clearCart() {
    cart.length = 0;
    updateCartDisplay();
}

function getCartCount() {
    return cart.reduce((s, it) => s + it.qty, 0);
}

function getCartTotal() {
    return cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);
}

function updateCartDisplay() {
    document.getElementById('cartCount').innerText = getCartCount();
    document.getElementById('cartTotal').innerText = getCartTotal();

    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((it, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="left">
              <div>
                <strong>${it.name}</strong><div style="color:#666">Rs. ${Number(it.price).toFixed(2)}</div>
              </div>
            </div>
            <div class="right">
              <span class="qty">Qty: ${it.qty}</span>
              <span style="margin-left:12px">Rs. ${(it.price * it.qty).toFixed(2)}</span>
              <div class="cart-controls" style="display:inline-block;margin-left:8px">
                <button onclick="changeQty(${idx}, 1)">+</button>
                <button onclick="changeQty(${idx}, -1)">−</button>
                <button onclick="removeItem(${idx})">Remove</button>
              </div>
            </div>
        `;
        container.appendChild(row);
    });
}

function openCart() {
    const modal = document.getElementById('cartModal');
    modal.setAttribute('aria-hidden', 'false');
    updateCartDisplay();
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.setAttribute('aria-hidden', 'true');
}

function checkout() {
    if (cart.length === 0) { alert('Cart is empty'); return; }
    const total = getCartTotal();
    alert('Order placed successfully! Total amount: Rs. ' + total);
    clearCart();
    closeCart();
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// Initialize display
document.addEventListener('DOMContentLoaded', () => updateCartDisplay());