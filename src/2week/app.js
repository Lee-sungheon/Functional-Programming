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
// C - util
var use_state = function (init_value) {
    var value = init_value;
    var get_state = function () { return value; };
    var set_state = function (new_value) {
        value = new_value;
    };
    return [get_state, set_state];
};
var _a = use_state([]), get_shopping_cart = _a[0], set_shopping_cart = _a[1];
document.querySelectorAll('button').forEach(function (button) {
    return button.addEventListener('click', function (_a) {
        var target = _a.target;
        if (target instanceof HTMLButtonElement) {
            var item = get_item_from_button_element(target);
            add_item_to_cart(item);
        }
    });
});
// A
var add_item_to_cart = function (item) {
    var next_cart = add_item(get_shopping_cart(), item);
    console.log(get_shopping_cart());
    console.log(next_cart);
    calc_cart_total(next_cart);
    set_shopping_cart(__spreadArray([], next_cart, true));
};
// A
var calc_cart_total = function (cart) {
    var shopping_cart_total = calc_cart_total_price(cart);
    update_shipping_icons(shopping_cart_total);
    set_cart_total_dom(shopping_cart_total);
    update_tax_dom(shopping_cart_total);
};
// A
var set_cart_total_dom = function (cart_total) {
    document.querySelector('.total-price').textContent = "".concat(cart_total.toLocaleString(), "\uC6D0");
};
// A
var update_shipping_icons = function (cart_total) {
    var buy_buttons = get_buy_buttons_dom();
    buy_buttons.forEach(function (button_item) {
        var price = get_cart_price(button_item);
        var next_total = add(cart_total, price);
        gets_free_shipping(next_total, FREE_SHIPPING_PRICE) ?
            button_item.show_free_shopping_icon() : button_item.hide_free_shopping_icon();
    });
};
// A
var get_buy_buttons_dom = function () { return get_button_items(document.querySelectorAll('button')); };
// A
var update_tax_dom = function (total) { return set_tax_dom(calc_tax(total, TAX_SCALE)); };
// A
var set_tax_dom = function (value) { return document.querySelector('.tax-price').textContent = "(\uBD80\uAC00\uC138: ".concat(value.toLocaleString(), "\uC6D0)"); };
// C - shipping
var gets_free_shipping = function (added_price, free_shipping_price) { return added_price >= free_shipping_price; };
// C - shipping
var get_button_items = function (button_nodes) { return Array.from(button_nodes).map(get_button_item); };
// C - shipping
var get_button_item = function (button) {
    var item = get_item_from_button_element(button);
    var button_item = __assign(__assign({}, item), { show_free_shopping_icon: function () {
            console.log('DOM 의 아이콘을 보여줍니다');
        }, hide_free_shopping_icon: function () {
            console.log('DOM 의 아이콘을 숨깁니다');
        } });
    return button_item;
};
// C - cart
var calc_cart_total_price = function (cart) { return sum_array(get_cart_price_list(cart)); };
// C - cart
var get_cart_price_list = function (cart) { return cart.map(function (item) { return get_cart_price(item); }); };
// C - cart
var calc_tax = function (total, ratio) { return multiply(total, ratio); };
// C - cart, item
var add_item = function (cart, item) { return add_element_to_array(cart, item); };
// C - item
var get_cart_price = function (item) { return item.price; };
// C - item
var get_item_from_button_element = function (element) {
    var name = get_text_content(element, '.menu-name');
    var category = get_text_content(element, '.category');
    var price = get_text_content(element, '.price');
    var parsed_price = parseInt(get_price_excluding_unit(price, '원'));
    return { name: name, category: category, price: parsed_price };
};
// C - util
var get_price_excluding_unit = function (price, excluding_unit) { return price.replace(excluding_unit, '').replace(',', ''); };
// C - util
var sum_array = function (num_array) { return num_array.reduce(add, 0); };
// C - util
var add_element_to_array = function (array, element) { return __spreadArray(__spreadArray([], array, true), [element], false); };
// C - util
var add = function (num1, num2) { return num1 + num2; };
// C - util
var multiply = function (num1, num2) { return num1 * num2; };
// C - util
var get_text_content = function (element, selectors) {
    return element.parentNode.querySelector(selectors).textContent;
};
// D
var FREE_SHIPPING_PRICE = 20000;
var TAX_SCALE = 0.1;
