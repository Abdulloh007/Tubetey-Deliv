window.addEventListener('DOMContentLoaded',function () {
    'use strict';
    //Global Tabination
    let orderTabheader = document.querySelector('.d-action-content-menu'),
        orderTabBtn = document.querySelectorAll('.d-action-content-menu li a'),
        orderTab = document.querySelectorAll('.d-action-tab');

        showTab(0);
        function showTab(n) {
            orderTabBtn.forEach((item) => item.classList.remove('active'));
            orderTab.forEach((item) => item.style.display = 'none');
            orderTabBtn[n].classList.add('active');
            orderTab[n].style.display = '';

        }
        orderTabheader.addEventListener('click', function () {
            let target = event.target;
            for (let i = 0; i < orderTab.length; i++) {
                if (target == orderTabBtn[i]) {
                    showTab(i);
                }
            }
        });
        //Menu Tab Tabination
        let menuTabHeader = document.querySelector('.d-menu-tabs-header'),
            menuTabBtn = document.querySelectorAll('.d-menu-tabs-header li'),
            menuTab = document.querySelectorAll('.d-menu-tab');
            menuTabShow(3);
            function menuTabShow(n) {
                menuTabBtn.forEach((item) => item.classList.remove('active'));
                menuTab.forEach((item) => item.style.display = 'none');
                menuTabBtn[n].classList.add('active');
                menuTab[n].style.display = '';

            }
            menuTabHeader.addEventListener('click', function () {
                let target = event.target;
                for (let i = 0; i < menuTab.length; i++) {
                    if (target == menuTabBtn[i]) {
                        menuTabShow(i);
                    }
                }
            });
        //Add to Shop
        let dishPrices = document.querySelectorAll('.d-desc-top span'),
            dishNames = document.querySelectorAll('.d-desc-top p'),
            addToOrderBtn = document.querySelectorAll('.d-desc-bottom i'),
            addedDishListTemplate = document.querySelector('#selected-dishes-list'),
            addedDishList = [],
            shopList = [],
            shopAddedItem,
            shopAddedItemPices,
            shopAddedAddBtn,
            shopAddedSubtrackBtn,
            shopAddedItemTotal,
            orderDishArr = [],
            bonusLabel = document.querySelector('#bonus input'),
            bonusCheckbox = document.querySelector('#bonus-checkbox input'),
            promoSelect = document.querySelector('#promocode select'),
            deliveryRoutPrice = document.querySelector('#delivery-price span'),
            totalBonusTemp = document.querySelector('#sale-bonus'),
            totalPromoTemp = document.querySelector('#sale-promo'),
            totalOrderPriceTemp = document.querySelector('#total-order-price'),
            bonusQuantity = 200,
            promocodeQuantity,
            deliveryQuantity = 65,
            totalPrice = 0;

            class orderDish {
                constructor(id, name, price) {
                    this.id = id;
                    this.name = name.innerText;
                    this.price = parseInt(price);
                    this.pices = 1;
                    this.totalPrice = this.price * this.pices;
                }
                introduce(){
                    let obj = {
                        id: this.id,
                        name: this.name,
                        price: this.price,
                        pices: this.pices,
                        totalPrice: this.totalPrice
                    }
                }
            };

            for (let i = 0; i < dishNames.length; i++) {
                let newDishInList = new orderDish(addToOrderBtn[i].id, dishNames[i], dishPrices[i].innerText);
                orderDishArr.unshift(newDishInList);
            };
            addToOrderBtn.forEach((item) => {
                item.addEventListener('click', () => {
                    let target = event.target;
                    addToList(target);
                });
            });

            function addToList(n) {
                for (let i = 0; i < orderDishArr.length; i++) {
                    if (orderDishArr[i].id == n.id && addedDishList.indexOf(n.id) == -1) {
                        shopList.unshift(orderDishArr[i]);
                        let listItemContent = `<p class="d-pice-name">${orderDishArr[i].name.toString()}</p>
                                        <div class="d-dish-set">
                                            <span>${orderDishArr[i].price} ₽ шт</span>
                                            <i class="d-subtrack-pice fas fa-minus"></i>
                                            <p id="pices-quantity" class="d-pices">${orderDishArr[i].pices}</p>
                                            <i class="d-add-pice fas fa-plus"></i>
                                        </div>
                                        <p id="dish-total-price" class="d-pices-total-p">${orderDishArr[i].totalPrice} ₽</p>`,
                            listItem = document.createElement('li');
                            listItem.innerHTML = listItemContent;
                            addedDishListTemplate.prepend(listItem);
                            addedDishList.push(n.id);
                            shopAddedItem = document.querySelectorAll('#selected-dishes-list li');
                            shopAddedItemPices = document.querySelectorAll('#pices-quantity');
                            shopAddedAddBtn = document.querySelectorAll('.d-add-pice');
                            shopAddedSubtrackBtn = document.querySelectorAll('.d-subtrack-pice');
                            shopAddedItemTotal = document.querySelectorAll('#dish-total-price');
                            totalPrice += parseInt(orderDishArr[i].totalPrice);
                            totalOrderPriceTemp.innerText = totalPrice;
                    }
                }
            };

            addedDishListTemplate.addEventListener('click', function () {
                let target = event.target;
                for (let i = 0; i < shopList.length; i++) {
                    if (target == shopAddedAddBtn[i]) {
                        addToShop(i);
                    }else if (target == shopAddedSubtrackBtn[i]) {
                        subtrackFromShop(i);
                    }
                }
            });
            function addToShop(n) {
                shopList[n].pices++;
                shopList[n].totalPrice = shopList[n].pices * shopList[n].price;
                shopAddedItemPices[n].innerText = shopList[n].pices;
                shopAddedItemTotal[n].innerText = `${shopList[n].totalPrice} ₽`;
                totalPrice += shopList[n].price;
                totalOrderPriceTemp.innerText = totalPrice;
            };
            function subtrackFromShop(n) {
                if (shopList[n].pices > 1) {
                    shopList[n].pices--;
                    shopList[n].totalPrice = shopList[n].pices * shopList[n].price;
                    shopAddedItemPices[n].innerText = shopList[n].pices;
                    shopAddedItemTotal[n].innerText = `${shopList[n].totalPrice} ₽`;
                    totalPrice -= shopList[n].price;
                    totalOrderPriceTemp.innerText = totalPrice;
                }
            };

            bonusLabel.addEventListener('click', function () {
                if (bonusCheckbox.checked === true) {
                    totalPrice -= 200;
                    totalOrderPriceTemp.innerText = totalPrice;
                    totalBonusTemp.innerText = `- 200 ₽`;
                }else{
                    totalBonusTemp.innerText =  `0 ₽`;
                    totalPrice += 200;
                    totalOrderPriceTemp.innerText = totalPrice;
                }
            });
            let selectedOnce = 0;
            promoSelect.addEventListener('change', function () {
                totalPrice += parseInt(selectedOnce);
                totalPrice -= this.options[this.selectedIndex].value;
                totalOrderPriceTemp.innerText = totalPrice;
                totalPromoTemp.innerText = `- ${this.options[this.selectedIndex].value} ₽`;
                selectedOnce = this.options[this.selectedIndex].value;
            });
            function deliveryPrice(){
                totalPrice += parseInt(deliveryRoutPrice.innerText);
                totalOrderPriceTemp.innerText = totalPrice;
            };
            deliveryPrice();

});
