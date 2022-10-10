import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditTag() {
    const history = useHistory();

    const { id } = useParams()

    const [name, setName] = useState();
    const [validationError, setValidationError] = useState({});
    useEffect(() => {
        fetchTag()
    }, [])

    const fetchTag = async () => {
        await axios.get(`http://127.0.0.1:8000/api/tags/${id}`).then(({ data }) => {
            const {name } = data.tag
            setName(name)
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

    const updateTag = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('name', name)

        await axios.post(`http://127.0.0.1:8000/api/tags/update/${id}`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            history.push("/tag/view")
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
                            <h4 className="card-title">Update Tag</h4>
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
                                <Form onSubmit={updateTag}>
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