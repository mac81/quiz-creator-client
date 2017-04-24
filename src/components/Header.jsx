import React from 'react';
import {AppBar} from 'material-ui';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <AppBar
          title="Quiz Creator"
        />
      </header>
    );
  }
}

export default Header;