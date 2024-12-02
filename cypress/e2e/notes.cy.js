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

  it('should add a new resource', () => {
    // Open the modal and fill in the form
    cy.get('button[data-target="#notesModal"]').click();
    cy.get('#title').type('Test note', { force: true });
    cy.get('#description').type('Test Description', { force: true });
    cy.get('#priority').select('low-priority').should('have.value', 'low-priority');

    // Click the add notes button
    cy.get('button.btn.btn-primary').contains('Add New Notes').click();


    // Verify the resource is in the table
    cy.get('#tableContent').contains('Test note').should('exist');
  });

  it('should view all notes', () => {
    cy.visit(baseUrl);

    // Ensure that the note we just added is visible in the table
    cy.get('#tableContent').contains('Test note').should('exist');
  });

  it('should delete a note', () => {
    cy.visit(baseUrl);

    cy.get('button.btn.btn-sm.btn-danger').find('span.material-icons').last().contains('delete').click();
    
    // Verify that the note has been deleted
    cy.get('#tableContent').contains('Test note').should('not.exist');
  });

  it('should check each filter based on priority', () => {
    cy.visit(baseUrl);

    cy.get('#priorityFilter').select('extreme-priority').should('have.value', 'extreme-priority');
    // Verify that the note is only low priority
    cy.get('#tableContent').get('.note-card').should('have.id', 'extreme-priority');

  });
});