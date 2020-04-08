import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { userLoginAction } from 'store/actions/actions';
import { AppState } from 'store/types/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const mapStateToProps = (state: AppState) => state.auth;

const connector = connect(mapStateToProps, { userLoginAction });

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RouteComponentProps

class UILogin extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.userLoginAction({
      username: this.state.username,
      password: this.state.password,
    });
  };

  onChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className='container h-100'>
          <div className='row h-100 my-4 justify-content-center align-items-center'>
            <div className='card' style={{ width: '25rem' }}>
              <h4 className='card-header'>Login</h4>
              <div className='card-body'>
                <form method='post' onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label>Email / Usuario</label>
                        <div className='input-group'>
                          <div className='input-group-prepend'>
                              <span className='input-group-text'>
                                <i className='fa fa-envelope-open-o' aria-hidden='true'></i>
                              </span>
                          </div>
                          <input type='text' className='form-control' name='username' title='username' required
                                 onChange={this.onChange}/>
                        </div>
                        <div className='help-block with-errors text-danger'></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label>Contraseña</label>
                        <div className='input-group'>
                          <div className='input-group-prepend'>
                              <span className='input-group-text'>
                                <i className='fa fa-unlock' aria-hidden='true'></i>
                              </span>
                          </div>
                          <input type='password' name='password' className='form-control' title='password' required
                                 onChange={this.onChange}/>
                        </div>
                        <div className='help-block with-errors text-danger'></div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <input type='submit' className='btn btn-primary btn-lg btn-block' value='Login' name='submit'/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>);
    } else {
      return null;
    }
  }
}

export default connector(withRouter(UILogin));
