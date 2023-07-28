import { Route, Routes, useNavigate } from "react-router-dom"
import './App.css';
import { Main } from './components/Main/Main';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { Movies } from './components/Movies/Movies';
import { Profile } from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import { useContext, useEffect, useState } from 'react';
import { SavedMovies } from './components/Movies/SavedMovies'
import { ProtectedRoute } from './HOC/ProtectedRoute';
import apiMain from './utils/Api/ApiMain';
import { UseCurrentUserContext } from './context/CurrentUserContext';


function App() {

  const { token, setToken, email, setEmail, currentUser, setCurrentUser, loading, setLoading } = UseCurrentUserContext();

  const navigate = useNavigate();

  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});

  //открываем бургер попап
  function burgerClick() {
    setIsBurgerPopupOpen(!isBurgerPopupOpen);
  }

  //закрываем бургер попап
  const closeBurgerPopup = () => {
    setIsBurgerPopupOpen(false)
  }

  //закрываем на esc
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


  //выйти из системы и перейти на главную
  const logOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate('/');
    apiMain.setToken('');
  };

  //функция проверки токена
  const chekToken = () => {
    const token = localStorage.getItem("token");
    apiMain.setToken(token);
    if (token) {
      apiMain.getCurrentUser().then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }).catch((error) => {
        setIsLoggedIn(false);
        logOut();
      });
    } else {
      setIsLoggedIn(false);
    }
  };

  //проверяем токен
  useEffect(() => { chekToken() }, [isLoggedIn])

  const logIn = (evt) => {
    evt.preventDefault();
    setIsLoggedIn(true);
    navigate('/movies', { replace: true });
  };


  //регистрация в системе
  // const register = (evt) => {
  //   // evt.preventDefault();
  //   apiMain.signUp()




  //   navigate('/signin', { replace: true });
  // };



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
          element={<ProtectedRoute element={
            <SavedMovies
              onCloseBurgerPopup={closeBurgerPopup}
              isLoggedIn={isLoggedIn}
              isOpenBurger={isBurgerPopupOpen}
              changeBurgerView={burgerClick}
              onSearch={searchFilm} />} />
          }
        />


        <Route
          path='/movies'
          element={<ProtectedRoute element={
            <Movies
              onCloseBurgerPopup={closeBurgerPopup}
              isLoggedIn={isLoggedIn}
              isOpenBurger={isBurgerPopupOpen}
              changeBurgerView={burgerClick}
              onSearch={searchFilm} />} />
          }
        />


        <Route
          path='/profile'
          element={<ProtectedRoute element={
            < Profile
              onCloseBurgerPopup={closeBurgerPopup}
              isLoggedIn={isLoggedIn}
              isOpenBurger={isBurgerPopupOpen}
              changeBurgerView={burgerClick}
              logOut={logOut} />} />
          }
        />

        <Route path='/signup' element={<Auth onClick={register} />} />
        <Route path='/signin' element={<Auth showLoginView={true} onClick={logIn} />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;


