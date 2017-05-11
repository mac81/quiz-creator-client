import React from 'react';

//import {AppBar} from 'material-ui';
import AccountDropdown from 'components/AccountDropdown';

class Header extends React.Component {

  render() {

    return (
      <header className="header">
        <h2 className="header-title">Quiz Creator</h2>
        {/*<AppBar*/}
          {/*className="header-bar"*/}
          {/*title="Quiz Creator"*/}
          {/*showMenuIconButton={false}*/}
        {/*/>*/}
        <AccountDropdown />
      </header>
    );
  }
}

export default Header;