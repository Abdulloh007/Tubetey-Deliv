window.addEventListener('DOMContentLoaded',function () {
    'use strict';
/*ICONS*/
let settings = document.querySelector('.d-right-side .d-link'),
    addNewOrderPopup = document.querySelector('.d-right-side .d-add_new_order'),
    /*Menu replacing*/
    menuBlock = document.querySelector('.d-right-side'),
    newInnerBlock = document.createElement('div'),
    userMeta = document.querySelector('.d-user-meta'),
    cog = document.querySelector('.d-link'),
    exitSessionBtn = document.querySelector('.d-exit-session');

    newInnerBlock.className += 'dfa-center';

    if (window.innerWidth <= 1200 ) {
        settings.innerHTML = '<i class="fas fa-cog"></i>';
        // addNewOrderPopup.innerHTML = '<i class="fas fa-plus"></i>'
    }
    if(window.innerWidth <= 768){
        menuBlock.appendChild(newInnerBlock);
        newInnerBlock.appendChild(cog);
        newInnerBlock.appendChild(userMeta);
        newInnerBlock.appendChild(exitSessionBtn);
    }
    /*PopUp*/
    let createNewOrderBtn = document.querySelector('.d-add_new_order'),
        popupOverlay = document.getElementById('create-new'),
        popup = document.querySelector('d-popup-content'),
        closePopupBtn = document.getElementById('close-popup'),
        popupTabs = document.querySelector('.d-popup-tabs'),
        popupTabsBtn = document.querySelectorAll('.d-popup-tabs button'),
        popupTabContent = document.querySelectorAll('.d-popup-tab');

        createNewOrderBtn.addEventListener('click', function () {
            popupOverlay.classList.remove('d-popup-disable');
            document.documentElement.style.overflow = 'hidden';
        });
        closePopupBtn.addEventListener('click', function () {
            popupOverlay.classList.add('d-popup-disable');
            document.documentElement.style.overflow = '';
        });

        showTab(0);

        function showTab(n) {
            popupTabContent.forEach((item) => {
                item.style.display = 'none';
            });
            popupTabsBtn.forEach((item) => {
                item.classList.remove('active-tab');
            });

            popupTabContent[n].style.display = '';
            popupTabsBtn[n].classList.add('active-tab');
        }

        popupTabs.addEventListener('click', function () {
            let target = event.target;

            for (let i = 0; i < popupTabContent.length; i++) {
                if(target == popupTabsBtn[i]){
                    showTab(i);
                }
            }
        });

        //Menu Toggle
        let menuContent = document.querySelector('.d-menu'),
            menuToggleBtn = document.querySelector('#toggle_menu');

            menuToggleBtn.addEventListener('click', function () {
                if(!this.classList.contains('active')){
                    menuToggleBtn.classList.add('active');
                    menuContent.classList.add('active');
                }else{
                    menuToggleBtn.classList.remove('active');
                    menuContent.classList.remove('active');
                }
            });


});
