import {
  select,
  classNames,
  templates
} from '../settings.js';
import {
  utils
} from '../utils.js';
import {
  AmountWidget
} from './AmountWidget.js';

export class Product {
  constructor(id, data) {
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();
  }

  renderInMenu() {
    const thisProduct = this;
    const generatedHTML = templates.menuProduct(thisProduct.data);
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.menu);
    menuContainer.appendChild(thisProduct.element);
  }

  getElements() {
    const thisProduct = this;
    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }

  initAccordion() {
    const thisProduct = this;

    thisProduct.accordionTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
      const activeProducts = document.querySelectorAll(select.all.menuProductsActive);

      activeProducts.forEach(activeProduct => {
        if (activeProduct !== thisProduct.element) {
          activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
        }
      });
    });
  }

  initOrderForm() {
    const thisProduct = this;
    thisProduct.form.addEventListener('submit', function (e) {
      e.preventDefault();
      thisProduct.processOrder();
    });

    for (let input of thisProduct.formInputs) {
      input.addEventListener('change', function () {
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function (e) {
      e.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder() {
    const thisProduct = this;
    const formData = utils.serializeFormToObject(thisProduct.form);
    thisProduct.params = {};
    const reg = /^\d+$/;
    let price = thisProduct.data.price;

    for (const paramId in thisProduct.data.params) {
      const param = thisProduct.data.params[paramId];

      for (const optionId in param.options) {
        const option = param.options[optionId];
        const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
        const images = thisProduct.imageWrapper.querySelectorAll('img');

        if (optionSelected && !option.default) {
          price += option.price;
        } else if (!optionSelected && option.default) {
          price -= option.price;
        }

        if (optionSelected) {
          if (!thisProduct.params[paramId]) {
            thisProduct.params[paramId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramId].options[optionId] = option.label;
        }

        images.forEach(image => {
          const imageClass = image.className.replace(/-/g, ' ').toLowerCase();
          const topping = `${param.label} ${option.label}`.toLowerCase();

          if (optionSelected && imageClass.includes(topping)) {
            image.classList.add(classNames.menuProduct.imageVisible);

          } else if (imageClass.includes(topping)) {
            image.classList.remove(classNames.menuProduct.imageVisible);
          }
        });
      }
    }
    if (reg.test(price)) {
      thisProduct.priceSingle = price;
      thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;
      thisProduct.priceElem.innerHTML = thisProduct.price;
    }
  }

  initAmountWidget() {
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function () {
      thisProduct.processOrder();
    });
  }

  addToCart() {
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;

    // app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });

    thisProduct.element.dispatchEvent(event);
  }
}
