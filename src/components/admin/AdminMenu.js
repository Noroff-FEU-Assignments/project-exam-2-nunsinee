import { NavLink } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminMenu = () => {
	const [auth] = useContext(AuthContext);

	let navigate = useNavigate();

	useEffect(() => {
		if (!auth) {
			navigate("/");
		} //eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<Nav className="nav__admin">
				<NavLink
					to="/admin/enquiries"
					className={({ isActive }) =>
						isActive ? "active" : "inactive"
					}
				>
					Enquiries
				</NavLink>
				<NavLink
					to="/admin/message"
					className={({ isActive }) =>
						isActive ? "active" : "inactive"
					}
				>
					Message
				</NavLink>
				<NavLink
					to="/admin/establishment"
					className={({ isActive }) =>
						isActive ? "active" : "inactive"
					}
				>
					Add new establishment
				</NavLink>
			</Nav>
		</Container>
	);
};

AdminMenu.propTypes = {
	isActive: PropTypes.bool,
};
