import { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

function Navigation() {
	const [auth, setAuth] = useContext(AuthContext);

	const navigate = useNavigate();

	function logout() {
		alert("Are you sure to logout?");
		setAuth(null);
		navigate("/");
	}

	function login() {
		navigate("/login");
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="menu">
			<Container>
				<Navbar.Brand href="/">
					<img
						src={logo}
						alt="Holidaze logo brand"
						className="logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
						<NavLink to="/hotel" className="nav-link">
							Hotels
						</NavLink>
						<NavLink to="/contact" className="nav-link">
							Contact
						</NavLink>
					</Nav>
					<Nav className="mr-auto">
						{auth ? (
							<>
								<NavLink to="/admin" className="nav-link">
									admin
								</NavLink>
								<Button variant="danger" onClick={logout}>
									Log out
								</Button>
							</>
						) : (
							<Button variant="dark" onClick={login}>
								Log in
							</Button>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
