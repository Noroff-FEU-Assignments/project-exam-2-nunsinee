import React from "react";
import "./sass/style.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Wrapper from "./components/layout/Wrapper";
import { AuthProvider } from "./context/AuthContext";
import AdminPage from "./components/admin/AdminPage";
import HomePage from "./components/home/HomePage";
import Hotels from "./components/hotel/Hotels";
import Contact from "./components/contact/Contact";
import LoginForm from "./components/login/LoginForm";
import EnquiryList from "./components/admin/enquiries/EnquiryList";
import MessageList from "./components/admin/message/MessageList";
import AddNewEstablishment from "./components/admin/establishment/AddNewEstablishment";
import Footer from "./components/layout/Footer";
import HotelDetailPage from "./components/hotel/HotelDetailPage";

function App() {
	return (
		<AuthProvider>
			<Wrapper>
				<BrowserRouter>
					<Navigation />

					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/hotel" element={<Hotels />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/admin" element={<AdminPage />} />
						<Route
							path="/admin/establishment"
							element={<AddNewEstablishment />}
						/>
						<Route
							path="/admin/enquiries"
							element={<EnquiryList />}
						/>
						<Route
							path="detail/:id"
							element={<HotelDetailPage />}
						/>
						<Route
							path="hotel/detail/:id"
							element={<HotelDetailPage />}
						/>
						<Route
							path="/admin/message"
							element={<MessageList />}
						/>
					</Routes>
				</BrowserRouter>
			</Wrapper>
			<Footer />
		</AuthProvider>
	);
}

export default App;
