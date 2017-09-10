import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    return (
      <nav className="navbar navbar-fixed-bottom navbar-inverse" style={{height:'55px',  justifyContent: 'center'}}>
        <div className="container">
          <div className="navbar-header">
            <div className='ad'>
              <ins className='adsbygoogle'
                style={{ display: 'inline-block', width: '320px', height: '50px' }}
                data-ad-client='ca-pub-4579566531324968'
                data-ad-slot='8762585411'
                data-ad-format='auto' />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
