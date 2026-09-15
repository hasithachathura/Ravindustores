// Catalog Dataset
const products = [
    {
        id: 1,
        name: "Handmade Classic Bag",
        category: "bags",
        price: 2500,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80"
    },
    {
        id: 2,
        name: "Wool Knitted Beanie",
        category: "clothing",
        price: 1200,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=80"
    },
    {
        id: 3,
        name: "Ceramic Desk Planter",
        category: "decor",
        price: 1800,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80"
    },
    {
        id: 4,
        name: "Minimalist Leather Wallet",
        category: "bags",
        price: 2200,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80"
    },
    {
        id: 5,
        name: "Linen Casual Shirt",
        category: "clothing",
        price: 3500,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80"
    },
    {
        id: 6,
        name: "Scented Soy Candle",
        category: "decor",
        price: 1450,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80"
    },
    {
        id: 7,
        name: "Polarized Wood Sunglasses",
        category: "accessories",
        price: 2900,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"
    },
    {
        id: 8,
        name: "Braided Leather Wristband",
        category: "accessories",
        price: 850,
        image: "https://images.unsplash.com/photo-1611591475816-562767073289?w=500&q=80"
    }
];

let cart = [];
let activeCategory = 'all';

// Load initial products
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});

// Render Product Cards
function renderProducts(items) {
    const container = document.getElementById("product-container");
    
    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No products found.</p>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="card">
            <div class="card-img-wrapper">
                <span class="card-category-badge">${item.category}</span>
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="card-body">
                <h3>${item.name}</h3>
                <p class="price">Rs. ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Category Filtering
function setCategory(cat, btn) {
    activeCategory = cat;
    
    // Update active class
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    filterProducts();
}

// Filter Logic combining category and search term
function filterProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    
    const filtered = products.filter(item => {
        const matchesCategory = (activeCategory === 'all' || item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

// Cart Mechanics
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
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const total = document.getElementById('cart-total');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    count.textContent = totalQty;
    total.textContent = `Rs. ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 13px; color: #64748b;">Rs. ${item.price} x ${item.qty}</div>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQty(${item.id}, -1)">-</button>
                <button onclick="updateQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Moving to checkout! Ready to link with PHP Database processing.");
}