import { NavLink } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

import PropTypes from "prop-types";

export const AdminMenu = () => {
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
					Add New Entablishment
				</NavLink>
			</Nav>
		</Container>
	);
};

AdminMenu.propTypes = {
	isActive: PropTypes.bool,
};
