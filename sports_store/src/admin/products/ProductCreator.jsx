import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import ValidatedForm from '../../components/forms/ValidatedForm';
import { STORE_PRODUCT, UPDATE_PRODUCT } from '../clientMutations';

export default class ProductCreator extends Component {
  constructor(props) {
    super(props);
    this.defaultAttrs = { type: 'text', required: true };
    this.formModel = [
      { label: 'Name' }, { label: 'Description' },
      { label: 'Category' },
      { label: 'Price', attrs: { type: 'number' } },
    ];
    this.mutation = STORE_PRODUCT;
    const { mode, product } = this.props;

    if (mode === 'edit') {
      this.mutation = UPDATE_PRODUCT;
      this.formModel = [{ label: 'Id', attrs: { disabled: true } },
        ...this.formModel]
        .map((item) => ({
          ...item,
          attrs: {
            ...item.attrs,
            defaultValue: product[item.label.toLowerCase()],
          },
        }));
    }
  }

  // eslint-disable-next-line react/destructuring-assignment
  navigate = () => this.props.history.push('/admin/products');

  render = () => {
    const { mode } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col bg-dark text-white">
            <div className="navbar-brand">SPORTS STORE</div>
          </div>
        </div>
        <div className="row">
          <div className="col m-2">
            <Mutation mutation={this.mutation}>
              {/* The client prop allows to clear the cached data through its resetStore method.
                * When the navigate function sends the browser back to the product list, a fresh GraphQL
                * will be sent to the server, which ensures that the data is consistently paged and sorted,
                * albeit at the cost of an additional query. */}
              { (saveMutation, { client }) => (
                <ValidatedForm
                  formModel={this.formModel}
                  defaultAttrs={this.defaultAttrs}
                  submitCallback={(data) => {
                    saveMutation({
                      variables: {
                        product: { ...data, price: Number(data.price) },
                      },
                    });
                    if (mode !== 'edit') {
                      client.resetStore();
                    }
                    this.navigate();
                  }}
                  cancelCallback={this.navigate}
                  submitText="Save"
                  cancelText="Cancel"
                />
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  };
}

ProductCreator.defaultProps = {
  mode: '',
  history: {},
};

ProductCreator.propTypes = {
  mode: PropTypes.string,
  product: PropTypes.object.isRequired,
  history: PropTypes.object,
};
