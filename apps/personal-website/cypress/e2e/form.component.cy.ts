import { formHelpers } from '../support/form-helpers';

describe('Form Component (Signal Forms E2E Flows)', () => {
  beforeEach(() => {
    cy.visit('/form', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('langCode', 'pl');
      },
    });
  });

  // SCENARIO 1: Full user journey (Happy Path)
  it('should allow user to fill the cat form completely and submit successfully', () => {
    // 1. Fill basic info using helper
    formHelpers.setupPurebredCat('Mruczek', 5, 'Sfinks');

    // 2. Fill additional fields
    cy.get('textarea[data-testid="cat-description"]').type('To jest bardzo grzeczny kot.');

    // 3. Slider handling (UI interaction)
    formHelpers.setSliderValues(8, 2);

    // 4. Toy handling (Chips)
    formHelpers.addToys('Myszka');
    cy.get('mat-chip-row').should('contain', 'Myszka');

    // 5. Submit the form
    formHelpers.submitForm(true);
  });

  // SCENARIO 2: Validation (Sad Path)
  it('should validate form and prevent submission of invalid data', () => {
    formHelpers.selectPetType('cat');

    // 1. Attempt to submit an empty form (triggers validation messages)
    formHelpers.submitForm(false);

    // Expecting error to be visible
    cy.get('mat-error').should('be.visible');

    // 2. Entering data out of range (e.g., age 150 years)
    cy.get('input[data-testid="cat-age"]').type('{selectall}{backspace}150');
    cy.get('input[data-testid="cat-age"]').blur();

    // Specifically check for error in the age field
    cy.get('mat-form-field:has(input[data-testid="cat-age"]) mat-error').should('be.visible');

    // 3. Error fix
    cy.get('input[data-testid="cat-age"]').type('{selectall}{backspace}5');
    cy.get('input[data-testid="cat-age"]').blur();

    // Error for age should disappear
    cy.get('mat-form-field:has(input[data-testid="cat-age"]) mat-error').should('not.exist');
  });

  // SCENARIO 3: Interaction with Dialog
  it('should open dialog when choosing a dog and return to cat on close', () => {
    formHelpers.selectPetType('dog');

    // Checking if the dialog opened
    cy.get('mat-dialog-container').should('be.visible');
    cy.get('h2').should('contain', 'Hmm');

    // Close the dialog using the button
    cy.get('mat-dialog-container button').contains('No dobrze...').click();
    cy.get('mat-dialog-container').should('not.exist');

    // Cat should be selected and cat form should be visible
    cy.get('mat-radio-button[value="cat"]').should('have.class', 'mat-mdc-radio-checked');
    cy.get('input[data-testid="cat-name"]').should('be.visible');
  });

  // SCENARIO 4: Resetting the form
  it('should reset form and hide cat subform when reset is clicked', () => {
    formHelpers.setupPurebredCat('Klakier', 4, 'Perski');
    cy.get('input[data-testid="cat-name"]').should('have.value', 'Klakier');

    // Click Reset
    formHelpers.resetForm();

    // Cat form inputs should no longer be visible
    cy.get('input[data-testid="cat-name"]').should('not.exist');
    cy.get('pre').should('contain', '"petType": ""');
  });

  // SCENARIO 5: Datepicker and age calculation/validation
  it('should auto-calculate age from birthday and validate mismatch', () => {
    formHelpers.selectPetType('cat');

    // Fill valid name
    cy.get('input[data-testid="cat-name"]').type('Filemon');

    // Set birthday to 2 years ago (e.g., 2024-01-01)
    formHelpers.setBirthday('2024-01-01');

    // Age should be automatically populated
    cy.get('input[data-testid="cat-age"]').should('not.have.value', '');

    // Now intentionally set an invalid/mismatching age
    cy.get('input[data-testid="cat-age"]').should('be.visible').and('be.enabled').type('{selectall}{backspace}15');
    cy.get('input[data-testid="cat-age"]').blur();

    // Should display cross-field invalid age error
    cy.contains('mat-error', 'Data urodzin nie zgadza się').should('be.visible');
  });

  // SCENARIO 6: Dynamic chips (adding and removing toys)
  it('should allow adding and removing favourite toys', () => {
    formHelpers.selectPetType('cat');

    // Add multiple toys
    formHelpers.addToys('Wędka', 'Kłębek');
    cy.get('mat-chip-row').should('have.length', 2);
    cy.get('mat-chip-row').first().should('contain', 'Wędka');
    cy.get('mat-chip-row').last().should('contain', 'Kłębek');

    // Remove the first toy
    formHelpers.removeToy('Wędka');
    cy.get('mat-chip-row').should('have.length', 1);
    cy.get('mat-chip-row').should('not.contain', 'Wędka');
    cy.get('mat-chip-row').should('contain', 'Kłębek');
  });

  // SCENARIO 7: Real-time JSON model preview
  it('should update live JSON model preview when form values change', () => {
    formHelpers.selectPetType('cat');
    cy.get('pre').should('contain', '"petType": "cat"');

    cy.get('input[data-testid="cat-name"]').type('Puszek');
    cy.get('pre').should('contain', '"name": "Puszek"');

    cy.get('input[data-testid="cat-age"]').type('3');
    cy.get('pre').should('contain', '"age": 3');
  });
});
