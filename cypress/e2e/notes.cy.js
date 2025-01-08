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

  it('should delete a note with stubbing', () => {
    cy.visit(baseUrl);

    cy.intercept('DELETE', '/delete-notes/:id', {
      statusCode: 200,
      body: { message: 'Note deleted successfully!' },
    }).as('deleteNote');

    cy.get('button.btn.btn-sm.btn-danger').find('span.material-icons').last().click();

    cy.get('#tableContent').contains('Test note').should('not.exist');
  });

  it('should filter by extreme priority with stubbing', () => {
    cy.visit(baseUrl);

    // Mock the GET request for extreme priority
    cy.intercept('GET', '/notes?priority=extreme-priority', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Extreme Note', priority: 'EXTREME PRIORITY' },
      ],
    }).as('filterExtremePriority');

    // Trigger the filter selection
    cy.get('#priorityFilter').select('extreme-priority');

    // Verify the filtered results in the UI
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('not.exist');
  });

  it('should filter by high priority with stubbing', () => {
    cy.visit(baseUrl);

    // Mock the GET request for high priority
    cy.intercept('GET', '/notes?priority=high-priority', {
      statusCode: 200,
      body: [
        { id: 2, title: 'High Priority Note', priority: 'HIGH PRIORITY' },
      ],
    }).as('filterHighPriority');

    // Trigger the filter selection
    cy.get('#priorityFilter').select('high-priority');

    // Verify the filtered results in the UI
    cy.get('#tableContent').contains('HIGH PRIORITY').should('exist');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('not.exist');
  });

  it('should filter by medium priority with stubbing', () => {
    cy.visit(baseUrl);

    // Mock the GET request for medium priority
    cy.intercept('GET', '/notes?priority=medium-priority', {
      statusCode: 200,
      body: [
        { id: 3, title: 'Medium Priority Note', priority: 'MEDIUM PRIORITY' },
      ],
    }).as('filterMediumPriority');

    // Trigger the filter selection
    cy.get('#priorityFilter').select('medium-priority');


    // Verify the filtered results in the UI
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('exist');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('LOW PRIORITY').should('not.exist');
  });

  it('should filter by low priority with stubbing', () => {
    cy.visit(baseUrl);

    // Mock the GET request for low priority
    cy.intercept('GET', '/notes?priority=low-priority', {
      statusCode: 200,
      body: [
        { id: 4, title: 'Low Priority Note', priority: 'LOW PRIORITY' },
      ],
    }).as('filterLowPriority');

    // Trigger the filter selection
    cy.get('#priorityFilter').select('low-priority');


    // Verify the filtered results in the UI
    cy.get('#tableContent').contains('LOW PRIORITY').should('exist');
    cy.get('#tableContent').contains('EXTREME PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('HIGH PRIORITY').should('not.exist');
    cy.get('#tableContent').contains('MEDIUM PRIORITY').should('not.exist');
  });
});
