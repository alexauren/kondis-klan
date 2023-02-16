import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../modules/landing/LandingPage"

const PublicRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* TODO: Insert routes to e.g. profile and other pages*/}
        </Routes>
    )
}

export default PublicRoutes