import {
  Product
} from './components/Product.js';
import {
  Cart
} from './components/Cart.js';
import {
  Booking
} from './components/Booking.js';
import {
  select,
  settings,
  classNames,
  templates
} from './settings.js';

const app = {
  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
        thisApp.data.products = parsedResponse;
        thisApp.initMenu();
      });
  },
  initMenu: function () {
    const thisApp = this;

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children);
    thisApp.navLinks = Array.from(document.querySelectorAll(select.nav.links));

    let pagesMatchingHash = [];

    if (window.location.hash.length > 2) {
      const idFromHash = window.location.hash.replace('#/', '');

      pagesMatchingHash = thisApp.pages.filter(function (page) {
        return page.id === idFromHash;
      });
      thisApp.activatePage(pagesMatchingHash.length ? pagesMatchingHash[0].id : thisApp.pages[0].id);
    }

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const clickedElement = this;
        const elementId = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(elementId);
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let link of thisApp.navLinks) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') === `#${pageId}`);
    }

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.nav.active, page.getAttribute('id') === pageId);
    }

    window.location.hash = `#/${pageId}`;
  },

  initBooking: function () {
    const thisApp = this;

    const bookingElem = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(bookingElem);
  },

  init() {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);

    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
  },
};

app.init();
