import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';
import createBrowswerHistory from '../history';
import AddNote from '../AddNote/AddNote';
import config from '../config';
import './App.css';

class App extends Component {


  state = {
    notes: [],
    folders: []
  };

  //two .then one is converting the response to a json string
  //second dot then will have a json object which is the folder, you can then add to an array

  history = createBrowswerHistory;
  date = new Date();

  addFolder = folder => {
    axios
      .post(`${config.API_ENDPOINT}/folders`, {
        name: JSON.stringify(folder)
      })

      .then(this.setState({ folders: [...this.state.folders, folder] }))
      .catch(function (error) {
        console.log(error);
      });
    this.history.goBack();
  };


  addNotes = (name, content, folderId) => {
    console.log(this.props)

    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: name,
        modified: this.date,
        folderId: folderId,
        content: content
      })

    }

    )
    this.history.goBack();
  }


  // addFolder = (folder) => {

  //   fetch('http://localhost:9090/folder', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(folder)

  //   })

  // }

  getFoldersAndNotes = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });

  }

  componentDidUpdate(prevState) {

    if (prevState.folders !== this.state.folders && prevState.notes !== this.state.notes) {
      this.getFoldersAndNotes();
    }
  }


  componentDidMount() {
    this.getFoldersAndNotes();
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path='/note/:noteId' component={NotePageNav} />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note/folder/:folderId/addNote' component={AddNote} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path='/note/:noteId' component={NotePageMain} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNotes: this.addNotes
    };
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
