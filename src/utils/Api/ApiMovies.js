const _response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(({ message, error }) => {
    res.message = message || error || `Закралась ошибка: ${res.status}`;
    return Promise.reject(res);
  });
};

class ApiMovies {
  constructor(options) {
    this.options = options
  }

  //MOVIE
  getMovies() {
    const localMoviesCache = JSON.parse(localStorage.getItem('movies'))

    return localMoviesCache
      ? Promise.resolve(localMoviesCache)
      : fetch(`${this.options.url}`, {
        method: 'GET',
        headers: this._headers,
      }).then(_response)
        .then(movies => movies.map(m => ({
          ...m,
          image: this.options.image_base_url + m.image.url,
          thumbnail: this.options.image_base_url + m.image.formats.thumbnail.url,
        }))
        ).then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies))

          return movies
        });
  }
}

const apiMovies = new ApiMovies({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  image_base_url: "https://api.nomoreparties.co",
  headers: {
    'Content-type': 'application/json',
    Authorization: '',
  },
});

export default apiMovies