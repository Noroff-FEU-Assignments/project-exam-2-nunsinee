import React from "react";
import AdminPage from "../AdminPage";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../../common/ErrorMessage";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../layout/Loader";
import EnquiryItem from "./EnquiryItem";
import { BASE_URL } from "../../../constants/api";
import { useTitlePage } from "../../../utils/useTitlePage";
import Heading from "../../layout/Heading";

export default function EnquiryList() {
	const [enquiries, setEnquiries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useTitlePage("Enquiry Listing| Admin Panel");
	const url = BASE_URL + "api/enquiries";

	useEffect(function () {
		async function getEnquiries() {
			try {
				const response = await axios.get(url);
				setEnquiries(response.data.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getEnquiries();
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
							<Heading title="Enquiries" />
						</Col>
					</Row>
					<Row className="mb-6">
						{enquiries.map(function (enquiry) {
							return (
								<Col lg={12} key={enquiry.id}>
									<EnquiryItem
										key={enquiry.id}
										id={enquiry.id}
										date={enquiry.attributes.createdAt}
										refHotelTitle={
											enquiry.attributes.refHotelTitle
										}
										firstName={enquiry.attributes.firstName}
										lastName={enquiry.attributes.lastName}
										checkInDate={
											enquiry.attributes.checkInDate
										}
										checkOutDate={
											enquiry.attributes.checkOutDate
										}
										subject={enquiry.attributes.subject}
										email={enquiry.attributes.email}
										message={enquiry.attributes.message}
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
