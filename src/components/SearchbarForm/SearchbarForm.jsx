import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PropTypes } from 'prop-types';
import {
  SearchForm,
  SearchButton,
  SearchFormButtonLabel,
  SearchInput,
} from './SearchbarForm.styled';

export class SearchbarForm extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return Notify.warning('Please, enter text to search');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchForm onSubmit={this.handleSubmit}>
        <SearchButton type="sumbit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchButton>

        <SearchInput
          name="searchQuery"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
      </SearchForm>
    );
  }
}

SearchbarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
