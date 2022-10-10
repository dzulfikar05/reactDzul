//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Dashboard() {

    //state user
    const [user, setUser] = useState({});

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://127.0.0.1:8000/api/user')
            .then((response) => {

                //set response user to state
                setUser(response.data);
            })
    }

    //hook useEffect
    useEffect(() => {

        //check token empty
        if (!token) {

            //redirect login page
            history.push('/');
        }

        //call function "fetchData"
        fetchData();
    }, []);

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://127.0.0.1:8000/api/logout')
            .then(() => {

                //remove token from localStorage
                localStorage.removeItem("token");

                //redirect halaman login
                history.push('/');
            });
    };

    var html = `
    
    `;

    return (

        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div>
                                        Selamat Datang <strong className="text-uppercase">{user.nickname}</strong>
                                    </div>
                                    <span className='fs-5'>Di RESTO APP  </span>
                                </div>
                                <div className='col-md-6 d-flex justify-content-end'>

                                    <nav className="navbar navbar-expand-lg navbar-light ">
                                        <div className="collapse navbar-collapse" id="navbarNav">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <a className="nav-link" style={{ fontSize: "14px" }} href="menu/view">  Menu</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" style={{ fontSize: "14px" }} href="category/view">Category</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" style={{ fontSize: "14px" }} href="tag/view">Tag</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" style={{ fontSize: "14px" }} href="user/view">User</a>
                                                </li>

                                            </ul>
                                        </div>
                                    </nav>

                                </div>
                            </div>

                            <hr />
                            <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;