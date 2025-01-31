const EnterpriseAdminSettingsLocators = require("../../../../locators/EnterpriseAdminSettingsLocators.json");
import adminsSettings from "../../../../locators/AdminsSettings";
import { REPO, CURRENT_REPO } from "../../../../fixtures/REPO";

describe("Admin settings page", function() {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/admin/env", {
      body: { responseMeta: { status: 200, success: true }, data: {} },
    }).as("getEnvVariables");
    cy.intercept("PUT", "/api/v1/admin/env", {
      body: { responseMeta: { status: 200, success: true }, data: {} },
    }).as("postEnvVariables");
  });

  it("should test that settings page is redirected to default tab", () => {
    cy.LoginFromAPI(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    cy.visit("/applications");
    cy.wait(3000);
    cy.visit("/settings");
    cy.url().should("contain", "/settings/general");
  });

  it("should test that authentication page shows upgrade button for SSO", () => {
    cy.visit("/settings/general");
    cy.get(adminsSettings.authenticationTab).click();
    cy.url().should("contain", "/settings/authentication");
    if (CURRENT_REPO === REPO.CE) {
      cy.get(EnterpriseAdminSettingsLocators.upgradeOidcButton)
        .should("be.visible")
        .should("contain", "UPGRADE");
      cy.get(EnterpriseAdminSettingsLocators.upgradeSamlButton)
        .should("be.visible")
        .should("contain", "UPGRADE");
    }
  });
});
