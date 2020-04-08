import React from 'react';

interface ModalProps {
  show: boolean;
  title: string;
  backdrop?: boolean;
  closeHandler: any;
  body: any;
}

export class UIModal extends React.Component<ModalProps, any> {

  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    if (this.props.show) {
      return (
        <>
          <div className={`modal${this.props.show ? ' fade show' : ''}`}
               style={{ paddingRight: '16px', display: 'block' }}>
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>{this.props.title}</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'
                          onClick={this.props.closeHandler}>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body' dangerouslySetInnerHTML={{ __html: this.props.body }}></div>
              </div>
            </div>
          </div>
          {(this.props.backdrop && this.props.show) ? <div className='modal-backdrop fade show'></div> : ''}
        </>
      );
    } else {
      return null;
    }
  }
}
