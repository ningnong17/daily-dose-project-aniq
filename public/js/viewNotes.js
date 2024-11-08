function viewNotes(priorityLevel = "all") {
    var request = new XMLHttpRequest();
    request.open('GET', '/view-notes', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        var html = '';

        for (var i = 0; i < response.length; i++) {
            if (priorityLevel === "all" || response[i].priority === priorityLevel) {
                html += `
                    <div class="col-md-4">
                        <div class="note-card">
                            <h3 class="note-title">${response[i].title}</h3>
                            <p class="note-description">${response[i].description}</p>
                            <span class="note-priority ${response[i].priority}">
                                ${response[i].priority.replace("-", " ").toUpperCase()}
                            </span>
                            <button type="button" class="btn btn-sm btn-warning" onclick="editNote('${encodeURIComponent(JSON.stringify(response[i]))}')"><span class="material-icons">edit</span></button>
                            <button class="btn btn-sm btn-danger" onclick="deleteNotes(${response[i].id})"><span class="material-icons">delete</span></button>
                        </div>
                    </div>
                `;
            }
        }

        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
};

// Function to get selected priority and filter notes
function filterNotes() {
    var selectedPriority = document.getElementById("priorityFilter").value;
    viewNotes(selectedPriority);
};