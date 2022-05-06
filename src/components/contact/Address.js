import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import { Row, Col } from "react-bootstrap";
import SubHeading from "../layout/SubHeading";
import logoContact from "../../assets/logo_contact.png";

export default function Adress(props) {
	return (
		<>
			<Row>
				<Col sm className="mb-2">
					<SubHeading subtitle="Holidaze-Bergen" />
				</Col>
			</Row>
			<Row>
				<Col md={12} className="mb-2">
					<h6>
						<FaMapMarkerAlt className="icon" />
						Street: Stasjonsvegen 35
					</h6>
				</Col>
				<Col md={12} className="mb-2">
					<h6>
						<FaPhone className="icon" />
						+47 484 60007
					</h6>
				</Col>
				<Col md={12} className="mb-2">
					<h6>
						<SiMaildotru className="icon" />
						contact@holidaze-bergen.no
					</h6>
				</Col>
				<Col md={12} className="mb-2">
					<img
						src={logoContact}
						alt="Holidaze-Bergen"
						className="contact__logo"
					/>
				</Col>
			</Row>
		</>
	);
}
