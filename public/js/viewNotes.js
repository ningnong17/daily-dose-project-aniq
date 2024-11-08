function viewNotes() {
    var request = new XMLHttpRequest();
    request.open('GET', '/view-notes', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        var html = '';

        for (var i = 0; i < response.length; i++) {
            html += `
    
                    <div class="note-card">
                        <h3 class="note-title">${response[i].title}</h3>
                        <span class="note-description">${response[i].description}</span>
                        <span class="note-priority ${response[i].priority}">
                            ${response[i].priority.replace("-", " ").toUpperCase()}
                        </span>
                        <div class="note-buttons">
                         <button type="button" class="btn btn-sm btn-warning" onclick="editNote('${encodeURIComponent(JSON.stringify(response[i]))}')">Edit</button>
                         <button class="btn btn-sm btn-danger" onclick="deleteNotes(${response[i].id})">Delete</button>
                         </div>
                    </div>
            `;
        }

        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}
