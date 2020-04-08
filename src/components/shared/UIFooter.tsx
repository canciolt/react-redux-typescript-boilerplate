import React from 'react';

export class UIFooter extends React.Component<any, any> {
  render() {
    return (
      <footer className='py-5 bg-dark'>
        <div className='container'>
          <p className='m-0 text-center text-white'>Copyright &copy; Your Website 2019</p>
        </div>
      </footer>
    );
  }
}
