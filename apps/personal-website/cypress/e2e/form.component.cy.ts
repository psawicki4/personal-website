import { formHelpers } from '../support/form-helpers';

describe('Form Component (E2E Flows)', () => {
  beforeEach(() => {
    cy.visit('/form', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('langCode', 'pl');
      },
    });
  });

  // SCENARIO 1: Full user journey (Happy Path)
  // Tests integration of all controls and final success
  it('should allow user to fill the cat form completely and submit successfully', () => {
    // 1. Fill basic info using helper
    formHelpers.setupPurebredCat('Mruczek', 5, 'Sfinks');

    // 2. Fill additional fields
    cy.get('textarea[formControlName="description"]').type('To jest bardzo grzeczny kot.');

    // 3. Slider handling (UI interaction)
    formHelpers.setSliderValues(8, 2);

    // 4. Toy handling (Chips)
    formHelpers.addToys('Myszka');
    cy.get('mat-chip-row').should('contain', 'Myszka');

    // 5. Submit the form
    formHelpers.submitForm(true);
  });

  // SCENARIO 2: Validation (Sad Path)
  // Checks if the application blocks invalid actions
  it('should validate form and prevent submission of invalid data', () => {
    formHelpers.selectPetType('cat');

    // 1. Attempt to submit an empty form (triggers validation messages)
    formHelpers.submitForm(false);

    // Expecting error to be visible
    cy.get('mat-error').should('be.visible');

    // 2. Entering data out of range (e.g., age 150 years)
    // We use selectall+backspace to ensure field is empty before typing
    cy.get('input[formControlName="age"]').type('{selectall}{backspace}150');
    cy.get('input[formControlName="age"]').blur();

    // Specifically check for error in the age field
    cy.get('mat-form-field:has(input[formControlName="age"]) mat-error').should('be.visible');

    // 3. Error fix
    cy.get('input[formControlName="age"]').type('{selectall}{backspace}5');
    cy.get('input[formControlName="age"]').blur();

    // Error for age should disappear
    cy.get('mat-form-field:has(input[formControlName="age"]) mat-error').should('not.exist');
  });

  // SCENARIO 3: Interaction with Dialog
  // Checks an alternative UI path that is not a form
  it('should open dialog when choosing a dog', () => {
    formHelpers.selectPetType('dog');

    // Checking if the dialog opened
    cy.get('mat-dialog-container').should('be.visible');
    cy.get('h2').should('contain', 'Hmm');
  });
});
