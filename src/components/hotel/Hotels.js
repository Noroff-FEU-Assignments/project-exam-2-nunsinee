import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import ErrorMessage from "../common/ErrorMessage";
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import Loader from "../layout/Loader";
import HotelItem from "./HotelItem";
import SearchForm from "../search/SearchForm";
import { useTitlePage } from "../../utils/useTitlePage";
import Heading from "../layout/Heading";

export default function Hotels() {
	const [hotels, setHotels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showMore, setShowMore] = useState(false); //22
	const [buttonText, setButtonText] = useState("Show More"); //22

	useTitlePage("Hotel | accommodation, Apartment, GuestHouse in Bergen");
	const url = BASE_URL + "api/hotels?populate=*";

	useEffect(function () {
		async function getHotels() {
			try {
				const response = await axios.get(url);
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

	const clickLoadMoreHotels = () => {
		setShowMore((oldItem) => !oldItem);
		showMore ? setButtonText("Show More") : setButtonText("Show Less");
	};

	return (
		<>
			<Container className="container__content">
				<Breadcrumb>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
					<Breadcrumb.Item active>Hotels</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="text-center">
					<Col>
						<Heading title="Hotels in Bergen" />
					</Col>
				</Row>

				<Row className=" justify-content-md-center mt-3">
					<Col sm className="search__container ">
						<SearchForm />
					</Col>
				</Row>
				<Row className="space__top justify-content-md-center ">
					{hotels
						.sort((a, b) => b.id - a.id)
						.slice(0, showMore ? hotels.lenght : 12)
						.map(function (hotel) {
							return (
								<Col
									xs={12}
									md={6}
									lg={4}
									key={hotel.id}
									className="mt-4"
								>
									<HotelItem
										key={hotel.id}
										id={hotel.id}
										title={hotel.attributes.title}
										price={hotel.attributes.price}
										featuredImage={
											hotel.attributes.featuredImage.data
												.attributes.url
										}
									/>
								</Col>
							);
						})}
				</Row>
				<Row className="text-center">
					<Col sm>
						<Button onClick={() => clickLoadMoreHotels()}>
							{buttonText}
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
}

Hotels.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	price: PropTypes.number,
	featuredImage: PropTypes.func,
};
