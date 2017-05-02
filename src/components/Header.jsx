import React from 'react';

import {AppBar} from 'material-ui';
import AccountDropdown from 'components/AccountDropdown';

class Header extends React.Component {

  render() {

    return (
      <header className="header">
        <AppBar
          title="Quiz Creator"
        />
        <AccountDropdown />
      </header>
    );
  }
}

export default Header;