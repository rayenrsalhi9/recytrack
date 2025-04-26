import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Hero from "./pages/home/Hero";
import Signup from './pages/register/Signup'
import Login from './pages/register/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Hero />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
)

export default function App() {
  return(
    <RouterProvider router={router} />
  )
}
