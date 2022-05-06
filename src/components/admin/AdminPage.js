import PropTypes from "prop-types";
import SubHeading from "../layout/SubHeading";
import { AdminMenu } from "./AdminMenu";
import { Container, Row, Col } from "react-bootstrap";
import SubTitle from "../layout/SubTitle";
import Holidaze from "../../assets/logo.svg";

export default function AdminPage({ children }) {
	return (
		<>
			<Container className="container__content">
				<SubHeading subtitle="Admin Panel" />

				<Row className="justify-content-md-center">
					<AdminMenu />
				</Row>

				{children ? (
					children
				) : (
					<Row>
						<Col sm className="mt-5 text-center">
							<SubTitle subtitle="Welcome to Admin panel of Holidaze Hotel Booking" />
							<img
								src={Holidaze}
								alt="Holidaze Panel"
								className="admin__logo"
							/>
						</Col>
					</Row>
				)}
			</Container>
		</>
	);
}

AdminPage.propTypes = {
	children: PropTypes.node,
};
