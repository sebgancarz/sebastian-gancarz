import {
  BaseWidget
} from './BaseWidget.js';
import {
  select,
  settings
} from '../settings.js';
import {
  utils
} from '../utils.js';

export class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = document.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = document.querySelector(select.widgets.hourPicker.output);

    thisWidget.initPlugin();
    thisWidget.value = thisWidget.dom.input.value;
  }

  initPlugin() {
    const thisWidget = this;

    rangeSlider.create(thisWidget.dom.input);
    thisWidget.dom.input.addEventListener('input', function (e) {
      thisWidget.value = e.target.value;
    });
    return thisWidget.value;
  }

  parseValue(newValue) {
    const thisWidget = this;

    thisWidget.dom.input = utils.numberToHour(newValue);
    return thisWidget.value;
  }

  isValid() {
    return true;
  }

  renderValue() {
    const thisWidget = this;

    thisWidget.dom.output.textContent = thisWidget.dom.input;
  }
}
