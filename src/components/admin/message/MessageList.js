import PropTypes from "prop-types";
import AdminPage from "../AdminPage";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../../common/ErrorMessage";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../layout/Loader";
import MessageItem from "./MessageItem";
import Heading from "../../layout/Heading";
import { BASE_URL } from "../../../constants/api";
import { useTitlePage } from "../../../utils/useTitlePage";

export default function MessageList() {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useTitlePage("Message Listing| Admin Panel");

	const http = BASE_URL + "api/contacts";

	useEffect(function () {
		async function getHotels() {
			try {
				const response = await axios.get(http);
				setMessages(response.data.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getHotels();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorMessage message={`Error:${error}`} />;
	}

	return (
		<>
			<AdminPage>
				<Container className="container__content">
					<Row>
						<Col sm className=" mb-3 text-center">
							<Heading title="Messages" />
						</Col>
					</Row>
					<Row className="mb-6">
						{messages.map(function (message) {
							return (
								<Col lg={12} key={message.id}>
									<MessageItem
										key={message.id}
										id={message.id}
										date={message.attributes.createdAt}
										name={message.attributes.name}
										subject={message.attributes.subject}
										email={message.attributes.email}
										message={message.attributes.message}
									/>
								</Col>
							);
						})}
					</Row>
				</Container>
			</AdminPage>
		</>
	);
}

MessageList.propTypes = {
	id: PropTypes.number,
	date: PropTypes.instanceOf(Date),
	name: PropTypes.string,
	subject: PropTypes.string,
	email: PropTypes.string,
	message: PropTypes.string,
};
