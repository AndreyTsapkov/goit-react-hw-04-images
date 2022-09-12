import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PropTypes } from 'prop-types';
import {
  SearchForm,
  SearchButton,
  SearchFormButtonLabel,
  SearchInput,
} from './SearchbarForm.styled';

export const SearchbarForm = ({ onSubmit }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return Notify.warning('Please, enter text to search');
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchButton type="sumbit">
        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
      </SearchButton>

      <SearchInput
        name="searchQuery"
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </SearchForm>
  );
};

SearchbarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
