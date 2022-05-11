import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

export default function AlertMessage({ message }) {
	return <Alert variant="danger">Please select an image</Alert>;
}

AlertMessage.propTypes = {
	message: PropTypes.string.isRequired,
};
