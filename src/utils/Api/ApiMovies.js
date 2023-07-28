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
    return fetch(`${this.options.url}`, {
      method: 'GET',
      headers: this._headers,
    }).then(_response);
  }

}

const apiMovies = new ApiMovies({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-type': 'application/json',
    Authorization: '',
  },
});

export default apiMovies