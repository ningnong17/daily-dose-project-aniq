function deleteNotes(selectedId) {
    var response = "";

    var request = new XMLHttpRequest();

    request.open("DELETE", "/delete-notes/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function () {
        response = JSON.parse(request.responseText);
    
        if (response.message == "note deleted successfully!") {
            alert('Note has been deleted!');
            window.location.href = 'index.html';
        }
        else {
            alert('Unable to delete Note!');
        }
    };

    request.send();
}