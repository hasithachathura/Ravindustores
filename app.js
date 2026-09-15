// Categories 25ක් සහ එක් category එකකට අදාළ images
const categoryDefinitions = [
    { key: "bags", name: "Bags", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80", basePrice: 2500 },
    { key: "clothing", name: "Clothing", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80", basePrice: 1800 },
    { key: "decor", name: "Home Decor", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80", basePrice: 1500 },
    { key: "accessories", name: "Accessories", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80", basePrice: 1200 },
    { key: "footwear", name: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", basePrice: 3200 },
    { key: "electronics", name: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", basePrice: 4500 },
    { key: "kitchen", name: "Kitchenware", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80", basePrice: 1600 },
    { key: "beauty", name: "Beauty & Care", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80", basePrice: 1100 },
    { key: "fitness", name: "Fitness Gear", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80", basePrice: 2800 },
    { key: "jewelry", name: "Jewelry", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", basePrice: 3500 },
    { key: "stationery", name: "Stationery", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80", basePrice: 650 },
    { key: "outdoor", name: "Outdoor & Camp", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80", basePrice: 4200 },
    { key: "pets", name: "Pet Supplies", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80", basePrice: 1400 },
    { key: "toys", name: "Toys & Games", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80", basePrice: 950 },
    { key: "watches", name: "Watches", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80", basePrice: 5800 },
    { key: "eyewear", name: "Eyewear", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80", basePrice: 2100 },
    { key: "bedding", name: "Bedding & Linen", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80", basePrice: 3900 },
    { key: "lighting", name: "Lighting", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", basePrice: 2400 },
    { key: "gardening", name: "Gardening", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80", basePrice: 1300 },
    { key: "bath", name: "Bath Essentials", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80", basePrice: 900 },
    { key: "drinkware", name: "Drinkware & Mugs", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80", basePrice: 850 },
    { key: "leather", name: "Leather Crafts", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80", basePrice: 3100 },
    { key: "art", name: "Art & Crafts", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80", basePrice: 2700 },
    { key: "travel", name: "Travel Gear", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", basePrice: 4800 },
    { key: "baby", name: "Baby Collection", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80", basePrice: 1750 }
];

// 25 Categories * 12 Items = නිෂ්පාදන 300ක් ජනනය කිරීම
const products = [];
let idCounter = 1;

categoryDefinitions.forEach(cat => {
    for (let i = 1; i <= 12; i++) {
        products.push({
            id: idCounter,
            name: `${cat.name} Premium Edition ${i}`,
            category: cat.key,
            categoryName: cat.name,
            price: cat.basePrice + (i * 120),
            image: cat.img
        });
        idCounter++;
    }
});

let cart = JSON.parse(localStorage.getItem('ravindu_cart')) || [];
let activeCategory = 'all';

document.addEventListener("DOMContentLoaded", () => {
    updateAuthUI();
    renderCart();

    if (document.getElementById("featured-container")) {
        renderFeatured();
    }
    if (document.getElementById("product-container")) {
        renderCategoryButtons();
        renderProducts(products);
    }
});

function toggleMenu() {
    const nav = document.getElementById("nav-links");
    if (nav) nav.classList.toggle("open");
}

function renderFeatured() {
    const container = document.getElementById("featured-container");
    if (!container) return;
    container.innerHTML = products.slice(0, 8).map(createProductCard).join('');
}

function renderCategoryButtons() {
    const tabsContainer = document.querySelector(".category-tabs");
    if (!tabsContainer) return;

    let buttonsHTML = `<button class="tab-btn active" onclick="setCategory('all', this)">All (300)</button>`;
    categoryDefinitions.forEach(cat => {
        buttonsHTML += `<button class="tab-btn" onclick="setCategory('${cat.key}', this)">${cat.name} (12)</button>`;
    });
    tabsContainer.innerHTML = buttonsHTML;
}

function renderProducts(items) {
    const container = document.getElementById("product-container");
    if (!container) return;

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
                <span class="card-category-badge">${item.categoryName || item.category}</span>
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

function setCategory(catKey, btn) {
    activeCategory = catKey;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
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

// Cart System
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.toggle('open');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    renderCart();
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.add('open');
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

    if (!count || !total) return;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    count.textContent = totalQty;
    total.textContent = `Rs. ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #64748b; text-align: center; margin-top: 20px;">Cart is empty.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 13px; color: #64748b;">Rs. ${item.price.toLocaleString()} x ${item.qty}</div>
            </div>
            <div>
                <button onclick="updateQty(${item.id}, -1)" style="padding: 2px 8px; cursor: pointer;">-</button>
                <button onclick="updateQty(${item.id}, 1)" style="padding: 2px 8px; cursor: pointer;">+</button>
            </div>
        </div>
    `).join('');
}

// Checkout Logic: අනිවාර්ය Login පරීක්ෂාව සහ Popup විවෘත කිරීම
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const user = JSON.parse(localStorage.getItem('ravindu_user'));
    
    // Login වී නොමැති නම් කෙලින්ම login.html පිටුවට යැවීම
    if (!user) {
        alert("Order එකක් දැමීමට පෙර කරුණාකර Sign In වන්න.");
        window.location.href = "login.html";
        return;
    }

    // Modal එක පෙන්වා total price සහ customer නම auto fill කිරීම
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const modalTotal = document.getElementById('modal-order-total');
    if (modalTotal) {
        modalTotal.textContent = `Rs. ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    const nameInput = document.getElementById('orderName');
    if (nameInput && user.name) {
        nameInput.value = user.name;
    }

    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('active');
    toggleCart();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('active');
}

// Order Confirmation: විස්තර LocalStorage හි තැන්පත් කිරීම
function confirmOrder(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('ravindu_user'));
    const orderData = {
        orderId: "ORD-" + Date.now(),
        customerName: document.getElementById('orderName').value,
        customerEmail: user ? user.email : "",
        phone: document.getElementById('orderPhone').value,
        address: document.getElementById('orderAddress').value,
        paymentMethod: document.getElementById('orderPayment').value,
        items: [...cart],
        totalAmount: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        date: new Date().toLocaleString()
    };

    const orders = JSON.parse(localStorage.getItem('ravindu_orders')) || [];
    orders.push(orderData);
    localStorage.setItem('ravindu_orders', JSON.stringify(orders));

    alert(`ස්තූතියි ${orderData.customerName}! ඔබගේ ඇණවුම සාර්ථකව ලැබුණා. (Order ID: ${orderData.orderId})`);

    // Cart එක හිස් කිරීම සහ Modal එක වැසීම
    cart = [];
    saveCart();
    renderCart();
    closeCheckoutModal();
    document.getElementById('orderForm').reset();
}

// Navbar Authentication UI Logic
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('ravindu_user'));
    const authLink = document.getElementById('auth-nav-link');
    if (user && authLink) {
        authLink.textContent = `Hi, ${user.name}`;
        authLink.href = "#";
        authLink.onclick = (e) => {
            e.preventDefault();
            if (confirm("Do you want to sign out?")) {
                localStorage.removeItem('ravindu_user');
                location.reload();
            }
        };
    }
}