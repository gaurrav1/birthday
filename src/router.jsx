import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { BirthdayAnimation } from "./components/BirthdayAnimation";
import { BirthdayWish } from "./components/BirthdayWish";
import { FirstPage } from "./components/Testing/FirstPage";
import { SecondPage } from "./components/Testing/SecondPage";


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
        // {
        //     path: "/",
        //     element: <FirstPage />
        // },
        // {
        //   path: "/celebration",
        //   element: <SecondPage />,
        // }
    ]
)