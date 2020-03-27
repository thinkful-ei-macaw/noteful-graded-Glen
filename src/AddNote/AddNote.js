import React from 'react';
import ApiContext from '../ApiContext';
import createBrowswerHistory from '../history';
import PropTypes from 'prop-types';
import '../Styles/AddNote.css';


class AddNote extends React.Component {

    static contextType = ApiContext;
    history = createBrowswerHistory;



    state = {

        name: '',
        modified: '',
        folderId: this.props.match.params.folderId,
        content: ''

    }

    handleSubmit = e => {
        e.preventDefault();
        let folderId = e.target.folders.value
        console.log(this.props.match.params)
        this.context.addNotes(this.state.name, this.state.content, folderId)
    }

    render() {


        return (

            <form className="add-note-form" onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input className="name-input" id="name" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} required />
                <label htmlFor="content">Content</label>
                <textarea id="content" value={this.state.content} onChange={e => this.setState({ content: e.target.value })} required />
                <p>Add Note, or choose from dropdown</p>
                <select name="folders">
                    {this.context.folders.map(folder => <option value={folder.id} selected={this.state.folderId === folder.id}>{folder.name}</option>)}
                </select>
                <button className="note-btn" type="submit">Add New Note</button>
            </form>
        )
    }

}

AddNote.propTypes = {

    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired

}




export default AddNote