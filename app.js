// Simple Notes App
class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.noteInput = document.getElementById('noteInput');
        this.addNoteBtn = document.getElementById('addNoteBtn');
        this.notesList = document.getElementById('notesList');

        this.init();
    }

    init() {
        this.addNoteBtn.addEventListener('click', () => this.addNote());
        this.noteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNote();
            }
        });

        this.renderNotes();

        // Register service worker for offline functionality
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    addNote() {
        const noteText = this.noteInput.value.trim();
        if (noteText) {
            const note = {
                id: Date.now(),
                text: noteText,
                timestamp: new Date().toLocaleString()
            };

            this.notes.unshift(note); // Add to beginning
            this.saveNotes();
            this.renderNotes();
            this.noteInput.value = '';
        }
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    renderNotes() {
        this.notesList.innerHTML = '';

        if (this.notes.length === 0) {
            this.notesList.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">No notes yet. Add your first note above!</p>';
            return;
        }

        this.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <div>${note.text}</div>
                <small style="color: #666; margin-top: 5px; display: block;">${note.timestamp}</small>
                <button class="delete-btn" onclick="app.deleteNote(${note.id})">×</button>
            `;
            this.notesList.appendChild(noteElement);
        });
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }
}

// Initialize the app
const app = new NotesApp();