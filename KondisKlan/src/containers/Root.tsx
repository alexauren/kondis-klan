import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";

function Root() {
    // Root is the top level component that wraps the entire app
    // It is used to provide the MantineProvider and the BrowserRouter
    // MantineProvider is used to provide the Mantine theme to the app
    // BrowserRouter is used to provide the routing functionality to the app
    // MantineProvider gives us access to some extra functionality besides just using the components
    // Such as modal dialogs, notifications, and more
    return (
        <MantineProvider>
            <BrowserRouter>
            <AppRoutes/>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default Root