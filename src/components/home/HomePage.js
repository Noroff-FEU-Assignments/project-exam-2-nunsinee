import SubHeading from "../layout/SubHeading";
import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "../search/SearchForm";
import FeaturedHotel from "./sliders/FeaturedHotel";

export default function HomePage() {
	return (
		<>
			<Container className="container__content">
				<Row>
					<Col className="mt-5 text-center">
						<SubHeading subtitle="Looking for place to stay in Bergen?" />
					</Col>
				</Row>
				<Row>
					<Col className="mt-3">
						<SearchForm />
						<FeaturedHotel />
					</Col>
				</Row>
			</Container>
		</>
	);
}
