import { Spinner, Row, Col } from "react-bootstrap";

export default function Loader() {
	return (
		<Row className="align-items-center">
			<Col>
				<div className="spinner__container">
					<Spinner animation="grow" variant="primary" />
					<Spinner animation="grow" variant="danger" />
					<Spinner animation="grow" variant="warning" />
				</div>
			</Col>
		</Row>
	);
}
