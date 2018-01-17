import React, { Component } from 'react';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        open: false
    }
  }

  showPanel = () => {
      this.setState({ open: !this.state.open });
  }

  render() {
    return (
        <div>
            {   
                this.props.showPanel ? 
                    <a className="btn btn-default submit-btn" onClick={this.showPanel}>
                        { this.state.open ?
                        "Close Admin Panel" :
                        "Admin Panel"
                        }
                    </a> :
                <div></div>
            }
            {
                this.state.open ?
                <div className="admin-panel">BLAH</div>
                : <div></div>
            }
        </div>
    );
  }
}

module.exports = AdminPanel;