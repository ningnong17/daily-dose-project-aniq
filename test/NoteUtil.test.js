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
        it('ask to select priority status', (done) => {
            chai.request(baseUrl)
                .post('/add-notes')
                .send({ title: 'Test note', description: 'test', priority: '' })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Please select a priority status');
                    done();
                });
        });

        it('should ask to add tittle', (done) => {
            chai.request(baseUrl)
                .post('/add-notes')
                .send({ title: '', description: 'test', priority: 'low-priority' })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Please enter a title');
                    done();
                });
        });

        it('should should ask add description', (done) => {
            chai.request(baseUrl)
                .post('/add-notes')
                .send({ title: 'Test note', description: '', priority: 'low-priority' })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Please enter more than 1 character');
                    done();
                });
        });

        it('should add a new note', (done) => {
            chai.request(baseUrl)
                .post('/add-notes')
                .send({ title: 'Test note', description: 'test', priority: 'low-priority' })
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

        it('it should send an error that cannot be modified', (done) => {
            chai.request(baseUrl)
                .put(`/edit-notes/3`)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Error occurred, unable to modify!');
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

        it('should return an 500 error', (done) => {
            chai.request(baseUrl)
                .delete(`/delete-notes/${noteId}`)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message', 'Error occurred, unable to delete!');
                    done();
                });
        });
    });

});