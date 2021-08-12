window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let openPopupBtn = document.getElementById('create-new-rout-btn'),
        closePopupBtn = document.getElementById('close-order-popup'),
        popupOverlay = document.getElementById('create-new-rout'),
        replaceDiv = document.getElementById('replace-close-icon');

        openPopupBtn.addEventListener('click', function () {
            popupOverlay.classList.remove('d-popup-disable');
            document.documentElement.style.overflow = 'hidden';
        });

        closePopupBtn.addEventListener('click', function () {
            popupOverlay.classList.add('d-popup-disable');
            document.documentElement.style.overflow = '';
        });

        if (window.innerWidth <= 992) {
            replaceDiv.appendChild(closePopupBtn);
        }
});
