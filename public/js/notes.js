function addNotes() {
    var response = "";
    var jsonData = new Object();
    jsonData.title = document.getElementById("title").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.priority = document.getElementById("priority").value;
    if (jsonData.title == "" || jsonData.description == "" || jsonData.priority == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/add-notes", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Notes: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("priority").value = "";
            window.location.href = 'index.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add notes!';
            document.getElementById("message").setAttribute("class", "textdanger");
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}

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
                        <button class="btn btn-sm btn-danger mt-3" onclick="deleteNote(${response[i].id})">Delete</button>
                    </div>
                </div>
            `;
        }

        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}

