import PropTypes from "prop-types";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Messages from "../../common/Messages";
import logoHolidaze from "../../../assets/logo_contact.png";

export default function ThankyouPage() {
	return (
		<>
			<Container className="container__content">
				<Breadcrumb>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
					<Breadcrumb.Item href="/hotel">Hotels</Breadcrumb.Item>
				</Breadcrumb>
				<Row md={4}>
					<Col md={{ span: 6, offset: 3 }}>
						<Messages>
							Thank you for your enquiry. We will get back to you
							soon.
						</Messages>
					</Col>
				</Row>
				<Row className="text-center">
					<Col md={{ span: 6, offset: 3 }}>
						<img
							src={logoHolidaze}
							alt="Holidaze-Bergen"
							className="contact__logo"
						/>
					</Col>
				</Row>

				<Row>
					<Col className="text-center">
						<Link to="/hotel"> Back to Hotels Pages</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
}

ThankyouPage.propTypes = { Message: PropTypes.string };
