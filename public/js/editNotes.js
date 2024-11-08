
// //edit notes js //* gab/
// Function to handle the edit note action
function editNote(encodedNote) {
    // Parse the encoded note data
    const note = JSON.parse(decodeURIComponent(encodedNote));

    // Populate the edit modal with existing note data
    document.getElementById("editTitle").value = note.title;
    document.getElementById("editDescription").value = note.description;
    document.getElementById("editPriority").value = note.priority;

    // Set the update button's onclick event to update this specific note
    document.getElementById("updateButton").onclick = function () {
        updateNote(note.id);
    };

    // Show the modal
    $('#editResourceModal').modal('show');
}



// Function to update the note
function updateNote(noteId) {
    // Get updated values from the form
    const updatedTitle = document.getElementById("editTitle").value;
    const updatedDescription = document.getElementById("editDescription").value;
    const updatedPriority = document.getElementById("editPriority").value;

    const updatedNote = {
        title: updatedTitle,
        description: updatedDescription,
        priority: updatedPriority,
    };

    // Send a PUT request to update the note
    const request = new XMLHttpRequest();
    request.open('PUT', '/edit-notes/' + noteId, true); // Updated the URL to include the noteId
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function () {
        // Handle success based on different status codes
        if (request.status === 200 || request.status === 201) {  // Accept 200 and 201 as success
            // Refresh notes list and close modal
            viewNotes();
            $('#editResourceModal').modal('hide');
            console.log("Successfully Updated the Note !");  // Use console.log for success
            alert("Note has been Updated!")
        } else {
            // Log the error message or status code
            console.error("Failed to update note. Status:", request.status, "Response:", request.responseText);
        }
    };
    
    // Handle network or other errors that might occur
    request.onerror = function() {
        console.error("Network error occurred while updating the note.");
    };

    // Send the request
    request.send(JSON.stringify(updatedNote));
}
