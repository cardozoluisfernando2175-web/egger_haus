document.addEventListener('DOMContentLoaded', function () {
    //carrusel del index
    const img = document.getElementById("mainImage");
    if (img) {
        const images = [
            "mueble_1.png",
            "mueble_2.png",
            "mueble_3.png",
            "mueble_4.png"
        ];
        let current = 0;

        function updateImage() {
            img.src = images[current];
        }

        window.nextImage = function () {
            current = (current + 1) % images.length;
            updateImage();
        };

        window.prevImage = function () {
            current = (current - 1 + images.length) % images.length;
            updateImage();
        };

        let startX = 0;
        img.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        img.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) window.nextImage();
                else window.prevImage();
            }
        });

        setInterval(window.nextImage, 3000);
    }
    //las rayitas en el responsive pleglable
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('#main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                hamburger.classList.remove('active');
            });
        });
    }
    //modal del producto
    const productContainers = document.querySelectorAll('.product-container');
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalReserveBtn = document.getElementById('modal-reserve');

    productContainers.forEach(container => {
        container.addEventListener('click', function (e) {
            if (e.target.classList.contains('button-add')) return;

            const nombre = this.getAttribute('data-nombre') || 'Producto';
            const precio = this.getAttribute('data-precio') || '$0';
            const imgSrc = this.querySelector('img').src;
            const descripcion = this.getAttribute('data-descripcion') || 
                'Este mueble es ideal para cualquier espacio. Hecho con materiales de alta calidad y diseño moderno.';

            modalImg.src = imgSrc;
            modalTitle.textContent = nombre;
            modalPrice.textContent = precio;
            modalDescription.textContent = descripcion;

            modal.style.display = 'flex';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    if (modalReserveBtn){
        modalReserveBtn.addEventListener('click', function () {
            const nombre = modalTitle.textContent;
            const precio = modalPrice.textContent;
            const mensaje = `Hola, quiero reservar el siguiente producto:\n\nNombre: ${nombre}\nPrecio: ${precio}\n\n¿Sigue disponible?`;
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
            modal.style.display = 'none';
        });
    }
    const reserveButtons = document.querySelectorAll('.button-add');
    const numeroWhatsApp = '59176716759'; // ¡Tu número!

    reserveButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nombre = this.getAttribute('data-nombre') || 'Producto';
            const precio = this.getAttribute('data-precio') || 'Precio no especificado';

            const mensaje = `Hola, quiero reservar el siguiente producto:\n\n` +
                            `Nombre: ${nombre}\n` +
                            `Precio: ${precio}\n\n` +
                            `¿Está disponible?`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    });
    //login
    const loginLink = document.getElementById('login-link');
    const loginModal = document.getElementById('login-modal');
    const loginClose = loginModal?.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    const createAccountLink = document.getElementById('create-account-link');
    const googleLoginBtn = document.getElementById('google-login');

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✅ Inicio de sesión exitoso (demostración)');
            loginModal.style.display = 'none';
        });
    }

    if (createAccountLink) {
        createAccountLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('🛠️ Funcionalidad de registro en desarrollo');
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            alert('🚀 Inicio con Google en desarrollo');
        });
    }
});