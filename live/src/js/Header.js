var React = require('react');
var SubscribeModal = require('./SubscribeModal.js');

class Header extends React.Component {
	render() {
		var subscribeModal;
		if(!((queryParams && queryParams.hasOwnProperty('subscribe')) || BRANCH === 'master')) {
			subscribeModal = (<SubscribeModal></SubscribeModal>);
		}
		return (
			<header className="header text-center">
				<div className="img-container">
					<span className="header-img-container">
						<img src="assets/img/dd_logo.png" alt="Gem" id="img-large"/>
						<span className="dejavu-title">
							Deloitte Digital - DOS
						</span>
						<span className="dejavu-subtitle">
						</span>
					</span>
				</div>
			</header>
		);
	}
}

module.exports = Header;
