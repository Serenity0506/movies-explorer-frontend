import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { AboutProject } from './AboutProject/AboutProject'
import { NavTab } from './NavTab/Navtab'
import { Portfolio } from './Portfolio/Portfolio'
import { Promo } from './Promo/Promo'
import { Techs } from './Techs/Techs'

export const Main = () => {
  return (
    <main>
      <Header isLoggedIn={false} />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
    </main>
  )
}
