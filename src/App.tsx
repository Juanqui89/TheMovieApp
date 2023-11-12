/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import ScrollBtn from "./ScrollBtn";
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  isExpanded?: boolean;
}

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const [expanded, setExpanded] = useState<boolean[]>([]);
  const apiKey = import.meta.env.VITE_REACT_APP_ApiKey;

  const trending = import.meta.env.VITE_REACT_APP_Trending;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${trending}?api_key=${apiKey}`);
        console.log(response);
        const result = response.data.results;
        setMovies(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiKey, trending]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleShowTrailer = async (movieId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
      );
      const videos = response.data.results;
      const trailer = videos.find((video: any) => video.type === "Trailer");

      if (trailer && trailer.key) {
        const trailerURL = `https://www.youtube.com/embed/${trailer.key}`;
        window.open(trailerURL, "_blank"); // Abre el enlace en una nueva pestaña
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const toggleExpand = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setExpanded((prevExpanded) => {
      const updatedExpanded = [...prevExpanded];
      updatedExpanded[index] = !updatedExpanded[index];
      return updatedExpanded;
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <input
            type="text"
            placeholder=" Buscar películas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Row />

        <Col>
          {searchQuery && (
            <section className="movie-search">
              {searchResults.map((movie) => (
                <div key={movie.id} className="movie-search">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt="Movie Poster"
                  />
                  <button
                    className="btn-trailer"
                    onClick={() => handleShowTrailer(movie.id)}
                  >
                    Ver Trailer
                  </button>
                </div>
              ))}
            </section>
          )}
        </Col>

        <Col>
          <Carousel>
            {movies.map((movie) => (
              <Carousel.Item key={movie.id}>
                <img
                  className="slider-img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <Carousel.Caption>
                  <h3>{movie.title}</h3>
                  <p className="details">{movie.overview}</p>
                  <button
                    className="btn-trailer btn-trailer-slider"
                    onClick={() => handleShowTrailer(movie.id)}
                  >
                    Ver Trailer
                  </button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <Col />

          <Col>
            <section className="content">
              {movies.map((items, index) => (
                <div key={items.id}>
                  {items.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${items.poster_path}`}
                      alt="Movie Poster"
                    />
                  )}
                  <h1 className="title">{items.title}</h1>
                  <p
                    className={
                      expanded[index] ? "overview expanded" : "overview"
                    }
                  >
                    {items.overview}
                  </p>
                  <button
                    className="mostrar"
                    onClick={(e) => toggleExpand(index, e)}
                  >
                    {expanded[index] ? "Mostrar menos" : "Mostrar más"}
                  </button>
                  <p>{formatDate(items.release_date)}</p>
                  <p>{"Calificación:" + " " + items.vote_average.toFixed()}</p>
                  <button
                    className="btn-trailer"
                    onClick={() => handleShowTrailer(items.id)}
                  >
                    Ver Trailer
                  </button>
                </div>
              ))}
            </section>
            <ScrollBtn />
          </Col>
          <Col>
            <footer>
              <p>&copy; Derechos Reservados 2023</p>
            </footer>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
