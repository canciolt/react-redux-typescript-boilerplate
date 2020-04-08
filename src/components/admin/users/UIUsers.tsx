import React from 'react';
import { AppState } from 'store/types/types';
import { userListAction, userDelAction, userDetailAction, userDetailDelAction } from 'store/actions/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { UIModal } from 'components/shared/UIModal';
import { ExtendUser } from 'interfaces/interfaces';
import { appUtils } from 'utils/utils';

const mapStateToProps = (state: AppState) => {
  return {
    users: state.user.list,
    detail: state.user.detail,
  };
};

const connector = connect(mapStateToProps,
  {
    userListAction,
    userDelAction,
    userDetailAction,
    userDetailDelAction,
  });

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RouteComponentProps

class UIUsers extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      detail: '',
    };
  }

  componentDidMount(): void {
    this.props.userListAction();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
    if (this.props.detail && !prevProps.detail) {
      this.setState({
        detail: this.renderBodyContent(this.props.detail),
      });
      this.setState({ modal: true });
    }
  }

  renderBodyContent = (content: ExtendUser) => {
    if (content) {
      return `<ul class='list-group list-group-flush'>
                <li class='list-group-item'><h6>Name:</h6> ${content.first_name}</li>
                <li class='list-group-item'><h6>Email:</h6> ${content.email}</li>
                <li class='list-group-item'><h6>Last login:</h6> ${content.last_login}</li>
                <li class='list-group-item'><h6>Active:</h6> ${(content.is_active) ? `<i class='fa fa-toggle-on text-success'></i>` : `<i class='fa fa-toggle-off text-danger'></i>`}</li>
                <li class='list-group-item'><h6>Admin:</h6> ${(content.is_superuser) ? `<i class='fa fa-shield text-success'></i>` : `<i class='fa fa-shield text-danger'></i>`}</li>
            </ul>`;
    } else {
      return null;
    }

  };

  closeModal = () => {
    this.setState({ modal: false });
    this.props.userDetailDelAction();
  };


  handleDelete = (event: any) => {
    event.preventDefault();
    if (confirm('Are you sure to delete the user ?')) {
      this.props.userDelAction(event.target.id);
    }
  };

  handleDetail = (event: any) => {
    event.preventDefault();
    this.props.userDetailAction(event.target.id);
  };

  render() {
    return (
      <>
        <div className='card'>
          <h3 className='card-header text-center font-weight-bold text-uppercase py-4'>Users</h3>
          <div className='card-body'>
            <div id='table' className='table-editable'>
      <span className='table-add float-right mb-3 mr-2'>
      </span>
              <table className='table table-bordered table-responsive-md table-striped text-center'>
                <thead>
                <tr>
                  <th className='text-center'>Username</th>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>Email</th>
                  <th className='text-center'>Options</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map((user) =>
                  <tr key={user.username}>
                    <td className='pt-3-half'>{user.username}</td>
                    <td className='pt-3-half'>{user.first_name}</td>
                    <td className='pt-3-half'>{user.email}</td>
                    <td>
                      <a href='#' className='text-danger'>
                        <i id={user.id} className='fa fa-minus-square' aria-hidden='true'
                           onClick={this.handleDelete}></i>
                      </a>
                      <a href='#' className='text-success ml-2'>
                        <i id={user.id} className='fa fa-eye' aria-hidden='true' onClick={this.handleDetail}></i>
                      </a>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <UIModal show={this.state.modal}
                 title={`User: ${(this.props.detail) ? appUtils.setFirstUpperCase(this.props.detail.username) : ''}`}
                 body={this.state.detail}
                 backdrop={true}
                 closeHandler={this.closeModal}/>
      </>
    );
  }
}

export default connector(withRouter(UIUsers));

