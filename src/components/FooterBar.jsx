import React from 'react';

class FooterBar extends React.Component {
  render() {
    return(
      <footer className="mdl-mega-footer">
        <div className="mdl-mega-footer--middle-section">
          <div className="mdl-mega-footer--drop-down-section">
            <input className="mdl-mega-footer--heading-checkbox" type="checkbox" defaultChecked />
            <h1 className="mdl-mega-footer--heading">Features</h1>
            <ul className="mdl-mega-footer--link-list">
              <li><a href="#">About</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Updates</a></li>
            </ul>
          </div>
          <div className="mdl-mega-footer--drop-down-section">
            <input className="mdl-mega-footer--heading-checkbox" type="checkbox" defaultChecked />
            <h1 className="mdl-mega-footer--heading">Details</h1>
            <ul className="mdl-mega-footer--link-list">
              <li><a href="#">Spec</a></li>
              <li><a href="#">Tools</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>
          <div className="mdl-mega-footer--drop-down-section">
            <input className="mdl-mega-footer--heading-checkbox" type="checkbox" defaultChecked />
            <h1 className="mdl-mega-footer--heading">Technology</h1>
            <ul className="mdl-mega-footer--link-list">
              <li><a href="#">How it works</a></li>
              <li><a href="#">Patterns</a></li>
              <li><a href="#">Usage</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Contracts</a></li>
            </ul>
          </div>
          <div className="mdl-mega-footer--drop-down-section">
            <input className="mdl-mega-footer--heading-checkbox" type="checkbox" defaultChecked />
            <h1 className="mdl-mega-footer--heading">FAQ</h1>
            <ul className="mdl-mega-footer--link-list">
              <li><a href="#">Questions</a></li>
              <li><a href="#">Answers</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div className="mdl-mega-footer--bottom-section">
          <div className="mdl-logo">
            More Information
          </div>
          <ul className="mdl-mega-footer--link-list">
            <li><a href="http://studentivan.ru" target="_blank">StudentIvan</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy and Terms</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default FooterBar;
