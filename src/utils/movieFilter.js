export function filterFilm(movie, query, isShortsOnly) {
  return movie.nameRU.toLowerCase().search(query.toLowerCase()) >= 0 &&
    (isShortsOnly
      ? movie.duration < 40
      : true)
}