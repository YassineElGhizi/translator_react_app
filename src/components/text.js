import {Alert, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import Form from 'react-bootstrap/Form';




import {useState} from "react";
import axios from "axios";
import base_url from "./myenv";
import Swal from 'sweetalert2'
import { Buffer } from "buffer";
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


function Mytext() {
    let langagues = ["Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "German", "Greek", "Hungarian", "Italian", "Japanese", "Latvian", "Lithuanian", "Polish", "Portuguese", "Romanian", "Russian", "Slovak", "Slovenian", "Spanish", "Swedish",]
    let [chosen_lan, setChosen_lan] = useState('')
    let [target_lan, setTarget_lan] = useState('')
    let [txt, setTxt] = useState('')
    let [file, setFile] = useState('')
    let [txttranslated, setTranslated] = useState('')
    let [err, setErr] = useState({'status': false, 'body': ''})
    let [waiting, setWaiting] = useState(false)
    let [show, setShow] = useState(false)

    let handleChange = (e, choice) => {
        switch (choice) {
            case 1:
                setChosen_lan(e.target.value)
                break
            case 2:
                setTarget_lan(e.target.value)
                break
            case 3:
                setTxt(e.target.value)
                break
            case 4:
                if(chosen_lan !== '' && target_lan !== ''){
                    MySwal.fire({
                        title: <p>Please Leave Your file is Finished !</p>,
                        text: "The Download will Start Automatically",
                        icon: 'info',
                        didOpen: () => {
                        MySwal.showLoading()
                        },
                    });
                    setWaiting(true)
                    let formData = new FormData();
                    let langs = {
                        "source": chosen_lan,
                        "dest": target_lan
                    }
                    formData.append("file", e.target.files[0]);
                    formData.append("langs", JSON.stringify(langs));
                    axios.post("http://146.190.232.192:5555", formData, {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }, {timeout: 1000000}).then((res) => {
                        const href = res.data
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', "file.pdf");
                        document.body.appendChild(link);
                        link.click();
                        setWaiting(false)
                        document.body.removeChild(link);
                        console.log("😀 : ", res)
                        MySwal.fire({
                            title: <p>Your Translated Document is Being Downloaded Successfully !</p>,
                            icon: 'success',
                        });
                    }).catch((err) => {
                        console.log("😪 : ", err)
                    })
                    break
                }
                else {
                    MySwal.fire({
                        title: <p>Choose Source and Target Languages First !</p>,
                        icon: 'error',
                    });
                }
            default:
                break
        }


    }

    let translate_text = async () => {
        setShow(false)
        if (chosen_lan !== '' && target_lan !== '' && txt !== '') {
            console.log("ok")
            setErr({'status': false, 'body': ''})
            setWaiting(true)
            if(txt.length > 500){ 
                MySwal.fire({
                    title: <p>Long Text inserted !</p>,
                    text: 'To provide the best quality, we ask you to wait few swconds untill our AI finishes processing your Text',
                    icon: 'info',
                });
                await axios.post(base_url, {
                    "source": chosen_lan,
                    "dest": target_lan,
                    "text": btoa(unescape(encodeURIComponent(txt))),
                    "version": "free"
                }, {timeout: 1000000}).then((res) => {
                    try{
                        console.log(atob(res.data));
                        setTranslated(atob(res.data))
                    }
                    catch(e){
                        console.log(res.data);
                        setTranslated(res.data)
                    }
                    setWaiting(false)
                    setShow(true)
                }).catch((err) => {
                    console.log("😪 : ", err)
                    setWaiting(false)
                })
            }
            else{
                axios.post("http://146.190.232.192/google", {"text" : txt, source_lan: chosen_lan, target_lan: target_lan})
                .then(result => {
                    console.log(result.data)
                    setTranslated(result.data)
                    setWaiting(false)
                    setShow(true)
                })
            }
        } else {
            MySwal.fire({
                title: <p>Choose Source and Target Languages First !</p>,
                icon: 'error',
                // didOpen: () => {
                //   MySwal.showLoading()
                // },
            });
            // setErr({'status': true, 'body': 'Incomplete Operation !'})
        }
    }

    return (<div>
        <section id="contact">
            <div className="section-content">
                <h1 className="section-header">
                {" "}
                <span
                    className="content-header wow fadeIn "
                    data-wow-delay="0.2s"
                    data-wow-duration="2s"
                >
                    {" "}
                    Translateka
                </span>
                .net
                </h1>
                <h3>
                Write and click <b>TRANSLATE</b>
                </h3>
            </div>
            {/* {err.status && <Alert variant="danger">{err.body}</Alert>} */}
            <div className="contact-section">
                <div style={{ zoom: "150%", margin: "1rem" }}>
                <div className="row d-flex justify-content-center">
                    <div className=" col-12 col-md-5">
                        <div className="form-group">
                            <label style={{ marginRight: "2%" }} htmlFor="from"> From</label>
                            <select  name="from" value={chosen_lan} onChange={(e) => handleChange(e, 1)}>
                            <option value="-Choose a Language-">-Choose a Language-</option>
                            {langagues.map(l => {
                                return <option value={l}>{l}</option>
                            })}
                            </select>{" "}
                            {/* <Form.Control onChange={(e) => handleChange(e, 4)} type="file" /> */}
                            <input className="hidden" id="files" onChange={(e) => handleChange(e, 4)} type="file" style={{ height: "2rem" }} />
                            {/* <label style={{ cursor: "pointer", marginLeft: "1em" }} for="files"><i className="fa fa-file-word-o" aria-hidden="true"/>   Select Docx File</label> */}
                        </div>
                    <div className="form-group">
                        <textarea
                        className="form-control"
                        id="original"
                        placeholder="Enter Your Text"
                        value={txt}
                        onChange={(e) => handleChange(e, 3)}
                        />
                    </div>
                    </div>

                    <div className=" col-12 col-md-5">
                        <div className="form-group">
                            <label style={{ marginRight: "2%" }} htmlFor="from"> To</label>
                            <select name="to" value={target_lan} onChange={(e) => handleChange(e, 2)}>
                            <option value="-Choose a Language-">-Choose a Language-</option>
                            {langagues.map(l => {
                                return <option value={l}>{l}</option>
                            })}
                            </select>{" "}
                        </div>
                        <div className="form-group">
                            <textarea
                                    className="form-control"
                                    id="translated"
                                    placeholder="Translated text will be here"
                                    value={txttranslated}
                                />
                        </div>
                    </div>
                </div>
                </div>
                
                <div style={{paddingBottom: "2rem"}} className="d-flex justify-content-center mt-3" >
                    <button style={{borderBlockColor: "white", width: "20em", fontSize: "1.6rem"}} type="button" className="btn btn-default submit" onClick={translate_text}>
                    {waiting && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" style={{color: "#0057b7", marginRight: "1em"}}/>}
                    <i className="fa fa-globe" aria-hidden="true" /> translate
                    {waiting && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" style={{color: "#ffd700", marginLeft: "1em"}}/>}
                    </button>
                </div>
            </div>
            </section>

    </div>);
}

export default Mytext;