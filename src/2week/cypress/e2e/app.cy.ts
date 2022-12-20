import { FE_CRASH_CAFE_MENUS, formatted_tax_price, formatted_total_price } from '../mock/data';
import { TAX_SCALE } from "../../app";

describe('FECrash 카페', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  context('최초 렌더링 시', () => {
    it('가격', () => {
      it('장바구니 총 가격은 0원이어야 한다.', () => {
        cy.get('.total-price').should('have.text', '0원');
      });

      it('부가세 총 가격은 0원이어야 한다.', () => {
        cy.get('.tax-price').should('have.text', '(부가세: 0원)');
      })
    })
  });

  context('모든 메뉴 클릭 시', () => {
    it('가격', () => {
      cy.get('.add-to-cart').click({ multiple: true });

      it(`장바구니 총 가격은 ${formatted_total_price}원이여야 한다.`, () => {
        cy.get('.total-price').should('have.text', `${formatted_total_price}원`);
      });

      it(`부가세 총 가격은 ${formatted_tax_price}원이여야 한다.`, () => {
        cy.get('.tax-price').should('have.text', `(부가세: ${formatted_tax_price}원)`);
      });
    })
  });

  context('특정 메뉴 클릭 시', () => {
    FE_CRASH_CAFE_MENUS.forEach((menu, index) => {
      it('가격', () => {
        cy.get('.add-to-cart').eq(index).click();
        const menu_price = menu.price.toLocaleString();

        it(`장바구니 총 가격은 ${menu_price}원이여야 한다.`, () => {
          cy.get('.total-price').should('have.text', `${menu_price}원`);
        });

        const tax_price = (menu.price * TAX_SCALE).toLocaleString();
        it(`부가세 총 가격은 ${tax_price}원이여야 한다.`, () => {
          cy.get('.tax-price').should('have.text', `(부가세: ${tax_price}원)`);
        });
      })
    });
  });
});
