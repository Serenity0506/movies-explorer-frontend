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
    this.movies = JSON.parse(localStorage.getItem('saved-movies') || '[]');
  }

  //LOADER
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //TOKEN

  getToken() {
    return this.options.headers.Authorization;
  }

  setToken(token) {
    this.options.headers.Authorization = `Bearer ${token}`;
  }


  removeToken() {
    if (this.options.headers.Authorization) {
      delete this.options.headers.Authorization;
    }
    localStorage.removeItem("token");
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
    if (this.movies.length === 0) {
      return fetch(`${this.options.url}/movies`, {
        method: 'GET',
        headers: this.options.headers,
      })
        .then(_response)
        .then((movies) => {
          this.movies = movies;
          localStorage.setItem('saved-movies', JSON.stringify(movies));
          return movies;
        });
    }
    return Promise.resolve(this.movies);
  }

  ///click like
  createMovie(film) {
    return fetch(`${this.options.url}/movies`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(film),
    })
      .then(_response)
      .then((movie) => {
        this.movies.push(movie);
        localStorage.setItem('saved-movies', JSON.stringify(this.movies));
        return movie;
      });
  }

  ///click unlike
  deleteMovie(id) {
    return fetch(`${this.options.url}/movies/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(_response)
      .then((movie) => {
        this.movies = this.movies.filter((movieItem) => movieItem._id !== id);
        localStorage.setItem('saved-movies', JSON.stringify(this.movies));
        return movie;
      });
  }
}


const apiMain = new ApiMain({
  url: "https://api.movies.serenity0506.nomoredomains.work/",
  headers: {
    'content-type': 'application/json',
    Authorization: '',
  },
})


export default apiMain



    //   if (token) this.options.headers.authorization = "Bearer " + token;
    // }
  // }