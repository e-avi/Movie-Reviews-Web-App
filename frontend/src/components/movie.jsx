import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDataService from '../services/movies';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const Movie = ({ user }) => {
    const { id } = useParams(); // Using useParams hook to get the movie ID from the URL

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    });

    useEffect(() => {
        // Fetch the movie details using the movie ID obtained from useParams
        const getMovie = async () => {
            try {
                const response = await MovieDataService.get(id);
                setMovie(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMovie();
    }, [id]);

    const deleteReview = (reviewId, user, index) => {
        MovieDataService.deleteReview(reviewId, user.id)
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return {
                        ...prevState
                    };
                });
            })
            .catch(e => {
                console.log(e);
            });
    };
    

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {user &&
                                    <Link to={`/movies/${id}/review`}>Add Review</Link>
                                }
                            </Card.Body>
                        </Card>
                        <br />
                        <h2>Reviews</h2>
                        <br />
                        {movie.reviews.map((review, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>{review.name + " reviewed on "}{moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p>{review.review}</p>
                                        {user && user.id === review.user_id &&
                                            <Row>
                                                <Col>
                                                    <Link to={{
                                                        pathname: `/movies/${id}/review`,
                                                        state: { currentReview: review }
                                                    }}>Edit</Link>
                                                </Col>
                                                <Col>
                                                <Button variant="link" onClick={() => deleteReview(review._id, user, index)}>
                                                    Delete
                                                </Button>
                                                </Col>
                                            </Row>
                                        }
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;
