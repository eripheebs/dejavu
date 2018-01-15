//This contains the extra features like
//Import data, Export Data, Add document, Pretty Json
var React = require('react');
import { Tabs, Tab, Glyphicon } from 'react-bootstrap';
var TypeTable = require('./TypeTable.js');
var QueryList= require('./QueryList/index.js');
var ImporterSidebar = require('./features/ImporterSidebar.js');

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
		this.hideOrShow = this.hideOrShow.bind(this);
	}

	hideOrShow() {
		this.setState({ open: !this.state.open });
		this.props.hideOrShowSidebar();
	}

	render() {
		if (this.state.open) {
			var glyphicon = <Glyphicon glyph="chevron-left"></Glyphicon>
		} else {
			var glyphicon = <Glyphicon glyph="chevron-right"></Glyphicon>
		}

		return (
			<div id="dejavu-sidebar" className={this.state.open ? "open" : "closed"}>
				<Tabs defaultActiveKey={1} id="sidebar-block">
					<Tab 
						eventKey={1} 
						title="Types">
						<TypeTable {...this.props.typeProps} />
					</Tab>
					<Tab 
						eventKey={2} 
						title="Queries">
						<QueryList {...this.props.queryProps} />
					</Tab>
				</Tabs>
				<div onClick={this.hideOrShow}>{glyphicon}</div>
			</div>
		);
	}
}

module.exports = Sidebar;