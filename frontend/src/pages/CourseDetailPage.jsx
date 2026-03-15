import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/courses/${id}`);
                setCourse(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching course details');
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const enrollHandler = async () => {
        if (!user) {
            toast.info('Please log in to enroll');
            navigate('/login');
            return;
        }
        try {
            await axios.post('/api/enrollments', { courseId: id });
            toast.success('Successfully enrolled in course!');
            navigate('/student/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error enrolling in course');
        }
    };

    return (
        <Container className="my-5">
            {loading ? (
                <div className="text-center" style={{ margin: 'auto' }}>
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Row>
                    <Col md={8}>
                        <Card className="mb-4 border-0 shadow-sm">
                            <Card.Body>
                                <h2>{course.title}</h2>
                                <Badge bg="info" className="mb-3">{course.category}</Badge>
                                <p className="text-muted">Instructor: {course.instructor?.name}</p>
                                <hr />
                                <h4>Course Description</h4>
                                <p style={{ whiteSpace: 'pre-line' }}>{course.description}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow-sm border-0">
                            <Card.Body className="text-center">
                                <h3 className="mb-4">${course.price}</h3>
                                <Button variant="primary" size="lg" className="w-100" onClick={enrollHandler}>
                                    Enroll Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CourseDetailPage;
