console.log("hello Dulani!");
class FashionRackPOS {
    constructor() {
        this.products = [
            { id: 1, name: "Classic White Shirt", category: "shirts", price: 29.99, stock: 15, image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 2, name: "Denim Casual Shirt", category: "shirts", price: 39.99, stock: 8, image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 3, name: "Striped Polo Shirt", category: "shirts", price: 24.99, stock: 12, image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 4, name: "Black Formal Shirt", category: "shirts", price: 34.99, stock: 6, image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 5, name: "Blue Jeans", category: "pants", price: 49.99, stock: 10, image: "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 6, name: "Black Chinos", category: "pants", price: 44.99, stock: 7, image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 7, name: "Formal Trousers", category: "pants", price: 59.99, stock: 5, image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 8, name: "Cargo Pants", category: "pants", price: 39.99, stock: 9, image: "https://images.pexels.com/photos/10861640/pexels-photo-10861640.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 9, name: "Leather Belt", category: "accessories", price: 19.99, stock: 20, image: "https://images.pexels.com/photos/31959217/pexels-photo-31959217.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 10, name: "Silk Tie", category: "accessories", price: 14.99, stock: 15, image: "https://images.pexels.com/photos/130855/pexels-photo-130855.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 11, name: "Designer Watch", category: "accessories", price: 89.99, stock: 3, image: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 12, name: "Sunglasses", category: "accessories", price: 24.99, stock: 12, image: "https://images.pexels.com/photos/704241/pexels-photo-704241.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 13, name: "NIKE AIR Shoes", category: "accessories", price: 154.99, stock: 12, image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 14, name: "NIKE AIR Shoes black", category: "accessories", price: 184.99, stock: 8, image: "https://images.pexels.com/photos/3261068/pexels-photo-3261068.jpeg?auto=compress&cs=tinysrgb&w=300" },
            { id: 15, name: "NIKE AIR Shoes white", category: "accessories", price: 166.99, stock: 10, image: "https://images.pexels.com/photos/15435913/pexels-photo-15435913.jpeg?auto=compress&cs=tinysrgb&w=300" }
        ];
        this.customers = [
            { id: 1, name: "Dulani Piusha", email: "dulani@gmail.com", phone: "+1234567890", address: "123 station rd, Galle", totalOrders: 5 },
            { id: 2, name: "Pemindu Ryan", email: "pemindu@gmail.com", phone: "+1234567891", address: "456 station Ave, Ambalangoda", totalOrders: 3 },
            { id: 3, name: "Buddhima Ryan", email: "ryan@gmail.com", phone: "+1234567892", address: "789 station Rd, Ambalangoda", totalOrders: 8 }
        ];
        this.orders = [
            { id: 1001, customerId: 1, customerName: "Dulani Piusha", date: new Date('2025-01-15'), items: [{ productId: 1, name: "Classic White Shirt", price: 29.99, quantity: 2 }, { productId: 9, name: "Leather Belt", price: 19.99, quantity: 1 }], subtotal: 79.97, discount: 5.00, tax: 6.00, total: 80.97 },
            { id: 1002, customerId: 2, customerName: "Pemindu Ryan", date: new Date('2025-01-16'), items: [{ productId: 5, name: "Blue Jeans", price: 49.99, quantity: 1 }, { productId: 11, name: "Designer Watch", price: 89.99, quantity: 1 }], subtotal: 139.98, discount: 0, tax: 11.20, total: 151.18 }
        ];
        this.cart = [];
        this.currentCustomer = this.discount = this.editingProduct = this.editingCustomer = null;
        this.currentSection = 'pos';
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.loadCustomers();
        this.loadOrders();
        this.updateCustomerSelect();
        this.updateCartDisplay();
    }
    setupEventListeners() {
        const $ = (s, e, h) => document.querySelectorAll(s).forEach(el => el.addEventListener(e, h));
        const $1 = (s, e, h) => document.querySelector(s)?.addEventListener(e, h);
        $('.nav-btn', 'click', e => this.switchSection(e.target.id.replace('nav-', '')));
        $('.nav-btn-mobile', 'click', e => { this.switchSection(e.target.dataset.section); this.toggleMobileMenu(); });
        $1('#mobile-menu-btn', 'click', () => this.toggleMobileMenu());
        $('.category-btn', 'click', e => { this.filterProducts(e.target.dataset.category); this.updateCategoryButtons(e.target); });
        $1('#product-search', 'input', e => this.searchProducts(e.target.value));
        $1('#customer-select', 'change', e => this.selectCustomer(e.target.value));
        $1('#apply-discount', 'click', () => this.applyDiscount());
        $1('#checkout-btn', 'click', () => this.checkout());
        $1('#clear-cart', 'click', () => this.clearCart());
        $1('#add-product-btn', 'click', () => this.showProductModal());
        $1('#product-form', 'submit', e => { e.preventDefault(); this.saveProduct(); });
        $1('#add-customer-btn', 'click', () => this.showCustomerModal());
        $1('#customer-form', 'submit', e => { e.preventDefault(); this.saveCustomer(); });
        $('.close-modal', 'click', () => this.closeModals());
        $1('#order-filter', 'change', e => this.filterOrders(e.target.value));
        $1('#print-receipt', 'click', () => window.print());
        $('.modal', 'click', e => e.target.classList.contains('modal') && this.closeModals());
    }
    switchSection(s) {
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.remove('active');
            if (b.id === `nav-${s}`) b.classList.add('active');
        });
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
            if (sec.id === `${s}-section`) sec.classList.add('active');
        });
        this.currentSection = s;
    }
    toggleMobileMenu() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    }
     loadProducts() {
        const g = document.getElementById('products-grid'), t = document.getElementById('products-table-body');
        g.innerHTML = t.innerHTML = '';
        this.products.forEach(p => { g.appendChild(this.createProductCard(p)); t.appendChild(this.createProductTableRow(p)); });
    }
    createProductCard({ id, name, category, price, stock, image }) {
        const c = document.createElement('div');
        c.className = `product-card bg-white rounded-lg shadow-md overflow-hidden ${stock ? '' : 'out-of-stock'}`;
        c.innerHTML = `<div class="relative"><img src="${image}" alt="${name}" class="w-full h-48 object-cover"><div class="stock-badge ${stock ? stock <= 5 ? 'low-stock' : 'in-stock' : 'out-of-stock'}">${stock ? `${stock} left` : 'Out of Stock'}</div></div><div class="p-4"><h3 class="font-semibold text-gray-800 mb-2">${name}</h3><p class="text-gray-600 text-sm mb-2 capitalize">${category}</p><div class="flex justify-between items-center"><span class="text-lg font-bold text-purple-600">$${price.toFixed(2)}</span><button class="add-to-cart-btn bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors ${stock ? '' : 'opacity-50 cursor-not-allowed'}" ${stock ? '' : 'disabled'} data-product-id="${id}"><i class="fas fa-plus mr-1"></i>Add</button></div></div>`;
        if (stock) c.querySelector('.add-to-cart-btn').addEventListener('click', e => { e.stopPropagation(); this.addToCart(this.products.find(p => p.id === id)); });
        return c;
    }
    createProductTableRow({ id, name, category, price, stock, image }) {
        const r = document.createElement('tr');
        r.innerHTML = `<td class="px-4 py-4"><img src="${image}" alt="${name}" class="w-12 h-12 object-cover rounded"></td><td class="px-4 py-4 font-medium text-gray-900">${name}</td><td class="px-4 py-4 text-gray-500 capitalize">${category}</td><td class="px-4 py-4 text-gray-900">$${price.toFixed(2)}</td><td class="px-4 py-4"><span class="px-2 py-1 text-xs font-semibold rounded-full ${stock ? stock <= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${stock}</span></td><td class="px-4 py-4 space-x-2"><button class="edit-product-btn text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button class="delete-product-btn text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></td>`;
        r.querySelector('.edit-product-btn').addEventListener('click', () => this.editProduct(id));
        r.querySelector('.delete-product-btn').addEventListener('click', () => this.deleteProduct(id));
        return r;
    }
    filterProducts(c) {
        document.querySelectorAll('.product-card').forEach(card => card.style.display = c === 'all' || this.products.find(p => p.id === parseInt(card.querySelector('.add-to-cart-btn')?.dataset?.productId))?.category === c ? 'block' : 'none');
    }
    updateCategoryButtons(b) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-purple-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
            if (btn === b) btn.classList.add('active', 'bg-purple-600', 'text-white');
        });
    }
    searchProducts(q) {
        document.querySelectorAll('.product-card').forEach(c => c.style.display = c.querySelector('h3').textContent.toLowerCase().includes(q.toLowerCase()) ? 'block' : 'none');
    }

    showProductModal(p = null) {
        this.editingProduct = p;
        const m = document.getElementById('product-modal'), f = document.getElementById('product-form');
        document.getElementById('product-modal-title').textContent = p ? 'Edit Product' : 'Add Product';
        if (p) ['name', 'category', 'price', 'stock', 'image'].forEach((k, i) => document.getElementById(`product-${k}`).value = p[k]);
        else f.reset();
        m.classList.remove('hidden');
    }

    saveProduct() {
        const p = ['name', 'category', 'price', 'stock', 'image'].reduce((o, k) => ({ ...o, [k]: document.getElementById(`product-${k}`).value }), {});
        p.id = this.editingProduct ? this.editingProduct.id : Math.max(...this.products.map(p => p.id)) + 1;
        p.price = parseFloat(p.price);
        p.stock = parseInt(p.stock);
        p.image = p.image || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300';
        this.products = this.editingProduct ? this.products.map(x => x.id === p.id ? p : x) : [...this.products, p];
        this.showToast(`Product ${this.editingProduct ? 'updated' : 'added'}!`, 'success');
        this.loadProducts();
        this.closeModals();
    }

    editProduct(id) {
        this.showProductModal(this.products.find(p => p.id === id));
    }

    deleteProduct(id) {
        if (confirm('Delete this product?')) {
            this.products = this.products.filter(p => p.id !== id);
            this.loadProducts();
            this.showToast('Product deleted!', 'success');
        }
    }
     addToCart(p) {
        const i = this.cart.find(x => x.id === p.id);
        if (i && i.quantity >= p.stock) return this.showToast('Out of stock', 'error');
        if (i) i.quantity++; else this.cart.push({ ...p, quantity: 1 });
        this.updateCartDisplay();
        this.showToast(`${p.name} ${i ? 'updated' : 'added'} to cart`, 'success');
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(i => i.id !== id);
        this.updateCartDisplay();
        this.showToast('Item removed', 'info');
    }

    updateQuantity(id, c) {
        const i = this.cart.find(x => x.id === id), p = this.products.find(x => x.id === id);
        if (i && p) {
            const q = i.quantity + c;
            if (q <= 0) this.removeFromCart(id);
            else if (q <= p.stock) i.quantity = q;
            else return this.showToast('Out of stock', 'error');
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const c = document.getElementById('cart-items');
        c.innerHTML = this.cart.length ? this.cart.map(i => `<div class="cart-item bg-gray-50 p-3 rounded-lg"><div class="flex justify-between items-start mb-2"><div class="flex-1"><h4 class="font-medium text-sm">${i.name}</h4><p class="text-gray-600 text-xs">$${i.price.toFixed(2)} each</p></div><button class="remove-item text-red-500 hover:text-red-700 text-sm" data-product-id="${i.id}"><i class="fas fa-times"></i></button></div><div class="flex justify-between items-center"><div class="quantity-controls"><button class="quantity-btn bg-gray-300 hover:bg-gray-400 text-gray-700" data-product-id="${i.id}" data-change="-1">-</button><span class="px-2 font-medium">${i.quantity}</span><button class="quantity-btn bg-gray-300 hover:bg-gray-400 text-gray-700" data-product-id="${i.id}" data-change="1">+</button></div><span class="font-semibold text-purple-600">$${(i.price * i.quantity).toFixed(2)}</span></div></div>`).join('') : '<div class="text-center text-gray-500 py-8"><i class="fas fa-shopping-cart text-4xl mb-2"></i><p>Cart is empty</p></div>';
        c.querySelectorAll('.remove-item').forEach(b => b.addEventListener('click', e => this.removeFromCart(parseInt(e.target.closest('.remove-item').dataset.productId))));
        c.querySelectorAll('.quantity-btn').forEach(b => b.addEventListener('click', e => this.updateQuantity(parseInt(e.target.dataset.productId), parseInt(e.target.dataset.change))));
        this.updateCartSummary();
    }

    updateCartSummary() {
        const s = this.cart.reduce((a, i) => a + i.price * i.quantity, 0), d = s * this.discount / 100, t = (s - d) * 0.08;
        ['subtotal', 'discount-amount', 'tax-amount', 'total-amount'].forEach((id, i) => document.getElementById(id).textContent = `$ ${[s, -d, t, s - d + t][i].toFixed(2)}`);
    }
     selectCustomer(id) {
        this.currentCustomer = id ? this.customers.find(c => c.id === parseInt(id)) : null;
    }

    applyDiscount() {
        const d = parseFloat(document.getElementById('discount-input').value) || 0;
        if (d < 0 || d > 100) return this.showToast('Discount must be 0-100%', 'error');
        this.discount = d;
        this.updateCartSummary();
        this.showToast(`${d}% discount applied`, 'success');
    }
    clearCart() {
        if (this.cart.length && confirm('Clear cart?')) {
            this.cart = [];
            this.discount = 0;
            document.getElementById('discount-input').value = '';
            this.updateCartDisplay();
            this.showToast('Cart cleared', 'info');
        }
    }
    checkout() {
        if (!this.cart.length) return this.showToast('Cart is empty', 'error');
        const s = this.cart.reduce((a, i) => a + i.price * i.quantity, 0), d = s * this.discount / 100, t = (s - d) * 0.08;
        const o = {
            id: Math.max(...this.orders.map(o => o.id), 1000) + 1,
            customerId: this.currentCustomer?.id || null,
            customerName: this.currentCustomer?.name || 'Walk-in Customer',
            date: new Date(),
            items: this.cart.map(i => ({ productId: i.id, name: i.name, price: i.price, quantity: i.quantity })),
            subtotal: s, discount: d, tax: t, total: s - d + t
        };
        this.orders.unshift(o);
        this.cart.forEach(i => { const p = this.products.find(p => p.id === i.id); if (p) p.stock -= i.quantity; });
        if (this.currentCustomer) this.currentCustomer.totalOrders++;
        this.showReceipt(o);
        this.clearCart();
        this.loadProducts();
        this.loadOrders();
        this.showToast('Order completed!', 'success');
    }
     showReceipt({ id, customerName, date, items, subtotal, discount, tax, total }) {
        document.getElementById('receipt-content').innerHTML = `<div class="receipt"><div class="receipt-header"><h2 class="text-xl font-bold">FashionRack</h2><p class="text-sm text-gray-600">Fashion Retail Store<br>123 Fashion Street, Style City<br>Phone: (555) 123-4567</p></div><div class="mb-4"><p><strong>Order #:</strong> ${id}</p><p><strong>Date:</strong> ${date.toLocaleString()}</p><p><strong>Customer:</strong> ${customerName}</p></div><div class="mb-4"><h3 class="font-semibold mb-2">Items:</h3>${items.map(i => `<div class="receipt-item"><span>${i.name} x${i.quantity}</span><span>$${(i.price * i.quantity).toFixed(2)}</span></div>`).join('')}</div><div class="receipt-total"><div class="receipt-item"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>${discount > 0 ? `<div class="receipt-item"><span>Discount:</span><span>-$${discount.toFixed(2)}</span></div>` : ''}<div class="receipt-item"><span>Tax (8%):</span><span>$${tax.toFixed(2)}</span></div><div class="receipt-item text-lg"><span>Total:</span><span>$${total.toFixed(2)}</span></div></div><div class="text-center mt-4 text-sm text-gray-600"><p>Thank you for shopping with us!<br>Visit us again soon!</p></div></div>`;
        document.getElementById('receipt-modal').classList.remove('hidden');
    }

    loadCustomers() {
        const t = document.getElementById('customers-table-body');
        t.innerHTML = this.customers.map(c => `<tr><td class="px-4 py-4 font-medium text-gray-900">${c.name}</td><td class="px-4 py-4 text-gray-500">${c.email}</td><td class="px-4 py-4 text-gray-500">${c.phone}</td><td class="px-4 py-4 text-gray-900">${c.totalOrders}</td><td class="px-4 py-4 space-x-2"><button class="edit-customer-btn text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button class="delete-customer-btn text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></td></tr>`).join('');
        t.querySelectorAll('.edit-customer-btn').forEach((b, i) => b.addEventListener('click', () => this.editCustomer(this.customers[i])));
        t.querySelectorAll('.delete-customer-btn').forEach((b, i) => b.addEventListener('click', () => this.deleteCustomer(this.customers[i].id)));
        this.updateCustomerSelect();
    }

    updateCustomerSelect() {
        document.getElementById('customer-select').innerHTML = '<option value="">Walk-in Customer</option>' + this.customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    showCustomerModal(c = null) {
        this.editingCustomer = c;
        const m = document.getElementById('customer-modal'), f = document.getElementById('customer-form');
        document.getElementById('customer-modal-title').textContent = c ? 'Edit Customer' : 'Add Customer';
        if (c) ['name', 'email', 'phone', 'address'].forEach((k, i) => document.getElementById(`customer-${k}`).value = c[k]);
        else f.reset();
        m.classList.remove('hidden');
    }

    saveCustomer() {
        const c = ['name', 'email', 'phone', 'address'].reduce((o, k) => ({ ...o, [k]: document.getElementById(`customer-${k}`).value }), {});
        c.id = this.editingCustomer ? this.editingCustomer.id : Math.max(...this.customers.map(c => c.id)) + 1;
        c.totalOrders = this.editingCustomer?.totalOrders || 0;
        this.customers = this.editingCustomer ? this.customers.map(x => x.id === c.id ? c : x) : [...this.customers, c];
        this.showToast(`Customer ${this.editingCustomer ? 'updated' : 'added'}!`, 'success');
        this.loadCustomers();
        this.closeModals();
    }
    editCustomer(c) {
        this.showCustomerModal(c);
    }

    deleteCustomer(id) {
        if (confirm('Delete this customer?')) {
            this.customers = this.customers.filter(c => c.id !== id);
            this.loadCustomers();
            this.showToast('Customer deleted!', 'success');
        }
    }

    loadOrders() {
        const t = document.getElementById('orders-table-body');
        t.innerHTML = this.orders.map(o => `<tr><td class="px-4 py-4 font-medium text-gray-900">#${o.id}</td><td class="px-4 py-4 text-gray-500">${o.customerName}</td><td class="px-4 py-4 text-gray-500">${o.date.toLocaleDateString()}</td><td class="px-4 py-4 text-gray-900">${o.items.length} items</td><td class="px-4 py-4 font-semibold text-green-600">$${o.total.toFixed(2)}</td><td class="px-4 py-4 space-x-2"><button class="view-order-btn text-blue-600 hover:text-blue-800"><i class="fas fa-eye"></i></button><button class="delete-order-btn text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></td></tr>`).join('');
        t.querySelectorAll('.view-order-btn').forEach((b, i) => b.addEventListener('click', () => this.viewOrderDetails(this.orders[i])));
        t.querySelectorAll('.delete-order-btn').forEach((b, i) => b.addEventListener('click', () => this.deleteOrder(this.orders[i].id)));
    }

    viewOrderDetails({ id, customerName, date, items, subtotal, total }) {
        document.getElementById('order-details-content').innerHTML = `<div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><h4 class="font-semibold text-gray-700">Order Information</h4><p><strong>Order ID:</strong> #${id}</p><p><strong>Date:</strong> ${date.toLocaleString()}</p><p><strong>Customer:</strong> ${customerName}</p></div><div><h4 class="font-semibold text-gray-700">Order Summary</h4><p><strong>Items:</strong> ${items.length}</p><p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p><p><strong>Total:</strong> $${total.toFixed(2)}</p></div></div><div><h4 class="font-semibold text-gray-700 mb-2">Items Ordered</h4><div class="bg-gray-50 rounded-lg p-4">${items.map(i => `<div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"><div><span class="font-medium">${i.name}</span><span class="text-gray-500 text-sm"> x${i.quantity}</span></div><span class="font-semibold">$${(i.price * i.quantity).toFixed(2)}</span></div>`).join('')}</div></div></div>`;
        document.getElementById('order-details-modal').classList.remove('hidden');
    }

    filterOrders(f) {
        const n = new Date(), o = { today: o => o.date.toDateString() === n.toDateString(), week: o => o.date >= new Date(n.getTime() - 7 * 24 * 60 * 60 * 1000), month: o => o.date >= new Date(n.getFullYear(), n.getMonth() - 1, n.getDate()) }[f] ? this.orders.filter(o[f]) : this.orders;
        const t = document.getElementById('orders-table-body');
        t.innerHTML = o.map(o => `<tr><td class="px-4 py-4 font-medium text-gray-900">#${o.id}</td><td class="px-4 py-4 text-gray-500">${o.customerName}</td><td class="px-4 py-4 text-gray-500">${o.date.toLocaleDateString()}</td><td class="px-4 py-4 text-gray-900">${o.items.length} items</td><td class="px-4 py-4 font-semibold text-green-600">$${o.total.toFixed(2)}</td><td class="px-4 py-4 space-x-2"><button class="view-order-btn text-blue-600 hover:text-blue-800"><i class="fas fa-eye"></i></button><button class="delete-order-btn text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></td></tr>`).join('');
        t.querySelectorAll('.view-order-btn').forEach((b, i) => b.addEventListener('click', () => this.viewOrderDetails(o[i])));
        t.querySelectorAll('.delete-order-btn').forEach((b, i) => b.addEventListener('click', () => this.deleteOrder(o[i].id)));
    }

    deleteOrder(id) {
        if (confirm('Delete this order?')) {
            this.orders = this.orders.filter(o => o.id !== id);
            this.loadOrders();
            this.showToast('Order deleted!', 'success');
        }
    }
      closeModals() {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        this.editingProduct = this.editingCustomer = null;
    }

    showToast(m, t = 'info') {
        const d = document.createElement('div');
        d.className = `toast ${t}`;
        d.innerHTML = `<div class="flex items-center"><i class="fas fa-${t === 'success' ? 'check-circle' : t === 'error' ? 'exclamation-circle' : t === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-2"></i><span>${m}</span></div>`;
        document.getElementById('toast-container').appendChild(d);
        setTimeout(() => d.remove(), 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => new FashionRackPOS());

