import React from 'react';

class HeaderBar extends React.Component {

  render() {
    return(
      <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
        <div className="mdl-layout--large-screen-only mdl-layout__header-row">
        </div>
        <div className="mdl-layout--large-screen-only mdl-layout__header-row">
          <h3>Audio Recorder <br/><small>With Server Uploading Support</small></h3>
        </div>
        <div className="mdl-layout--large-screen-only mdl-layout__header-row">
        </div>
      </header>
    );
  }
}

export default HeaderBar;
