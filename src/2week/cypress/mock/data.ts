import { Item } from '../../types';
import { TAX_SCALE } from "../../app";

export const FE_CRASH_CAFE_MENUS: Omit<Item, 'category'>[] = [
  { name: '오늘의 커피', price: 1000 },
  { name: '나이트로 바닐라 크림', price: 3500 },
  { name: '나이트로 콜드 브루', price: 4000 },
  { name: '돌체 콜드 브루', price: 3900 },
  { name: '민트 콜드 브루', price: 4800 },
  { name: '바닐라 크림 콜드 브루', price: 4300 },
  { name: '아이스 토피넛 라떼', price: 5500 },
  { name: '제주 비저링 콜드 브루', price: 6000 },
  { name: '라즈베리 쇼콜라', price: 7000 },
  { name: '클래식 스콘', price: 7200 },
  { name: '티라미수 크림 데니쉬', price: 7200 }
];

const total_price = FE_CRASH_CAFE_MENUS.reduce((acc, menu) => acc + menu.price, 0);
export const formatted_total_price = total_price.toLocaleString();
export const formatted_tax_price = (total_price * TAX_SCALE).toLocaleString();