import React from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import '../Styles/AddFolder.css';

class AddFolder extends React.Component {
  static contextType = ApiContext;

  state = { value: '' };

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault(e);
    this.context.addFolder(this.state.value);
  };

  render() {

    return (
      <>
        <form className="folder-form" onSubmit={this.handleSubmit}>
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
          <button className="addFolder-btn" type='submit'>Submit New Folder</button>
        </form>
      </>
    );
  }
}

AddFolder.propTypes = {

  value: PropTypes.string.isRequired

}

export default AddFolder;
