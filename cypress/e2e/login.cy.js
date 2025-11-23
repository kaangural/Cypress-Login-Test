describe("Login Form Tests", () => {
    const baseUrl = "http://localhost:5173";
  
    it("Başarılı form doldurulduğunda success sayfasına geçer", () => {
      cy.visit(baseUrl);
  
      cy.get('[data-cy="form-email"]').type("emre@wit.com.tr");
      cy.get('[data-cy="form-password"]').type("12345678A");
      cy.get('[data-cy="form-terms"]').check();
  
      cy.get('[data-cy="form-submit"]').should("not.be.disabled").click();
  
      cy.get('[data-cy="success-message"]')
        .should("be.visible")
        .and("contain", "Form başarı ile gönderildi");
    });
  
    it("Email yanlışsa 1 hata mesajı görünür ve buton disabled kalır", () => {
      cy.visit(baseUrl);
  
      cy.get('[data-cy="form-email"]').type("yanlisemail");
      cy.get('[data-cy="form-password"]').type("12345678A");
      cy.get('[data-cy="form-terms"]').check();
  
      cy.get('[data-cy="error-email"]').should("be.visible");
      cy.get(".error-text").should("have.length", 1);
  
      cy.get('[data-cy="form-submit"]').should("be.disabled");
    });
  
    it("Email ve password yanlışsa 2 hata mesajı görünür", () => {
      cy.visit(baseUrl);
  
      cy.get('[data-cy="form-email"]').type("yanlisemail");
      cy.get('[data-cy="form-password"]').type("abc");
      cy.get('[data-cy="form-terms"]').check();
  
      cy.get('.error-text').should("have.length", 2);
      cy.get('[data-cy="error-password"]').should("be.visible");
  
      cy.get('[data-cy="form-submit"]').should("be.disabled");
    });
  
    it("Email ve password doğru olsa bile checkbox işaretlenmemişse buton disabled", () => {
      cy.visit(baseUrl);
  
      cy.get('[data-cy="form-email"]').type("emre@wit.com.tr");
      cy.get('[data-cy="form-password"]').type("12345678A");
  
      cy.get('[data-cy="form-submit"]').should("be.disabled");
    });
  });
  