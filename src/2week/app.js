"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
exports.__esModule = true;
exports.use_state = exports.multiply = exports.add = exports.add_element_to_array = exports.sum_array = exports.get_price_excluding_unit = exports.get_cart_price = exports.add_item = exports.format_tax_price = exports.format_total_price = exports.calc_tax = exports.get_cart_price_list = exports.calc_cart_total_price = exports.gets_free_shipping = exports.get_button_item = exports.get_text_content = exports.get_item_from_button_element = exports.set_tax_dom = exports.update_tax_dom = exports.get_buy_buttons_dom = exports.update_shipping_icons = exports.set_cart_total_dom = exports.calc_cart_total = exports.add_item_to_cart = exports.set_shopping_cart = exports.get_shopping_cart = exports.TAX_SCALE = void 0;
// D
var FREE_SHIPPING_PRICE = 20000;
exports.TAX_SCALE = 0.1;
exports.get_shopping_cart = (_a = use_state([]), _a[0]), exports.set_shopping_cart = _a[1];
document.querySelectorAll('button').forEach(function (button) {
    return button.addEventListener('click', function (_a) {
        var target = _a.target;
        if (target instanceof HTMLButtonElement) {
            var item = (0, exports.get_item_from_button_element)(target);
            (0, exports.add_item_to_cart)(item);
        }
    });
});
// A
var add_item_to_cart = function (item) {
    var next_cart = (0, exports.add_item)((0, exports.get_shopping_cart)(), item);
    (0, exports.calc_cart_total)(next_cart);
    (0, exports.set_shopping_cart)(__spreadArray([], next_cart, true));
};
exports.add_item_to_cart = add_item_to_cart;
// A
var calc_cart_total = function (cart) {
    var shopping_cart_total = (0, exports.calc_cart_total_price)(cart);
    (0, exports.update_shipping_icons)(shopping_cart_total);
    (0, exports.set_cart_total_dom)(shopping_cart_total);
    (0, exports.update_tax_dom)(shopping_cart_total);
};
exports.calc_cart_total = calc_cart_total;
// A
var set_cart_total_dom = function (cart_total) {
    document.querySelector('.total-price').textContent = (0, exports.format_total_price)(cart_total);
};
exports.set_cart_total_dom = set_cart_total_dom;
// A
var update_shipping_icons = function (cart_total) {
    var buy_buttons = (0, exports.get_buy_buttons_dom)();
    buy_buttons.forEach(function (button_item) {
        var price = (0, exports.get_cart_price)(button_item);
        var next_total = (0, exports.add)(cart_total, price);
        (0, exports.gets_free_shipping)(next_total, FREE_SHIPPING_PRICE) ?
            button_item.show_free_shopping_icon() : button_item.hide_free_shopping_icon();
    });
};
exports.update_shipping_icons = update_shipping_icons;
// A
var get_buy_buttons_dom = function () { return get_button_items(document.querySelectorAll('button')); };
exports.get_buy_buttons_dom = get_buy_buttons_dom;
// A
var update_tax_dom = function (total) { return (0, exports.set_tax_dom)((0, exports.calc_tax)(total, exports.TAX_SCALE)); };
exports.update_tax_dom = update_tax_dom;
// A
var set_tax_dom = function (value) { return document.querySelector('.tax-price').textContent = (0, exports.format_tax_price)(value); };
exports.set_tax_dom = set_tax_dom;
// A
var get_item_from_button_element = function (element) {
    var name = (0, exports.get_text_content)(element, '.menu-name');
    var category = (0, exports.get_text_content)(element, '.category');
    var price = (0, exports.get_text_content)(element, '.price');
    var parsed_price = parseInt((0, exports.get_price_excluding_unit)(price, '원'));
    return { name: name, category: category, price: parsed_price };
};
exports.get_item_from_button_element = get_item_from_button_element;
// A
var get_text_content = function (element, selectors) {
    return element.parentNode.querySelector(selectors).textContent;
};
exports.get_text_content = get_text_content;
// A
var get_button_items = function (button_nodes) { return Array.from(button_nodes).map(exports.get_button_item); };
// A
var get_button_item = function (button) {
    var item = (0, exports.get_item_from_button_element)(button);
    var button_item = __assign(__assign({}, item), { show_free_shopping_icon: function () {
            console.log('DOM 의 아이콘을 보여줍니다');
        }, hide_free_shopping_icon: function () {
            console.log('DOM 의 아이콘을 숨깁니다');
        } });
    return button_item;
};
exports.get_button_item = get_button_item;
// C - shipping
var gets_free_shipping = function (added_price, free_shipping_price) { return added_price >= free_shipping_price; };
exports.gets_free_shipping = gets_free_shipping;
// C - cart
var calc_cart_total_price = function (cart) { return (0, exports.sum_array)((0, exports.get_cart_price_list)(cart)); };
exports.calc_cart_total_price = calc_cart_total_price;
// C - cart
var get_cart_price_list = function (cart) { return cart.map(function (item) { return (0, exports.get_cart_price)(item); }); };
exports.get_cart_price_list = get_cart_price_list;
// C - cart
var calc_tax = function (total, ratio) { return (0, exports.multiply)(total, ratio); };
exports.calc_tax = calc_tax;
// C - cart
var format_total_price = function (value) { return "".concat(value.toLocaleString(), "\uC6D0"); };
exports.format_total_price = format_total_price;
// C - cart
var format_tax_price = function (value) { return "(\uBD80\uAC00\uC138: ".concat(value.toLocaleString(), "\uC6D0)"); };
exports.format_tax_price = format_tax_price;
// C - cart, item
var add_item = function (cart, item) { return (0, exports.add_element_to_array)(cart, item); };
exports.add_item = add_item;
// C - item
var get_cart_price = function (item) { return item.price; };
exports.get_cart_price = get_cart_price;
// C - util
var get_price_excluding_unit = function (price, excluding_unit) { return price.replace(excluding_unit, '').replace(',', ''); };
exports.get_price_excluding_unit = get_price_excluding_unit;
// C - util
var sum_array = function (num_array) { return num_array.reduce(exports.add, 0); };
exports.sum_array = sum_array;
// C - util
var add_element_to_array = function (array, element) { return __spreadArray(__spreadArray([], array, true), [element], false); };
exports.add_element_to_array = add_element_to_array;
// C - util
var add = function (num1, num2) { return num1 + num2; };
exports.add = add;
// C - util
var multiply = function (num1, num2) { return num1 * num2; };
exports.multiply = multiply;
// C - util
function use_state(init_value) {
    var value = init_value;
    var get_state = function () { return value; };
    var set_state = function (new_value) {
        value = new_value;
    };
    return [get_state, set_state];
}
exports.use_state = use_state;
