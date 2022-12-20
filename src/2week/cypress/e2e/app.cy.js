describe('FECrash 카페', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  context('최초 렌더링 시', () => {
    it('장바구니 총 가격은 0원이어야 한다.', () => {
      cy.get('.total-price').should('have.text', '0원');
    });
  });
});
