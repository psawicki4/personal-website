// Form component test helpers
export const formHelpers = {
  /**
   * Selects a pet type (cat or dog)
   */
  selectPetType(type: 'cat' | 'dog') {
    cy.get(`mat-radio-button[value="${type}"]`).click();
  },

  /**
   * Fills in basic cat information
   */
  fillCatInfo(name: string, age: number, description?: string) {
    cy.get('input[data-testid="cat-name"]').type(name);
    cy.get('input[data-testid="cat-age"]').type(age.toString());
    if (description) {
      cy.get('textarea[data-testid="cat-description"]').type(description);
    }
  },

  /**
   * Sets up a purebred cat with breed selection
   */
  setupPurebredCat(name: string, age: number, breed: string) {
    this.selectPetType('cat');
    this.fillCatInfo(name, age);
    cy.get('mat-checkbox[data-testid="cat-purebred"]').click();
    cy.get('input[data-testid="cat-breed"]').type(breed);
    cy.get('mat-option').first().click();
  },

  /**
   * Sets birthday date string (YYYY-MM-DD)
   */
  setBirthday(dateString: string) {
    cy.get('input[data-testid="cat-birthday"]').type(dateString, { force: true });
    cy.get('input[data-testid="cat-birthday"]').blur();
  },

  /**
   * Adds toys to the cat
   */
  addToys(...toys: string[]) {
    toys.forEach((toy) => {
      // Using placeholder from pl.json
      cy.get('input[placeholder="Nowa zabawka..."]').type(`${toy}{enter}`);
    });
  },

  /**
   * Removes a toy by name
   */
  removeToy(toyName: string) {
    cy.contains('mat-chip-row', toyName).find('button[matChipRemove]').click();
  },

  /**
   * Sets slider values
   */
  setSliderValues(beauty?: number, malice?: number) {
    if (beauty !== undefined) {
      cy.get('mat-slider input[data-testid="cat-beauty"]').invoke('val', beauty);
      cy.get('mat-slider input[data-testid="cat-beauty"]').trigger('input');
      cy.get('mat-slider input[data-testid="cat-beauty"]').trigger('change');
    }
    if (malice !== undefined) {
      cy.get('mat-slider input[data-testid="cat-malice"]').invoke('val', malice);
      cy.get('mat-slider input[data-testid="cat-malice"]').trigger('input');
      cy.get('mat-slider input[data-testid="cat-malice"]').trigger('change');
    }
  },

  /**
   * Resets the form
   */
  resetForm() {
    cy.get('button').contains('Resetuj').click();
  },

  /**
   * Submits the form and checks for snackbar
   */
  submitForm(expectSuccess = true) {
    // Using label from pl.json
    cy.get('button').contains('Sprawdź').click();

    cy.get('mat-snack-bar-container').should('be.visible');
    if (expectSuccess) {
      // Check for success message part from pl.json (Gotowe)
      cy.get('mat-snack-bar-container').should('contain', 'Gotowe');
    } else {
      // Check for error message part from pl.json (błędy)
      cy.get('mat-snack-bar-container').should('contain', 'błędy');
    }
  },
};
