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

export class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = document.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();
  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    thisWidget.dom.input.flatpickr({
      dateFormat: 'd.m.Y',
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,

      'disable': [
        function (date) {
          return (date.getDay() === 1);
        }
      ],
      'locale': {
        'firstDayOfWeek': 1
      }
    });

    thisWidget.dom.input._flatpickr.config.onChange = function (dateStr) {
      console.info(dateStr);
      thisWidget.value = dateStr;
    };

  }

  parseValue(newValue) {
    return newValue;
  }

  isValid() {
    return true;
  }

  renderValue() {
    // console.log('widget.value:', thisWidget.value);
  }
}
