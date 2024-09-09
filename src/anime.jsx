import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col, Spinner, Alert, Pagination, Modal } from 'react-bootstrap';
import './app1.css'; // Pastikan CSS diimpor

const AnimeSearch = () => {
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleSearch = async (page = 1) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=10`);
      const data = await response.json();
      if (response.ok) {
        setAnimeList(data.data);
        setTotalPages(data.pagination.last_page);
      } else {
        setError('Error fetching data');
      }
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data', error);
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSearch(newPage);
  };

  const handleShowModal = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAnime(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    handleSearch();
  };

  return (
    <Container className="anime-search-container my-4">
      <h1 className="text-center mb-4">Anime Search</h1>
      <Form className="d-flex mb-4" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an anime..."
          className="me-2"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Search'}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {animeList.length > 0 ? (
          animeList.map((anime) => (
            <Col key={anime.mal_id} xs={12} md={4} lg={3} className="mb-4">
              <Card className="anime-card" onClick={() => handleShowModal(anime)}>
                <Card.Img variant="top" src={anime.images.jpg.large_image_url} />
                <Card.Body>
                  <Card.Title>{anime.title}</Card.Title>
                  <Card.Text>
                    {anime.synopsis.length > 100 ? `${anime.synopsis.slice(0, 100)}...` : anime.synopsis}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No results found</p>
          </Col>
        )}
      </Row>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <Pagination.Item
                key={pageNumber + 1}
                active={page === pageNumber + 1}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {selectedAnime && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedAnime.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedAnime.images.jpg.large_image_url}
              alt={selectedAnime.title}
              className="img-fluid mb-3"
            />
            <p>{selectedAnime.synopsis}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default AnimeSearch;
