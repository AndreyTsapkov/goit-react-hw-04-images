import { PropTypes } from 'prop-types';
import { Button } from './Button.styled';

export const LoadMore = ({ onClick }) => {
  <Button type="button" onClick={onClick}>
    Load More
  </Button>;
};

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
