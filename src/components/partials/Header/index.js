import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Logo from "../../../../public/images/logo/logo.jpg";
import NavItem from "components/UI/NavItem";
import Button from "components/UI/Button";
import { useAuth } from "context/AuthUserContext";

const Index = () => {


  const router = useRouter();

  const { user, isLogged, logout } = useAuth();

  console.log("user : ", user)

  const [menu, setMenu] = useState([{
    title: "Accueil",
    link: "/",
    className: styles.nav__item
  }])

  const publicMenu = [
    {
      title: "Accueil",
      link: "/",
      className: styles.nav__item
    },
    {
      title: "Actualités",
      link: "/actualite",
      className: styles.nav__item
    },
    {
      title: "Association",
      link: "/association",
      className: styles.nav__item
    },
    {
      title: "Informations",
      link: "/information",
      className: styles.nav__item
    },
    {
      title: "Emploi",
      link: "/emploi",
      className: styles.nav__item
    },
    {
      title: "Agenda",
      link: "/agenda",
      className: styles.nav__item
    },
    {
      title: "Nous contacter",
      link: "/contact",
      className: styles.nav__btn
    }
  ]


  const adminMenu = [
    {
      title: "Administration",
      link: "/admin",
      className: styles.nav__item
    }
  ]


  useEffect(() => {
    if (isLogged) {
      setMenu([...publicMenu, ...adminMenu])
    } else {
      setMenu([...publicMenu])
    }

  }, [user, isLogged])


  return (
    <div className={`${styles.wrapper} flex`}>
      <div className={styles.logo}>
        <img src={Logo.src} alt="Logo" />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {
            menu && menu.map((item, index) => (
              <NavItem key={index} item={item} />
            ))
          }
          {
            isLogged ? (
              <>

                <li>
                  <Button type="button" title="Déconnexion" className="btn__primary" handleClick={
                    () => logout()
                  } />
                </li>
              </>
            ) : null
          }
        </ul>
      </nav>
    </div>
  );
}

export default Index;
