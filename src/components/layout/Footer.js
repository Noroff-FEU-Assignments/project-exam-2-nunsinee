import { Container, Col } from "react-bootstrap";

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
