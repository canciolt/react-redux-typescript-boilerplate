import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { userLogoutAction, userLoginAction } from 'store/actions/actions';
import { AppState } from 'store/types/types';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { appUtils } from 'utils/utils';


const mapStateToProps = (state: AppState) => state.auth;

const connector = connect(mapStateToProps, { userLogoutAction, userLoginAction });

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RouteComponentProps

class UINav extends React.Component<Props, any> {

  redirectUrl: string = '';
  keyParams: string = 'redirect';

  constructor(props: any) {
    super(props);
    this.state = {
      loginForm: false,
      username: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>): void {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      if (this.props.loggedIn) {
        const urlParam = appUtils.getUrl(this.props.location.search, this.keyParams);
        if (urlParam.length > 0) {
          this.redirectUrl = urlParam[1].toString();
        }
        this.props.history.push(this.redirectUrl);
      }
    }
  }

  handleLoginMenu = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  logout = () => {
    if (this.props.loggedIn) {
      this.props.userLogoutAction();
      this.setState({ loginForm: false });
      this.redirectUrl = '/';
      this.props.history.push(this.redirectUrl);
    }
  };

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
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top' role='navigation'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>ReactApp</Link>
          <button className='navbar-toggler border-0' type='button' data-toggle='collapse'
                  data-target='#exCollapsingNavbar'>
            &#9776;
          </button>
          <div className='collapse navbar-collapse' id='exCollapsingNavbar'>
            <ul className='nav navbar-nav'>
              <li className='nav-item'><Link to='/' className='nav-link'>Home</Link></li>
              <li className='nav-item'><Link to='/users' className='nav-link'>Users</Link></li>
            </ul>
            <ul className='nav navbar-nav flex-row justify-content-between ml-auto'>
              {(!this.props.loggedIn) ? <li className={`dropdown order-1${this.state.loginForm ? ' show' : ''}`}>
                <button type='button' id='dropdownMenu1' data-toggle='dropdown'
                        className='btn btn-outline-secondary dropdown-toggle' onClick={this.handleLoginMenu}>Login <span
                  className='caret'></span>
                </button>
                <ul className={`dropdown-menu dropdown-menu-right mt-2${this.state.loginForm ? ' show' : ''}`}>
                  <li className='px-3 py-2'>
                    <form className='form' role='form' onSubmit={this.handleSubmit}>
                      <div className='form-group'>
                        <input name='username' placeholder='Username' className='form-control form-control-sm'
                               type='text' required onChange={this.onChange}/>
                      </div>
                      <div className='form-group'>
                        <input name='password' placeholder='Password' className='form-control form-control-sm'
                               type='password' required onChange={this.onChange}/>
                      </div>
                      <div className='form-group'>
                        <button type='submit' className='btn btn-primary btn-block'>Login</button>
                      </div>
                    </form>
                  </li>
                </ul>
              </li> : <button type='button' className='btn btn-outline-secondary' onClick={this.logout}>Logout</button>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connector(withRouter(UINav));
