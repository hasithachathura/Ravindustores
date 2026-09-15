const products = [
    { id: 1, name: "Handmade Classic Bag", category: "bags", price: 2500, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80" },
    { id: 2, name: "Wool Knitted Beanie", category: "clothing", price: 1200, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=80" },
    { id: 3, name: "Ceramic Desk Planter", category: "decor", price: 1800, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80" },
    { id: 4, name: "Minimalist Leather Wallet", category: "bags", price: 2200, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80" },
    { id: 5, name: "Linen Casual Shirt", category: "clothing", price: 3500, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80" },
    { id: 6, name: "Scented Soy Candle", category: "decor", price: 1450, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80" },
    { id: 7, name: "Polarized Wood Sunglasses", category: "accessories", price: 2900, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80" },
    { id: 8, name: "Braided Leather Wristband", category: "accessories", price: 850, image: "https://images.unsplash.com/photo-1611591475816-562767073289?w=500&q=80" },
    { id: 9, name: "Canvas Travel Duffel", category: "bags", price: 4800, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
    { id: 10, name: "Organic Cotton T-Shirt", category: "clothing", price: 1950, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80" },
    { id: 11, name: "Handcrafted Ceramic Mug", category: "decor", price: 1100, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80" },
    { id: 12, name: "Vintage Brass Watch", category: "accessories", price: 5400, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80" }
];

let cart = JSON.parse(localStorage.getItem('ravindu_cart')) || [];
let activeCategory = 'all';

document.addEventListener("DOMContentLoaded", () => {
    updateAuthUI();
    renderCart();

    if (document.getElementById("featured-container")) {
        renderFeatured();
    }
    if (document.getElementById("product-container")) {
        renderProducts(products);
    }
});

function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("open");
}

function renderFeatured() {
    const container = document.getElementById("featured-container");
    container.innerHTML = products.slice(0, 4).map(createProductCard).join('');
}

function renderProducts(items) {
    const container = document.getElementById("product-container");
    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No products found.</p>`;
        return;
    }
    container.innerHTML = items.map(createProductCard).join('');
}

function createProductCard(item) {
    return `
        <div class="card">
            <div class="card-img-wrapper">
                <span class="card-category-badge">${item.category}</span>
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h3>${item.name}</h3>
                <p class="price">Rs. ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

function setCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}

function filterProducts() {
    const query = (document.getElementById("searchInput")?.value || "").toLowerCase();
    const filtered = products.filter(item => {
        const matchesCategory = (activeCategory === 'all' || item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
    renderProducts(filtered);
}

// Cart Management
function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    renderCart();
    document.getElementById('cart-drawer').classList.add('open');
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('ravindu_cart', JSON.stringify(cart));
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const total = document.getElementById('cart-total');

    if (!container || !count || !total) return;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    count.textContent = totalQty;
    total.textContent = `Rs. ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #64748b; text-align: center; margin-top: 20px;">Cart is empty.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 13px; color: #64748b;">Rs. ${item.price} x ${item.qty}</div>
            </div>
            <div>
                <button onclick="updateQty(${item.id}, -1)" style="padding: 2px 6px;">-</button>
                <button onclick="updateQty(${item.id}, 1)" style="padding: 2px 6px;">+</button>
            </div>
        </div>
    `).join('');
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    const user = JSON.parse(localStorage.getItem('ravindu_user'));
    if (!user) {
        alert("Please sign in to complete your checkout.");
        window.location.href = "login.html";
        return;
    }
    alert(`Order placed successfully for ${user.name}!`);
    cart = [];
    saveCart();
    renderCart();
    toggleCart();
}

// Authentication Logic
function switchAuthTab(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const signupTabBtn = document.getElementById('signupTabBtn');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTabBtn.classList.add('active');
        signupTabBtn.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTabBtn.classList.remove('active');
        signupTabBtn.classList.add('active');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;

    const user = { name, email };
    localStorage.setItem('ravindu_user', JSON.stringify(user));
    document.getElementById('authStatus').innerHTML = `<span style="color: green;">Account created! Redirecting...</span>`;
    setTimeout(() => { window.location.href = "shop.html"; }, 1000);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const user = { name: email.split('@')[0], email };
    localStorage.setItem('ravindu_user', JSON.stringify(user));
    document.getElementById('authStatus').innerHTML = `<span style="color: green;">Signed in! Redirecting...</span>`;
    setTimeout(() => { window.location.href = "shop.html"; }, 1000);
}

function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('ravindu_user'));
    const authLink = document.getElementById('auth-nav-link');
    if (user && authLink) {
        authLink.textContent = `Hi, ${user.name}`;
        authLink.href = "#";
        authLink.onclick = () => {
            if (confirm("Do you want to sign out?")) {
                localStorage.removeItem('ravindu_user');
                location.reload();
            }
        };
    }
}