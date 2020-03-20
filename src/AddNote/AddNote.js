import React from 'react';
import ApiContext from '../ApiContext';
import createBrowswerHistory from '../history';


class AddNote extends React.Component {

    static contextType = ApiContext;
    history = createBrowswerHistory;




    state = {

        name: '',
        modified: '',
        folderId: '',
        content: ''

    }

    handleSubmit = e => {
        e.preventDefault();
        this.context.addNotes(this.state)

    }

    render() {

        return (

            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                <label htmlFor="content">Content</label>
                <input id="content" value={this.state.content} onChange={e => this.setState({ content: e.target.value })} />
                <button type="submit">Add New Note</button>
            </form>
        )
    }

}




export default AddNote;