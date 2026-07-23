// Amazon Clone Interactive JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Cart Management & Toast Notification
    // -------------------------------------------------------------
    let cartCount = 0;
    const cartElement = document.querySelector('.nav-cart');
    
    // Add cart count badge element if not already present
    if (cartElement) {
        const cartBadge = document.createElement('span');
        cartBadge.className = 'cart-badge';
        cartBadge.innerText = '0';
        cartElement.style.position = 'relative';
        cartElement.appendChild(cartBadge);
    }

    // Function to show toast notification
    function showToast(message) {
        let toast = document.querySelector('.amazon-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'amazon-toast';
            document.body.appendChild(toast);
        }
        toast.innerText = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // Add click listeners to product boxes & "See more" links
    const productBoxes = document.querySelectorAll('.box');
    productBoxes.forEach(box => {
        const title = box.querySelector('h2')?.innerText || 'Product';
        const seeMore = box.querySelector('p');

        if (seeMore) {
            seeMore.style.cursor = 'pointer';
            seeMore.addEventListener('click', (e) => {
                e.stopPropagation();
                cartCount++;
                const badge = document.querySelector('.cart-badge');
                if (badge) badge.innerText = cartCount;
                showToast(`🛒 Added "${title}" to your Cart!`);
            });
        }

        box.addEventListener('click', () => {
            showToast(`📦 Viewing details for "${title}"`);
        });
    });

    // -------------------------------------------------------------
    // 2. Live Search & Category Filtering
    // -------------------------------------------------------------
    const searchInput = document.querySelector('.search-input');
    const searchSelect = document.querySelector('.search-select');
    const searchIcon = document.querySelector('.search-icon');
    const shopSection = document.querySelector('.shop-section');

    // Populate category dropdown dynamically from grid items
    if (searchSelect) {
        const categories = Array.from(productBoxes).map(box => box.querySelector('h2')?.innerText).filter(Boolean);
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.toLowerCase();
            opt.innerText = cat;
            searchSelect.appendChild(opt);
        });
    }

    function filterProducts() {
        const query = searchInput?.value.toLowerCase().trim() || '';
        const selectedCategory = searchSelect?.value.toLowerCase() || '';

        let visibleCount = 0;

        productBoxes.forEach(box => {
            const title = box.querySelector('h2')?.innerText.toLowerCase() || '';
            const matchesSearch = title.includes(query);
            const matchesCategory = !selectedCategory || selectedCategory === 'all' || title.includes(selectedCategory);

            if (matchesSearch && matchesCategory) {
                box.style.display = 'block';
                visibleCount++;
            } else {
                box.style.display = 'none';
            }
        });

        // Display empty state message if no products match
        let noResultMsg = document.querySelector('.no-products-msg');
        if (visibleCount === 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement('div');
                noResultMsg.className = 'no-products-msg';
                noResultMsg.innerHTML = `<p>🔍 No products found matching "<strong>${query}</strong>". Try another keyword!</p>`;
                shopSection.appendChild(noResultMsg);
            } else {
                noResultMsg.innerHTML = `<p>🔍 No products found matching "<strong>${query}</strong>". Try another keyword!</p>`;
                noResultMsg.style.display = 'block';
            }
        } else if (noResultMsg) {
            noResultMsg.style.display = 'none';
        }
    }

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (searchSelect) searchSelect.addEventListener('change', filterProducts);
    if (searchIcon) searchIcon.addEventListener('click', filterProducts);

    // -------------------------------------------------------------
    // 3. Back to Top Smooth Scroll
    // -------------------------------------------------------------
    const backToTopBtn = document.querySelector('.foot-panel1');
    if (backToTopBtn) {
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------
    // 4. Side Navigation Drawer ("All" Hamburger Menu)
    // -------------------------------------------------------------
    const panelAll = document.querySelector('.panel-all');
    
    // Create Sidebar Drawer Elements
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    
    const sidebarDrawer = document.createElement('div');
    sidebarDrawer.className = 'sidebar-drawer';
    sidebarDrawer.innerHTML = `
        <div class="sidebar-header">
            <i class="fa-solid fa-user-circle"></i>
            <span>Hello, Sign In</span>
            <button class="sidebar-close">&times;</button>
        </div>
        <div class="sidebar-content">
            <h3>Trending</h3>
            <ul>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">New Releases</a></li>
                <li><a href="#">Movers & Shakers</a></li>
            </ul>
            <hr>
            <h3>Digital Content & Devices</h3>
            <ul>
                <li><a href="#">Prime Video</a></li>
                <li><a href="#">Amazon Music</a></li>
                <li><a href="#">Kindle E-readers</a></li>
            </ul>
            <hr>
            <h3>Shop By Category</h3>
            <ul>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Computers</a></li>
                <li><a href="#">Smart Home</a></li>
                <li><a href="#">Arts & Crafts</a></li>
            </ul>
        </div>
    `;
    
    document.body.appendChild(sidebarOverlay);
    document.body.appendChild(sidebarDrawer);

    function openSidebar() {
        sidebarOverlay.classList.add('active');
        sidebarDrawer.classList.add('active');
    }

    function closeSidebar() {
        sidebarOverlay.classList.remove('active');
        sidebarDrawer.classList.remove('active');
    }

    if (panelAll) {
        panelAll.style.cursor = 'pointer';
        panelAll.addEventListener('click', openSidebar);
    }

    sidebarOverlay.addEventListener('click', closeSidebar);
    const sidebarCloseBtn = sidebarDrawer.querySelector('.sidebar-close');
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);

    // -------------------------------------------------------------
    // 5. Deliver-To Location Switcher
    // -------------------------------------------------------------
    const navAddress = document.querySelector('.nav-address');
    if (navAddress) {
        navAddress.style.cursor = 'pointer';
        navAddress.addEventListener('click', () => {
            const newCountry = prompt('Enter your delivery country or zip code:', 'India');
            if (newCountry && newCountry.trim()) {
                const addSec = navAddress.querySelector('.add-sec');
                if (addSec) addSec.innerText = newCountry.trim();
                showToast(`📍 Delivery location updated to ${newCountry.trim()}`);
            }
        });
    }
});
