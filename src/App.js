import { Route, Routes, useNavigate } from "react-router-dom"
import './App.css';
import { Main } from './components/Main/Main';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { Movies } from './components/Movies/Movies';
import { Profile } from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import { useEffect, useState } from 'react';
import { SavedMovies } from './components/Movies/SavedMovies'


function App() {
  const navigate = useNavigate();

  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const closeBurgerPopup = () => {
    setIsBurgerPopupOpen(false)
  }


  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeBurgerPopup()
      }
    }
    if (isBurgerPopupOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isBurgerPopupOpen])


  function burgerClick() {
    setIsBurgerPopupOpen(!isBurgerPopupOpen);
  }

  const logOut = () => {
    setIsLoggedIn(false);
    navigate('/signin', { replace: true })
  };

  const logIn = (evt) => {
    evt.preventDefault();
    setIsLoggedIn(true);
    navigate('/movies', { replace: true });
  };

  const register = (evt) => {
    evt.preventDefault();
    navigate('/signin', { replace: true });
  };

  const searchFilm = (evt) => {
    evt.preventDefault()
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />

        <Route
          path='/saved-movies'
          element={<SavedMovies
            onCloseBurgerPopup={closeBurgerPopup}
            isLoggedIn={isLoggedIn}
            isOpenBurger={isBurgerPopupOpen}
            changeBurgerView={burgerClick}
            onSearch={searchFilm} />}
        />

        <Route
          path='/movies'
          element={<Movies
            onCloseBurgerPopup={closeBurgerPopup}
            isLoggedIn={isLoggedIn}
            isOpenBurger={isBurgerPopupOpen}
            changeBurgerView={burgerClick}
            onSearch={searchFilm} />}
        />


        <Route
          path='/profile'
          element={<Profile
            onCloseBurgerPopup={closeBurgerPopup}
            isLoggedIn={isLoggedIn}
            isOpenBurger={isBurgerPopupOpen}
            changeBurgerView={burgerClick}
            logOut={logOut} />} />

        <Route path='/signup' element={<Auth onClick={register} />} />
        <Route path='/signin' element={<Auth showLoginView={true} onClick={logIn} />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;


