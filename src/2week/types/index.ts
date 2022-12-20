export type Cart = Item[];

export interface Item {
  name: string;
  category: Category;
  price: number;
}

export type Category = 'C' | 'B'

export interface DOM_BUTTON_ITEM extends Item {
  show_free_shopping_icon: VoidFunction;
  hide_free_shopping_icon: VoidFunction;
}