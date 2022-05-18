import SubHeading from "../layout/SubHeading";
import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "../search/SearchForm";
import FeaturedHotel from "./sliders/FeaturedHotel";
import PopularHotels from "./PopularHotels";

export default function HomePage() {
	return (
		<>
			<Container className="container__content">
				<Row>
					<Col className="mt-2 text-center">
						<SubHeading subtitle="Looking for place to stay in Bergen?" />
					</Col>
				</Row>
				<Row className="justify-content-md-center mb-5">
					<Col sm className="search__container">
						<SearchForm />
					</Col>
				</Row>
				<Row>
					<Col className="mt-3">
						<FeaturedHotel />
					</Col>
				</Row>

				<Row>
					<Col className="mt-3">
						<PopularHotels />
					</Col>
				</Row>
			</Container>
		</>
	);
}
