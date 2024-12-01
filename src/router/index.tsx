import { useRoutes } from "react-router-dom";
import { Route } from "../types";
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";
import ProjectBoard from "../pages/board";


export default function Router() {
    return useRoutes([
        {
            path: Route.SIGN_IN,
            element: <SignIn/>,
        },
        {
            path: Route.SIGN_UP,
            element: <SignUp/>
        },
        {
            path: '/board',
            element: <ProjectBoard/>
        }
    ]);
}
