import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function List() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        await axios.get(`http://127.0.0.1:8000/api/users`).then(({ data }) => {
            setUsers(data)
        })
    }

    const deleteUser = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchUsers()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className='card'>
                <div className='card-body'>


                    <div className="row">
                        <div className='col-6 my-3'>
                            <span className='mb-3 fs-4'><strong>User</strong></span>
                        </div>
                        <div className='col-6 my-3 d-flex justify-content-end'>
                            <Link className='btn btn-secondary mb-2 mx-3 float-end' to={"/dashboard"}>
                                Back
                            </Link>
                            <Link className='btn btn-primary mb-2 float-end' to={"/user/create"}>
                                Create
                            </Link>
                        </div>
                        <div className="col-12">
                            <div className="card card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nickname</th>
                                                <th>Email</th>
                                                {/* <th>Password</th> */}
                                                <th>Commonname</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.length > 0 && (
                                                    users.map((row, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{row.nickname}</td>
                                                            <td>{row.email}</td>
                                                            <td>{row.commonname}</td>
                                                            <td>
                                                                <Link to={`/user/edit/${row.idUser}`} className='btn btn-success me-2'>
                                                                    Edit
                                                                </Link>
                                                                <Button variant="danger" onClick={() => deleteUser(row.idUser)}>
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}