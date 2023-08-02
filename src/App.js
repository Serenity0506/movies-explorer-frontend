import { Route, Routes } from "react-router-dom"
import './App.css';
import { Main } from './components/Main/Main';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { Movies } from './components/Movies/Movies';
import { Profile } from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import { useLayoutEffect } from 'react';
import { SavedMovies } from './components/Movies/SavedMovies'
import { ProtectedRoute } from './HOC/ProtectedRoute';
import apiMain from './utils/Api/ApiMain';
import { UseCurrentUserContext } from './context/CurrentUserContext';

export function App() {

  const { token } = UseCurrentUserContext();

  // При изменении токена ставим в апи
  useLayoutEffect(() => {
    apiMain.setToken(token)
  }, [token])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />

        <Route
          path='/saved-movies'
          element={<ProtectedRoute element={SavedMovies} />
          }
        />

        <Route
          path='/movies'
          element={<ProtectedRoute element={Movies} />
          }
        />

        <Route
          path='/profile'
          element={<ProtectedRoute element={Profile} />
          }
        />

        <Route path='/signup' element={<Auth />} />
        <Route path='/signin' element={<Auth showLoginView={true} />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </>
  );
}