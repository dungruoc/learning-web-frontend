'use strict';

console.log(20 === 20.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // -> false: much more terrifying

// number from string
console.log(+'20', -'20', '20', Number('20'));

// numeric separator

const digit_number = 1_000_001;
console.log(digit_number);
console.log(Number.parseInt('1_000_001')); // -> 1: will not work with separator


const now = new Date();
console.log(now);

const aDate = new Date('Aug 19 2026 13:22:46 GMT+0800');
console.log(aDate);
console.log(aDate.toISOString());
console.log(aDate.getTime()); // number of milli-seconds after Julian date

const zeroJulian = new Date(0);
console.log(zeroJulian);
console.log(new Date(3 * 24 * 60 * 60 * 1000)) // 3 days after Julian date

const dateIntlOpts = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
}

const locale = navigator.language;
console.log(locale);

console.log(Intl.DateTimeFormat('en-EN', dateIntlOpts).format(now));
console.log(Intl.DateTimeFormat('en-GB', dateIntlOpts).format(now));
console.log(Intl.DateTimeFormat(locale, dateIntlOpts).format(now));

const num = 12345678.123;
const numOptions = {
    style: 'unit',
    unit: 'mile-per-hour'
}

console.log('en-US: ', Intl.NumberFormat('en-US').format(num));
console.log('en-US: ', Intl.NumberFormat('en-US', numOptions).format(num));
console.log('de-DE: ', Intl.NumberFormat('de-DE').format(num));
console.log('de-DE: ', Intl.NumberFormat('de-DE', numOptions).format(num));
console.log('en-GB: ', Intl.NumberFormat('en-GB').format(num));
console.log('en-GB: ', Intl.NumberFormat('en-GB', numOptions).format(num));
console.log('ar-SY: ', Intl.NumberFormat('ar-SY').format(num));
console.log('ar-SY: ', Intl.NumberFormat('ar-SY', numOptions).format(num));

console.log('fr-FR: ', Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
}).format(num));

console.log('en-US: ', Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
}).format(num));
