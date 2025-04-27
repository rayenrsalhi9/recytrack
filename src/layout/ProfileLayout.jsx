import { Outlet } from "react-router-dom"
import Chatbot from "../components/bot/Chatbot"
import Language from "../components/language/Language"

export default function ProfileLayout() {
  return (
    <>
      <Outlet />
      <Chatbot />
      <Language />
    </>
  )
}
