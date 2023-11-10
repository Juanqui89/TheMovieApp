import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const apiKey = import.meta.env.VITE_REACT_APP_ApiKey;

  const trending = `${
    import.meta.env.VITE_REACT_APP_Trending
  }?api_key=${apiKey}`;

  const imagePath = import.meta.env.VITE_REACT_APP_ImgPath;

  console.log("API Key:", import.meta.env.VITE_REACT_APP_ApiKey);
  console.log("Trending URL:", import.meta.env.VITE_REACT_APP_Trending);
  console.log("Image Path:", import.meta.env.VITE_REACT_APP_ImgPath);

  useEffect(() => {
    console.log("Trending URL:", trending);
    console.log("API Key:", apiKey);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${trending}`);
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

  return (
    <Container>
      <Row>
        <Col>
          {movies &&
            movies.map((items) => (
              <div key={items.id}>
                <img
                  src={`${imagePath}${items.poster_path}`}
                  alt="Movie Poster"
                />
                <h1>{items.title}</h1>
              </div>
            ))}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default App;
