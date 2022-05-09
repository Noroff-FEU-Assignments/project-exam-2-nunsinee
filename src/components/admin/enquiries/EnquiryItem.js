import PropTypes from "prop-types";
import { converTime } from "../../../utils/converTime";
import { Row, Col } from "react-bootstrap";

export default function EnquiryItem({
	refHotelTitle,
	email,
	firstName,
	lastName,
	subject,
	message,
	checkInDate,
	checkOutDate,
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
				<strong>Hotel Ref.: </strong> {refHotelTitle}
			</Col>
			<Col sm>
				<strong>Period</strong>: {converTime(`${checkInDate}`)}
				&nbsp;-&nbsp;
				{converTime(`${checkOutDate}`)}
			</Col>
			<Col sm>
				<strong>Name: </strong> {firstName}-{lastName}
			</Col>
			<Col sm>
				<strong>Subject: </strong> {subject}
			</Col>
			<Col sm>
				<strong>Email: </strong>
				{email}
			</Col>
			<Col sm>
				<strong>Message: </strong>: {message}
				<hr />
			</Col>
		</Row>
	);
}

EnquiryItem.propTypes = {
	id: PropTypes.number,
	refHotelTitle: PropTypes.string,
	subject: PropTypes.string,
	email: PropTypes.string,
	message: PropTypes.string,
	checkInDate: PropTypes.string,
	checkOutDate: PropTypes.string,
	date: PropTypes.string,
};