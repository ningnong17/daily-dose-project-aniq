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

  it('should show an error message when delete fails', () => {
    // Spy on the window.alert to capture error messages
    cy.visit(baseUrl);
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
  
    // Mock the DELETE request to return a failure response
    cy.intercept('DELETE', '/delete-notes/*', {
      statusCode: 500,
      body: { message: 'Unable to delete Note!' },
    });
  
    // Trigger the delete button
    cy.get('button.btn.btn-sm.btn-danger').find('span.material-icons').last().click();
  
    // Assert that the alert was called with the error message
    cy.get('@alert').should('have.been.calledWith', 'Unable to delete Note!');
  });
  


  it('should view extreme priority', () => {
    cy.visit(baseUrl);

    // Verify that the note is only extreme priority
    cy.get('#priorityFilter').select('extreme-priority');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('not.exist');

  });

  it('should view high priority', () => {
    cy.visit(baseUrl);

    // Verify that the note is only high priority
    cy.get('#priorityFilter').select('high-priority');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('not.exist');

  });

  it('should view medium priority', () => {
    cy.visit(baseUrl);

    // Verify that the note is only medium priority
    cy.get('#priorityFilter').select('medium-priority');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('not.exist');

  });

  it('should view low priority', () => {
    cy.visit(baseUrl);

    // Verify that the note is only low priority
    cy.get('#priorityFilter').select('low-priority');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('exist');

  });
});