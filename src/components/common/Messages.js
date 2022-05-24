import PropTypes from "prop-types";
import { Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

export default function Messages({ children }) {
	return (
		<>
			<Row>
				<Col sm={12}>
					<Alert variant="success">{children}</Alert>
				</Col>
				<Col sm={12} className="text-center">
					<Link to="/">
						<HiHome />
						Back to Home
					</Link>
				</Col>
			</Row>
		</>
	);
}

Messages.propTypes = {
	children: PropTypes.string.isRequired,
};
