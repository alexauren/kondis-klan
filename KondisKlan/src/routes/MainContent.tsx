import { Outlet } from "react-router-dom"
import MainLayout from "../containers/MainLayout"

const MainContent = () => {
    return(
        <MainLayout>
            <Outlet/>
        </MainLayout>
    )
}

export default MainContent