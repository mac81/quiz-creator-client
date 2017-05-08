import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  render() {
    return (
      <div>
        Landing page
        <br/>
        <Link to="/signin">Sign in</Link>
        <br/>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
}

export default Home;
