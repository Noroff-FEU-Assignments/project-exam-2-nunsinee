import PropTypes from "prop-types";
import { converTime } from "../../../utils/converTime";
import { Row, Col } from "react-bootstrap";
import DeleteMessageButton from "../delete/DeleteMessageButton";

export default function MessageItem({
	id,
	name,
	email,
	subject,
	message,
	date,
}) {
	return (
		<Row className="message__container">
			<Col sm>
				<time dateTime={date}>
					<strong>Date: </strong> {converTime(`${date}`)}
				</time>
			</Col>
			<Col sm>
				<strong>Name: </strong> {name}
			</Col>
			<Col sm>
				<strong>Subject: </strong> {subject}
			</Col>
			<Col sm>
				<strong>Email: </strong>
				{email}
			</Col>
			<Col sm>
				<strong>Message: </strong> {message}
			</Col>
			<Col sm className="mb-2">
				<hr />
				<DeleteMessageButton id={id} />
			</Col>
		</Row>
	);
}

MessageItem.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	subject: PropTypes.string,
	email: PropTypes.string,
	message: PropTypes.string,
};
