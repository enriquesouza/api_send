const random = require('random');

let sapis = ['https://sapi2.smartcash.org/v1/', 'https://core-sapi.smartcash.cc/v1/'];

module.exports = () => sapis[random.int(min = 0, max = (sapis.length - 1))];
