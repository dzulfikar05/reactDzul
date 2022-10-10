import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
//import hook useHitory from react router dom
import { useHistory } from 'react-router';

export default function Menu() {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        await axios.get(`http://127.0.0.1:8000/api/menus`).then(({ data }) => {
            setMenus(data);
        });
    };

    const deleteMenut = async (id) => {
        const isConfirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios
            .delete(`http://127.0.0.1:8000/api/menus/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                fetchMenus();
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: "error",
                });
            });
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-6 my-3">
                            <span className="  fs-4"><strong>Menu</strong></span>
                        </div>
                        <div className="col-6 my-3">
                            <Link
                                className="btn btn-primary mb-2 float-end"
                                to={"/menu/create"}
                            >
                                Create
                            </Link>
                            <Link className='btn btn-secondary mb-2 mx-3 float-end' to={"/dashboard"}>
                                Back
                            </Link>
                        </div>
                        <div className="col-12">
                            <div className="card card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Kategori</th>
                                                <th>Deskripsi</th>
                                                <th>Harga</th>
                                                {/* <th className="th-rating">Rating Count</th> */}
                                                {/* <th className="th-rating">Rating Sum</th> */}
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {menus.length > 0 &&
                                                menus.map((row, key) => (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.idCategory}</td>
                                                        <td>{row.description}</td>
                                                        <td>{row.price}</td>
                                                        <td>
                                                            <Link
                                                                to={`/menu/edit/${row.idMenu}`}
                                                                className="btn btn-success me-2"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => deleteMenut(row.idMenu)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
