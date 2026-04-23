// Simple Notes App
class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.deletedNotes = this.loadDeletedNotes();
        this.noteInput = document.getElementById('noteInput');
        this.addNoteBtn = document.getElementById('addNoteBtn');
        this.notesList = document.getElementById('notesList');
        this.logList = document.getElementById('logList');
        
        // Menu elements
        this.menuBtn = document.getElementById('menuBtn');
        this.menu = document.getElementById('menu');
        this.menuOverlay = document.getElementById('menuOverlay');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.notesView = document.getElementById('notesView');
        this.logView = document.getElementById('logView');

        this.init();
    }

    init() {
        // Add note
        this.addNoteBtn.addEventListener('click', () => this.addNote());
        this.noteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNote();
            }
        });

        // Menu functionality
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        this.menuOverlay.addEventListener('click', () => this.closeMenu());

        // View switching
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.switchView(view);
                this.closeMenu();
            });
        });

        this.renderNotes();
        this.renderLog();

        // Register service worker for offline functionality
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('New version available');
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.menu.classList.toggle('active');
        this.menuOverlay.classList.toggle('active');
    }

    closeMenu() {
        this.menuBtn.classList.remove('active');
        this.menu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
    }

    switchView(view) {
        this.menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });

        if (view === 'notes') {
            this.notesView.classList.add('active');
            this.logView.classList.remove('active');
        } else {
            this.notesView.classList.remove('active');
            this.logView.classList.add('active');
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

            this.notes.unshift(note);
            this.saveNotes();
            this.renderNotes();
            this.noteInput.value = '';
        }
    }

    deleteNote(id) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            const deletedNote = this.notes[noteIndex];
            deletedNote.deletedAt = new Date().toLocaleString();
            this.deletedNotes.unshift(deletedNote);
            this.notes.splice(noteIndex, 1);
            
            this.saveNotes();
            this.saveDeletedNotes();
            this.renderNotes();
            this.renderLog();
        }
    }

    restoreNote(id) {
        const noteIndex = this.deletedNotes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            const restoredNote = this.deletedNotes[noteIndex];
            delete restoredNote.deletedAt;
            this.notes.unshift(restoredNote);
            this.deletedNotes.splice(noteIndex, 1);
            
            this.saveNotes();
            this.saveDeletedNotes();
            this.renderNotes();
            this.renderLog();
        }
    }

    permanentDeleteNote(id) {
        this.deletedNotes = this.deletedNotes.filter(note => note.id !== id);
        this.saveDeletedNotes();
        this.renderLog();
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
                <button class="delete-btn" onclick="app.deleteNote(${note.id})" title="Delete">×</button>
            `;
            this.notesList.appendChild(noteElement);
        });
    }

    renderLog() {
        this.logList.innerHTML = '';

        if (this.deletedNotes.length === 0) {
            this.logList.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">No deleted notes. Deleted notes will appear here.</p>';
            return;
        }

        this.deletedNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note deleted';
            noteElement.innerHTML = `
                <div>${note.text}</div>
                <small style="color: #666; margin-top: 5px; display: block;">Created: ${note.timestamp}</small>
                <small style="color: #f44336; display: block;">Deleted: ${note.deletedAt}</small>
                <button class="restore-btn" onclick="app.restoreNote(${note.id})" title="Restore">↩</button>
                <button class="permanent-delete-btn" onclick="app.permanentDeleteNote(${note.id})" title="Permanently Delete">×</button>
            `;
            this.logList.appendChild(noteElement);
        });
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    saveDeletedNotes() {
        localStorage.setItem('deletedNotes', JSON.stringify(this.deletedNotes));
    }

    loadDeletedNotes() {
        const notes = localStorage.getItem('deletedNotes');
        return notes ? JSON.parse(notes) : [];
    }
}

// Initialize the app
const app = new NotesApp();
