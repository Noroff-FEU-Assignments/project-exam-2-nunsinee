import PropTypes from "prop-types";
import { Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

export default function ErrorMessage({ message }) {
	return (
		<>
			<Row>
				<Col sm={12}>
					<Alert variant="danger" className="alert-danger--error">
						{message}
					</Alert>
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

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
};

ErrorMessage.defaultProps = {
	message: "Something went wrong! Please try again later",
};
