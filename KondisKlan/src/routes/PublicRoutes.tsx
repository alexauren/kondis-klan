import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../modules/landing/LandingPage"
import { NewProgram } from "../modules/newprogram/NewProgram"

const PublicRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* TODO: Insert routes to e.g. profile and other pages*/}
            <Route path="/newprogram" element= {<NewProgram />} />
        </Routes>
    )
}

export default PublicRoutes