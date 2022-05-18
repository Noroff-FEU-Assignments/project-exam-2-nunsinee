import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Badge } from "react-bootstrap";
import Loader from "../layout/Loader";
import Title from "../layout/Title";
import ErrorMessage from "../common/ErrorMessage";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import SubTitle from "../layout/SubTitle";

export default function TopPicHotels() {
	const [hotels, setHotels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = BASE_URL + "api/hotels?populate=*";

	useEffect(function () {
		async function getHotels() {
			try {
				const response = await axios.get(http);
				setHotels(response.data.data);
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
			<Row>
				<Col className="text-center mt-5">
					<Badge bg="light">
						<Title title="Top picks in Bergen" />
					</Badge>{" "}
				</Col>
			</Row>
			<Row>
				{hotels
					.slice(3, 7)
					.sort((a, b) => b.id - a.id)
					.map((hotel) => {
						return (
							<Col xs={12} md={3} className="mt-5" key={hotel.id}>
								<Link to={`detail/${hotel.id}`}>
									<Card className="card__popular">
										<Card.Img
											variant="top"
											src={
												hotel.attributes.featuredImage
													.data.attributes.url
											}
											alt="{hotel.attribute.title}"
											className="card-img-top__popular"
										/>

										<Card.Body className="card-body__popular text-center">
											<SubTitle
												subtitle={
													hotel.attributes.title
												}
											/>
											<h6>
												{hotel.attributes.roomTypes}
											</h6>
											<p>
												{hotel.attributes.price}
												Kr./Night
											</p>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						);
					})}
			</Row>
		</>
	);
}
