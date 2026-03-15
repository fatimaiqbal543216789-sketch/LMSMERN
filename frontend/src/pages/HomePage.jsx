import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');
                setCourses(data.slice(0, 3)); // Display only top 3 on home page
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching courses');
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <>
            <div className="bg-primary text-white p-5 text-center mb-5">
                <Container>
                    <h1 className="display-4">Welcome to LMS Platform</h1>
                    <p className="lead mt-3">
                        Learn from the easiest and most interactive platform. Upgrade your skills now!
                    </p>
                    <Link to="/courses">
                        <Button variant="light" size="lg" className="mt-3">Explore Courses</Button>
                    </Link>
                </Container>
            </div>

            <Container>
                <h2 className="mb-4 text-center">Featured Courses</h2>
                {loading ? (
                    <div className="text-center" style={{ margin: 'auto' }}>
                        <Spinner animation="border" />
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Row>
                        {courses.map((course) => (
                            <Col key={course._id} sm={12} md={6} lg={4}>
                                <CourseCard course={course} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default HomePage;
