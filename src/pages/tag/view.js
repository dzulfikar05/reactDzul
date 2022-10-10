import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Tag() {

    const [tags, setTags] = useState([])

    useEffect(() => {
        fetchTags()
    }, [])

    const fetchTags = async () => {
        await axios.get(`http://127.0.0.1:8000/api/tags`).then(({ data }) => {
            setTags(data)
        })
    }

    const deleteTag = async (id) => {
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

        await axios.delete(`http://127.0.0.1:8000/api/tags/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchTags()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>

            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-6 my-3'>
                                <span className='mb-3 fs-4'><strong>Tag</strong></span>
                            </div>
                            <div className='col-6 my-3 d-flex justify-content-end'>
                                <Link className='btn btn-secondary mb-2 mx-3 float-end' to={"/dashboard"}>
                                    Back
                                </Link>
                                <Link className='btn btn-primary mb-2 float-end' to={"/tag/create"}>
                                    Create
                                </Link>
                            </div>
                        </div>
                        <div className="col-12">


                            <div className="card card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tags.length > 0 && (
                                                    tags.map((row, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{row.name}</td>
                                                            <td>
                                                                <Link to={`/tag/edit/${row.idTag}`} className='btn btn-success me-2'>
                                                                    Edit
                                                                </Link>
                                                                <Button variant="danger" onClick={() => deleteTag(row.idTag)}>
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