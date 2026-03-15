import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const CourseListingPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');
                setCourses(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching courses');
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-center">All Courses</h1>
            {loading ? (
                <div className="text-center" style={{ margin: 'auto' }}>
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Row>
                    {courses.map((course) => (
                        <Col key={course._id} sm={12} md={6} lg={4} className="mb-4">
                            <CourseCard course={course} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default CourseListingPage;
