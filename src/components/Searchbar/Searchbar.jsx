import { PropTypes } from 'prop-types';
import { SearchbarContainer } from './Searchbar.styled';
import { SearchbarForm } from 'components/SearchbarForm';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarContainer>
      <SearchbarForm onSubmit={onSubmit} />
    </SearchbarContainer>
  );
};

Searchbar.propTypes = {
  onSumbit: PropTypes.func,
};
