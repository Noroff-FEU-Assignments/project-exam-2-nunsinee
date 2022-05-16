import { Container, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Footer({ children }) {
	return (
		<>
			<footer>
				<Container>
					<Col>
						<h5>Holidaze-Bergen</h5>
					</Col>
					<Col>Copyright 2022 Holidaze | All rights reserved.</Col>
				</Container>
			</footer>
		</>
	);
}

Footer.propTypes = {
	footer: PropTypes.node,
};
