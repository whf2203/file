var dataJson = require('./mock/data.json');
var cityJson = require('./mock/city.json');
var Beijingjson = require('./mock/Beijing.json');
var Haerbin = require('./mock/Haerbin.json');
var Json_328347 = require('./mock/328347.json');
var obj = {
    '/api/city': cityJson,
    '/api/pic': dataJson,
    '/api/list?id=1': Beijingjson,
    '/api/list?id=105': Haerbin,
    '/api/detail?id=328347': Json_328347
}
module.exports = function(path) {
    return obj[path] || null
}