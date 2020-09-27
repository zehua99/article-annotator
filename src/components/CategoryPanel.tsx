import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoryList } from '../socket';
import { StateType } from '../store';

const mapStateToProps = (state: StateType) => ({
  categories: state.utils.categories,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class CategoryPanel extends React.Component<PropsFromRedux> {
  componentDidMount() {
    fetchCategoryList();
  }

  render() {
    return (
      <div className="category-panel">
        {this.props.categories.map(category => (
          <Link
            to={`/${category}`}
            key={category}
            className="category-card">
            {category}
          </Link>
        ))}
      </div>
    );
  }
}

export default connector(CategoryPanel);
