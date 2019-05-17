import React from 'react';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.outerStyle = {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			overflow: "auto",
			zIndex: 1
		};

		this.style = {
			modal: {
				position: "relative",
				width: 700,
				borderRadius: 3,
				boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
				boxSizing: "border-box",
				padding: 20,
				textAlign: "left",
				backgroundColor: "#fff",
				margin: "40px auto",
				zIndex: 2,
				...this.props.style.modal
			},
			overlay: {
				position: "fixed",
				width: "100%",
				height: "100%",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: "rgba(0,0,0,0.5)",
				...this.props.style.overlay
			}
		};
	}

	render() {
		return (
			<div
				style={{
					...this.outerStyle,
					display: this.props.isModalOpen ? "block" : "none"
				}}
			>
				<div style={this.style.overlay} onClick={this.props.closeModal} />
				<div onClick={this.props.closeModal} />
				<div style={this.style.modal}>{this.props.children}</div>
			</div>
		);
	}
}

export default Modal;