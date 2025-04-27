import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Hero from "./pages/home/Hero";
import Signup, { action as signupAction } from './pages/register/Signup'
import Login, { action as loginAction } from './pages/register/Login'
import ProfileLayout from './layout/ProfileLayout'
import Profile from "./pages/profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Hero />} />
        <Route path="login" element={<Login />} action={loginAction} />
        <Route path="signup" element={<Signup />} action={signupAction} />
      </Route>
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<Profile />} />
      </Route>
    </>
  )
)

export default function App() {
  return(
    <RouterProvider router={router} />
  )
}
