import React, { Component } from 'react';
import SearchbarCSS from './Searchbar.module.css';
import PropTypes from 'prop-types';

// const Searchbar = ({ value, onSubmit }) => (
//   <header>
//     <form className={SearchbarCSS.SearchForm}>
//       <button type="submit" className={SearchbarCSS.SearchForm_button}>
//         <span className={SearchbarCSS.SearchForm_button_label}>Search</span>
//       </button>

//       <input
//         className={SearchbarCSS.SearchForm_input}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//         value={onSubmit}
//         onChange={onSubmit}
//       />
//     </form>
//   </header>
// );
export default class Searchbar extends Component {
  state = {
    onSubmit: '',
  };

  handleChange = event => {
    this.setState({ onSubmit: event.currentTarget.value.toLowerCase() });
    console.log(this.state.onSubmit);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.onSubmit);
    this.setState({ onSubmit: '' });
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit} className={SearchbarCSS.SearchForm}>
          <button type="submit" className={SearchbarCSS.SearchForm_button}>
            <span  className={SearchbarCSS.SearchForm_button_label}>Search</span>
          </button>

          <input
            name="query"
            type="text"
            className={SearchbarCSS.SearchForm_input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

