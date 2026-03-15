import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <Card className="my-3 p-3 rounded shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title as="h4">
                    <strong>{course.title}</strong>
                </Card.Title>
                <Card.Text as="div" className="mb-3 text-muted">
                    {course.category}
                </Card.Text>
                <Card.Text as="h5" className="mb-3">
                    ${course.price.toFixed(2)}
                </Card.Text>
                <Card.Text className="flex-grow-1">
                    {course.description.substring(0, 100)}...
                </Card.Text>
                <Link to={`/courses/${course._id}`}>
                    <Button variant="primary" className="w-100 mt-2">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
