import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Row, Col, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Modal state
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [editCourseId, setEditCourseId] = useState(null);

    const handleClose = () => {
        setShow(false);
        resetForm();
    };
    const handleShow = () => setShow(true);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice(0);
        setEditCourseId(null);
    };

    useEffect(() => {
        if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
            navigate('/login');
            return;
        }

        fetchCourses();
    }, [user, navigate]);

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('/api/courses');
            // Filter out only instructor's courses
            const myCourses = data.filter((c) => c.instructor?._id === user._id);
            setCourses(myCourses);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Error fetching courses');
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (editCourseId) {
                await axios.put(`/api/courses/${editCourseId}`, {
                    title, description, category, price
                });
                toast.success('Course updated');
            } else {
                await axios.post('/api/courses', {
                    title, description, category, price
                });
                toast.success('Course created');
            }
            handleClose();
            fetchCourses();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error saving course');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`/api/courses/${id}`);
                toast.success('Course deleted');
                fetchCourses();
            } catch (err) {
                toast.error(err.response?.data?.message || 'Error deleting course');
            }
        }
    };

    const openEditModal = (course) => {
        setTitle(course.title);
        setDescription(course.description);
        setCategory(course.category);
        setPrice(course.price);
        setEditCourseId(course._id);
        handleShow();
    };

    return (
        <Container className="my-5">
            <Row className="align-items-center mb-4">
                <Col>
                    <h2>Instructor Dashboard</h2>
                    <h4 className="text-muted">Manage My Courses</h4>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleShow} variant="primary">
                        + Create Course
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped bordered hover responsive className="table-sm shadow-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>CATEGORY</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id}>
                                <td>{course._id.substring(0, 8)}...</td>
                                <td>{course.title}</td>
                                <td>{course.category}</td>
                                <td>${course.price}</td>
                                <td>
                                    <Button variant="light" className="btn-sm me-2" onClick={() => openEditModal(course)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(course._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Modal for Create/Edit Course */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editCourseId ? 'Edit Course' : 'Create Course'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editCourseId ? 'Update Course' : 'Create Course'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default InstructorDashboard;
