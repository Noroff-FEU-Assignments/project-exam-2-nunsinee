import { Spinner, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Loader() {
	return (
		<Row className="align-items-center space__top">
			<Col>
				<div className="spinner__container ">
					<Spinner animation="grow" variant="primary" />
					<Spinner animation="grow" variant="danger" />
					<Spinner animation="grow" variant="warning" />
				</div>
			</Col>
		</Row>
	);
}

Loader.propTypes = {
	Spinner: PropTypes.node,
};
