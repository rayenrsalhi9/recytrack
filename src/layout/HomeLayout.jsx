import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next";
import Chatbot from "../components/bot/Chatbot"
import Language from '../components/language/Language'

export default function HomeLayout() {
  const { i18n } = useTranslation();
  return (
   <main className={`container ${i18n.language === 'ar' ? 'ar' : ''}`}>
    <Outlet />
    <Chatbot />
    <Language />
   </main>
  )
}