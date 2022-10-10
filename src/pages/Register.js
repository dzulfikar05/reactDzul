//import hook react
import React, { useState } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Register() {

    //define state
    const [nickname, setNickname] = useState("");
    const [commonname, setCommonname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useHistory();

    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();
        
        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('nickname', nickname);
        formData.append('commonname', commonname);
        formData.append('email', email);
        formData.append('password', password);
        // formData.append('password_confirmation', passwordConfirmation);

        //send data to server
        await axios.post('http://127.0.0.1:8000/api/register', formData)
        .then(() => {
            alert('Berhasil menambahkan data, akan diarahkan ke halaman Login')
            //redirect to logi page
            history.push('/');
        })
        .catch((error) => {

            //assign error to state "validation"
            setValidation(error.response.data);
        })
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN REGISTER</h4>
                            <hr/>
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">NICKNAME</label>
                                            <input type="text" className="form-control rounded-side" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Masukkan Nama Lengkap"/>
                                        </div>
                                        {
                                        validation.nickname && (
                                            <div className="alert alert-danger">
                                                {validation.nickname[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">COMMONNAME</label>
                                            <input type="text" className="form-control"rounded-side value={commonname} onChange={(e) => setCommonname(e.target.value)} placeholder="Masukkan Nama Lengkap"/>
                                        </div>
                                        {
                                        validation.commonname && (
                                            <div className="alert alert-danger">
                                                {validation.commonname[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">ALAMAT EMAIL</label>
                                            <input type="email" className="form-control"rounded-side value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.email[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                {/* </div>
                                <div className="row"> */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">PASSWORD</label>
                                            <input type="password" className="form-control"rounded-side value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                        </div>
                                        {
                                            validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    {/* <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">KONFIRMASI PASSWORD</label>
                                            <input type="password" className="form-control"rounded-side value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password"/>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='mt-3 mb-4 d-flex justify-content-end'>
                                    <a href='/'>Sudah Punya Akun ?</a>
                                </div>
                                <div className='d-flex justify-content-end'> 
                                    <button type="submit" className="btn btn-primary rounded-side"><span className='mx-3'>REGISTER</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;