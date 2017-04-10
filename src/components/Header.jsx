import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div>Logo</div>
        <div>User</div>
        <RaisedButton label="Default" />
      </header>
    );
  }
}

export default Header;