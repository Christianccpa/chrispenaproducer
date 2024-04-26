document.addEventListener("DOMContentLoaded", function () {
    // Variables de JavaScript necesarias
    let cart = []; // Array para almacenar los elementos del carrito
    const discountsThreshold = 2; // Umbral para aplicar descuento del 10%

    // Objetos de JavaScript
    const services = [
        { name: "Music production", price: 200 },
        { name: "Audio Editing", price: 50 },
        { name: "Audio Mixing", price: 100 },
        { name: "Mastering", price: 30 },
        { name: "Reamping", price: 20 }
    ];

    console.log("El documento ha sido cargado.");

    // Función para agregar un servicio al carrito
    function addToCart(serviceName) {
        console.log("Intentando agregar al carrito:", serviceName);
        const service = services.find(s => s.name === serviceName);
        if (service) {
            cart.push(service);
            console.log("Servicio agregado al carrito:", service);
            updateCart();
        } else {
            console.log("Servicio no encontrado");
        }
    }

    // Función para actualizar el carrito y el total
    function updateCart() {
        let total = 0;
        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = ''; // Limpiar la lista antes de actualizar

        cart.forEach(item => {
            total += item.price;

            // Crear un elemento de lista para cada servicio en el carrito
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name}: $${item.price}`;
            cartItemsList.appendChild(listItem);
        });

        // Aplicar descuento del 10% si hay más de 2 elementos en el carrito
        if (cart.length > discountsThreshold) {
            total *= 0.9; // Aplicar descuento del 10%
        }

        // Actualizar el total en el DOM
        const cartTotal = document.getElementById('cart-total');
        cartTotal.textContent = `$${total.toFixed(2)}`; // Formatear el total a dos decimales
    }

    // Obtener todos los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Agregar manejadores de eventos a los botones "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceName = button.dataset.service;
            console.log("Botón 'Agregar al carrito' clickeado para:", serviceName);
            addToCart(serviceName);
        });
    });
});
