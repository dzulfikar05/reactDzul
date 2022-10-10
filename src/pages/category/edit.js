import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditCategory() {
    const history = useHistory();

    const { id } = useParams()

    const [name, setName] = useState();
    const [position, setPosition] = useState();
    const [validationError, setValidationError] = useState({});
    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {
        await axios.get(`http://127.0.0.1:8000/api/categorys/${id}`).then(({ data }) => {
            const {name, position } = data.category
            setName(name)
            setPosition(position)
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    // const changeHandler = (event) => {
    //     setImage(event.target.files[0]);
    // };

    const updateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('name', name)
        formData.append('position', position)

        await axios.post(`http://127.0.0.1:8000/api/categorys/update/${id}`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            history.push("/category/view")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update Category</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={updateCategory}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="name">
                                                <Form.Label>Nama</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="position">
                                                <Form.Label>Position</Form.Label>
                                                <Form.Control type="number" value={position} onChange={(event) => {
                                                    setPosition(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}