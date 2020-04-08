import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { appErrorDelAction } from 'store/actions/actions'
import { AppState } from 'store/types/types';


const mapStateToProps = (state: AppState) => {
  return { error: state.error };
};
const connector = connect(mapStateToProps, { appErrorDelAction });
type Props = ConnectedProps<typeof connector>

class UIError extends React.Component<Props, any> {
  state = {
    showError: false,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
    if (this.props.error.detail && !this.state.showError && !prevProps.error.detail) {
      this.setState({ showError: true });
      setTimeout(() => {
        this.setState({ showError: false });
        setTimeout(() => this.props.appErrorDelAction(), 300);
      }, 3000);
    }
  }

  handleError = (event: any) => {
    event.preventDefault();
    this.setState({ showError: false });
    setTimeout(() => this.props.appErrorDelAction(), 200);
  };

  render() {
    if (this.props.error) {
      return (
        <div
          className={`alert alert-${this.props.error.type} alert-dismissible fade${this.state.showError ? ' show' : ''}`}
          role='alert'>
          {this.props.error.detail}
          <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={this.handleError}>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>);
    }
    return '';
  }
}

export default connector(UIError);
