const { describe, it } = require('mocha');
const { expect } = require('chai');

const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl;

describe('note API', () => {

    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::'? 'localhost': address}:${port}`;
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    let count = 0;
    let noteId; // Variable to store the ID of the notes

    // Test Suite for viewing notes
    describe('GET /view-notes', () => {
        it('should return all notes', (done) => {
            chai.request(baseUrl)
                .get('/view-notes')
                .end((err, res) => {
                    count = res.body.length;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Test Suite for adding notes
    describe('POST /add-notes', () => {
        it('should return 500 for validation errors', (done) => {
            const invalidData = {
                title: '', // Missing required fields
                description: 'Short',
                priority: 'Low priority'
            };

            chai.request(baseUrl)
                .post('/add-notes')
                .send(invalidData)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.a('string'); // Flexible validation
                    done();
                });
        });

        it('should add a new noteId', (done) => {
            const validData = {
                title: 'Test notes',
                description: 'A short description',
                priority: 'low priority'
            };

            chai.request(baseUrl)
                .post('/add-notes')
                .send(validData)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(count + 1);
                    noteId = res.body[res.body.length - 1].id; // Store the ID of the newly added note
                    done();
                });
        });
    });


    // Test Suite for editing notes
    describe('PUT /edit-notes/:id', () => {
        it('should update an existing note', (done) => {
            const updatedData = {
                title: 'update notes',
                description: 'A short description',
                priority: 'low priority'
            };

            chai.request(baseUrl)
                .put(`/edit-notes/${noteId}`)
                .send(updatedData)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'Note Updated successfully!');
                    done();
                });
        });
    });


    // Test Suite for deleting notes
    describe('DELETE /delete-notes/:id', () => {
        it('should delete an existing note', (done) => {
            chai.request(baseUrl)
                .delete(`/delete-notes/${noteId}`)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'note deleted successfully!');
                    done();
                });
        });

    });

});