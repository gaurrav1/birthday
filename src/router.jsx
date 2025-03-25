import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { BirthdayAnimation } from "./components/BirthdayAnimation";
import { BirthdayWish } from "./components/BirthdayWish";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />
        },
        {
          path: "/birthday-animation",
          element: <BirthdayAnimation />,
        },
        {
            path: "/birthday-wish",
            element: <BirthdayWish />
        }
    ]
)