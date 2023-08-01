const _response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(({ message, error }) => {
    res.message = message || error || `Закралась ошибка: ${res.status}`;
    return Promise.reject(res);
  });
};

class ApiMain {
  constructor(options) {
    this.options = options;
  }

  //TOKEN

  setToken(token) {
    this.options.headers.Authorization = `Bearer ${token}`;
  }


  //USER REQUESTS

  signUp({ name, email, password }) {
    return fetch(`${this.options.url}/signup`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({ name, email, password }),
    }).then(_response);
  }

  signIn({ email, password }) {
    return fetch(`${this.options.url}/signin`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({ email, password }),
    }).then(_response);
  }


  //PROFILE

  getCurrentUser() {
    return fetch(`${this.options.url}/users/me`, {
      method: 'GET',
      headers: this.options.headers,
    }).then(_response);
  }

  updateCurrentUser({ name, email }) {
    return fetch(`${this.options.url}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({ name, email }),
    }).then(_response);
  }


  //MOVIES REQUESTS

  getMovies() {
    return fetch(`${this.options.url}/movies`, {
      method: 'GET',
      headers: this.options.headers,
    })
      .then(_response)
      .then((movies) => {
        return movies.map((m) => ({
          ...m,
          id: m.movieId
        }));
      });
  }

  ///click like
  createMovieWhenLike(movie) {
    return fetch(`${this.options.url}/movies`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(movie),
    })
      .then(_response)
      .then((movie) => {
        return movie;
      });
  }

  ///click unlike
  deleteMovieWhenDislike(id) {
    return fetch(`${this.options.url}/movies/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(_response)
      .then((movie) => {
        return movie;
      });
  }


}


const apiMain = new ApiMain({
  url: "https://api.movies.serenity0506.nomoredomains.work",
  // url: "http://localhost:3000",
  headers: {
    'content-type': 'application/json',
    Authorization: '',
  },
})


export default apiMain