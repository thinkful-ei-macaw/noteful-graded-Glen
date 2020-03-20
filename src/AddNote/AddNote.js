import React from 'react';
import ApiContext from '../ApiContext';
import { withRouter } from 'react-router-dom';
import createBrowswerHistory from '../history';


class AddNote extends React.Component {

    static contextType = ApiContext;
    history = createBrowswerHistory;

    ShowTheLocationWithRouter = withRouter(AddNote);

    state = {

        name: '',
        modified: '',
        folderId: this.props.match.params.folderId,
        content: ''

    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.props.match.params)
        this.context.addNotes(this.state.name, this.state.content, this.state.folderId)
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




export default AddNote