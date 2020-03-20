import React from 'react';
import ApiContext from '../ApiContext';

class AddFolder extends React.Component {
  static contextType = ApiContext;

  state = { value: '' };

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault(e);
    this.context.addFolder(this.state.value);
  };

  render() {
    console.log(this.context);

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='newFolder'>Name of New Folder</label>
          <input
            required
            minLength='1'
            maxLength='15'
            id='newFolder'
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit New Folder</button>
        </form>
        {/* {JSON.stringify(this.state.value)} */}
      </>
    );
  }
}

export default AddFolder;
