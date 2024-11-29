describe('note Management Frontend', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  it('should add a new note', () => {
    // Open the modal and fill in the form
    cy.get('button[data-target="#noteModal"]').click();
    cy.get('#title').type('Test note', { force: true });
    cy.get('#description').type('Test Description', { force: true });
    cy.get('#priority').type('low-priority', { force: true });

    // Click the add note button
    cy.get('button.btn-primary').contains('Add New note').click();

    // Verify the note is in the table
    cy.get('#tableContent').contains('Test note').should('exist');
  });

  it('should view all notes', () => {
    cy.visit(baseUrl);

    // Ensure that the note we just added is visible in the table
    cy.get('#tableContent').contains('Test note').should('exist');
  });

  it('should update an existing note', () => {
    cy.visit(baseUrl);

    // Click the edit button for the note
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();

    // // Update note details
    cy.get('#editTitle').clear().type('Updated note', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editPriority').clear().type('medium-priority', { force: true });

    // Click the update note button
    cy.get('#updateButton').click();

    // Verify the note is updated in the table
    cy.get('#tableContent').contains('Updated note').should('exist');
    cy.get('#tableContent').contains('Test note').should('not.exist');
  });

  it('should delete a note', () => {
    cy.visit(baseUrl);

    cy.get('button.btn-danger').filter(':contains("Delete")').last().click();
    
    // Verify that the note has been deleted
    cy.get('#tableContent').contains('Updated note').should('not.exist');
  });
});