import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchUsers();
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Error fetching users');
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/users/${id}`);
                toast.success('User deleted');
                fetchUsers();
            } catch (err) {
                toast.error(err.response?.data?.message || 'Error deleting user');
            }
        }
    };

    return (
        <Container className="my-5">
            <Row className="align-items-center mb-4">
                <Col>
                    <h2>Admin Dashboard</h2>
                    <h4 className="text-muted">Manage Users</h4>
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
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>{u._id.substring(0, 8)}...</td>
                                <td>{u.name}</td>
                                <td>
                                    <a href={`mailto:${u.email}`}>{u.email}</a>
                                </td>
                                <td>{u.role.toUpperCase()}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(u._id)}
                                        disabled={u.role === 'admin'}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default AdminDashboard;
