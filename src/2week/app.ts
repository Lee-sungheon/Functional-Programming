// D
const FREE_SHIPPING_PRICE = 20000;
const TAX_SCALE = 0.1;
export const [get_shopping_cart, set_shopping_cart] = use_state<Item[]>([]);


document.querySelectorAll('button').forEach(button =>
  button.addEventListener('click', ({target}) => {
    if (target instanceof HTMLButtonElement) {
      const item = get_item_from_button_element(target);
      add_item_to_cart(item);
    }
  }),
);


// A
export const add_item_to_cart = (item: Item) => {
  const next_cart = add_item<Item>(get_shopping_cart(), item);
  calc_cart_total(next_cart);
  set_shopping_cart([...next_cart]);
};

// A
export const calc_cart_total = (cart: Cart) => {
  const shopping_cart_total = calc_cart_total_price(cart);
  update_shipping_icons(shopping_cart_total);
  set_cart_total_dom(shopping_cart_total);
  update_tax_dom(shopping_cart_total);
};

// A
export const set_cart_total_dom = (cart_total: number) => {
  document.querySelector('.total-price').textContent = `${cart_total.toLocaleString()}원`;
};

// A
export const update_shipping_icons = (cart_total: number) => {
  const buy_buttons = get_buy_buttons_dom();

  buy_buttons.forEach(button_item => {
    const price = get_cart_price(button_item);
    const next_total = add(cart_total, price);

    gets_free_shipping(next_total, FREE_SHIPPING_PRICE) ?
      button_item.show_free_shopping_icon() : button_item.hide_free_shopping_icon();
  })
};

// A
export const get_buy_buttons_dom = () => get_button_items(document.querySelectorAll('button'));

// A
export const update_tax_dom = (total: number) => set_tax_dom(calc_tax(total, TAX_SCALE));

// A
export const set_tax_dom = (value: number) => document.querySelector('.tax-price').textContent = `(부가세: ${value.toLocaleString()}원)`;

// A
export const get_item_from_button_element = (element: HTMLButtonElement) => {
  const name = get_text_content(element, '.menu-name');
  const category = get_text_content(element, '.category');
  const price = get_text_content(element, '.price');
  const parsed_price = parseInt(get_price_excluding_unit(price, '원'));

  return {name, category, price: parsed_price}
};

// A
export const get_text_content = (element: HTMLElement, selectors: string) => {
  return element.parentNode.querySelector(selectors).textContent;
}

// A
const get_button_items = (button_nodes: NodeListOf<HTMLButtonElement>) => Array.from(button_nodes).map(get_button_item);

// A
export const get_button_item = (button: HTMLButtonElement) => {
  const item = get_item_from_button_element(button);

  const button_item: DOM_BUTTON_ITEM = {
    ...item,
    show_free_shopping_icon: function () {
      console.log('DOM 의 아이콘을 보여줍니다');
    },
    hide_free_shopping_icon: function () {
      console.log('DOM 의 아이콘을 숨깁니다');
    }
  };

  return button_item;
}

// C - shipping
export const gets_free_shipping = (added_price: number, free_shipping_price: number) => added_price >= free_shipping_price;

// C - cart
export const calc_cart_total_price = (cart: Cart) => sum_array(get_cart_price_list(cart));

// C - cart
export const get_cart_price_list = (cart: Cart) => cart.map(item => get_cart_price(item));

// C - cart
export const calc_tax = (total: number, ratio: number) => multiply(total, ratio);

// C - cart, item
export const add_item = <T = Item>(cart: T[], item: T) => add_element_to_array<T>(cart, item);

// C - item
export const get_cart_price = (item: Item) => item.price;

// C - util
export const get_price_excluding_unit = (price: string, excluding_unit: string) => price.replace(excluding_unit, '').replace(',', '');

// C - util
export const sum_array = (num_array: number[]) => num_array.reduce(add, 0);

// C - util
export const add_element_to_array = <T>(array: T[], element: T) => [...array, element];

// C - util
export const add = (num1: number, num2: number) => num1 + num2;

// C - util
export const multiply = (num1: number, num2: number) => num1 * num2;

// C - util
export function use_state<T>(init_value: T): [() => T, (v: T) => void] {
  let value = init_value;

  const get_state = () => value;
  const set_state = (new_value: T) => {
    value = new_value;
  };

  return [get_state, set_state];
}

// Type
export type Cart = Item[];

export interface Item {
  name: string;
  category: string;
  price: number;
}

export interface DOM_BUTTON_ITEM extends Item {
  show_free_shopping_icon: VoidFunction;
  hide_free_shopping_icon: VoidFunction;
}
