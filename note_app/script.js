
let editIndex = null;

document.addEventListener('DOMContentLoaded', loadNotes);

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
    
    if (noteText === '') {
    alert('Please write something before adding a note.');
    return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    noteInput.value = '';
    renderNotes();
}

function renderNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('noteList');
    
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center bg-light';
    li.textContent = note;
    li.onclick = () => openModal(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="bx bx-trash"></i>';
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.onclick = (event) => {
        event.stopPropagation();
        deleteNote(index);
    };

    li.appendChild(deleteBtn);
    noteList.appendChild(li);
    });
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function clearAllNotes() {
    if (confirm('Are you sure you want to delete all notes?')) {
    localStorage.removeItem('notes');
    renderNotes();
    }
}

function loadNotes() {
    renderNotes();
}

function openModal(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    editIndex = index;
    const note = notes[index];

    const modalTextarea = document.getElementById('modalTextarea');
    modalTextarea.value = note;

    const noteModal = new bootstrap.Modal(document.getElementById('noteModal'));
    noteModal.show();
}

function saveEditedNote() {
    const modalTextarea = document.getElementById('modalTextarea');
    const updatedNote = modalTextarea.value.trim();

    if (updatedNote === '') {
    alert('Note cannot be empty.');
    return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[editIndex] = updatedNote;
    localStorage.setItem('notes', JSON.stringify(notes));

    const noteModal = bootstrap.Modal.getInstance(document.getElementById('noteModal'));
    noteModal.hide();

    renderNotes();
}