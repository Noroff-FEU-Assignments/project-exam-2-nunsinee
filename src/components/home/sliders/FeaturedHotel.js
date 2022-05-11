import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loader from "../../layout/Loader";
import ErrorMessage from "../../common/ErrorMessage";
import { BASE_URL } from "../../../constants/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

export default function FeaturedHotel() {
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

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 820,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<Slider {...settings}>
			{hotels
				.sort((a, b) => b.id - a.id)
				.map((hotel) => {
					return (
						<div key={hotel.id} className="slider-container">
							<Link to={`detail/${hotel.id}`}>
								<Card className="slider__card card__featuredhotel">
									<Card.Img
										variant="top"
										src={
											hotel.attributes.featuredImage.data
												.attributes.url
										}
										alt="{hotel.attribute.title}"
										className="card-img-top__featuredhotel"
									/>
									<Card.Body>
										<Card.Title>
											<h4>
												Start from&nbsp;
												{hotel.attributes.price}
												Kr./Night
											</h4>
										</Card.Title>
									</Card.Body>
								</Card>
							</Link>
						</div>
					);
				})}
		</Slider>
	);
}
