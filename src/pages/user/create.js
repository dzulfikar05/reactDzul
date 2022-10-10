import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'

export default function CreateUser() {
    const history = useHistory();

    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [commonname, setCommonname] = useState("")
    const [validationError, setValidationError] = useState({})

    // const changeHandler = (event) => {
    //     setImage(event.target.files[0]);
    // };

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('nickname', nickname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('commonname', commonname)

        await axios.post(`http://127.0.0.1:8000/api/users`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            history.push("/user/view")
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
                            <h4 className="card-title">Create User</h4>
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
                                <Form onSubmit={createUser}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="nickname">
                                                <Form.Label>Nickname</Form.Label>
                                                <Form.Control type="text" value={nickname} onChange={(event) => {
                                                    setNickname(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" value={email} onChange={(event) => {
                                                    setEmail(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" value={password} onChange={(event) => {
                                                    setPassword(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Commonname">
                                                <Form.Label>Commonname</Form.Label>
                                                <Form.Control type="text" value={commonname} onChange={(event) => {
                                                    setCommonname(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Save
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