import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import SubHeading from "../layout/SubHeading";
import ContactForm from "./ContactForm";
import Address from "./Address";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { BASE_URL } from "../../constants/api";
import { useTitlePage } from "../../utils/useTitlePage";

export default function Contact() {
	const [banner, setBanner] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useTitlePage("Contact us | Holidaze in Bergen");

	const url = BASE_URL + "api/contactpage?populate=*";

	useEffect(function () {
		async function getBanner() {
			try {
				const response = await axios.get(url);
				setBanner(response.data.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getBanner();
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
			<Container className="container__content">
				<Breadcrumb>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
					<Breadcrumb.Item active>Contact</Breadcrumb.Item>
				</Breadcrumb>
				<Row>
					<Col sm={12}>
						<img
							src={
								banner.attributes.contactBanner.data.attributes
									.url
							}
							alt="contact banner"
							className="image image__contact"
						/>
					</Col>
				</Row>

				<Row>
					<Col sm className="mb-5">
						<Address />
					</Col>
					<Col sm className="text-left">
						<SubHeading subtitle="Do you need help? Send us a message" />
						<ContactForm />
					</Col>
				</Row>
			</Container>
		</>
	);
}
