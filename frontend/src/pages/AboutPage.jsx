import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h1 className="mb-4">About Us</h1>
                    <p className="lead text-muted">
                        We are a leading online learning platform dedicated to providing high-quality courses for aspiring professionals. Our mission is to democratize education by offering accessible, affordable, and practical skills in software development, design, and business.
                    </p>
                    <p>
                        Whether you are looking to start a new career or advance in your current one, our expert-led courses provide you with the latest skills to succeed in today's competitive job market.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;
