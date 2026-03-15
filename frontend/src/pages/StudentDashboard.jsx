import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'student') {
            navigate('/login');
            return;
        }

        const fetchMyCourses = async () => {
            try {
                const { data } = await axios.get('/api/enrollments/my-courses');
                setEnrollments(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching my courses');
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, [user, navigate]);

    return (
        <Container className="my-5">
            <h2 className="mb-4">My Dashboard</h2>
            <h4>My Enrolled Courses</h4>
            <hr />
            {loading ? (
                <div className="text-center" style={{ margin: 'auto' }}>
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : enrollments.length === 0 ? (
                <Alert variant="info">You are not enrolled in any courses yet. <Link to="/courses">Browse courses</Link></Alert>
            ) : (
                <Row>
                    {enrollments.map((enrolled) => (
                        <Col key={enrolled._id} sm={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/courses/${enrolled.course?._id}`} className="text-decoration-none">
                                            {enrolled.course?.title}
                                        </Link>
                                    </Card.Title>
                                    <Card.Text className="text-muted">
                                        Instructor: {enrolled.course?.instructor?.name}
                                    </Card.Text>
                                    <p className="mb-1 text-muted text-sm">Progress</p>
                                    <ProgressBar now={enrolled.progress} label={`${enrolled.progress}%`} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default StudentDashboard;
