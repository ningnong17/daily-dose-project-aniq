function viewNotes() {
    var request = new XMLHttpRequest();
    request.open('GET', '/view-notes', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        var html = '';

        for (var i = 0; i < response.length; i++) {
            html += `
                    <div class="col-md-4 mt-4">
                    <div class="note-card">
                        <h3 class="note-title">${response[i].title}</h3>
                        <p class="note-description">${response[i].description}</p>
                        <span class="note-priority ${response[i].priority}">
                            ${response[i].priority.replace("-", " ").toUpperCase()}
                        </span>
                        <button class="btn btn-sm btn-danger mt-3" onclick="deleteNotes(${response[i].id})">Delete</button>
                    </div>
                </div>
            `;
        }

        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}
