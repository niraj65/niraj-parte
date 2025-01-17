function addNote(){
    let note_input = document.getElementById('noteInput');
    let note_text = note_input.value.trim()

    if(note_text == ''){
        alert('Please write something in the note!');
        return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note_text);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    renderNotes();
    note_input.value = '';
}

function renderNotes(){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    let nodeList = document.getElementById('noteList');
    nodeList.innerHTML = '';

    for(let x of notes){
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center bg-light';
        li.textContent = x;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => deleteNote(notes.indexOf(x));

        li.appendChild(deleteBtn);
        nodeList.appendChild(li);
    }
}

function deleteNote(note_index){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(note_index, 1);
    localStorage.setItem('notes',JSON.stringify(notes));
    renderNotes();
}

function clearAllNotes(){
    if(confirm('Are you sure you wanna delete all notes!')){
        localStorage.removeItem('notes');
        renderNotes();
    }
}