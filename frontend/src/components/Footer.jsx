import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-auto py-3">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; LMS Platform {new Date().getFullYear()}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
