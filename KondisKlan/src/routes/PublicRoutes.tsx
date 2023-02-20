import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../modules/landing/LandingPage"
import ProfilePage from "../modules/profile/ProfilePage"

const PublicRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* TODO: Insert routes to e.g. profile and other pages*/}
        </Routes>
    )
}

export default PublicRoutes