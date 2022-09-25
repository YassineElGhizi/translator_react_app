import {Alert, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import axios from "axios";
import base_url from "./myenv";

function Mytext() {
    let langagues = ["Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "German", "Greek", "Hungarian", "Italian", "Japanese", "Latvian", "Lithuanian", "Polish", "Portuguese", "Romanian", "Russian", "Slovak", "Slovenian", "Spanish", "Swedish",]
    let [chosen_lan, setChosen_lan] = useState('')
    let [target_lan, setTarget_lan] = useState('')
    let [txt, setTxt] = useState('')
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
            default:
                break
        }


    }

    let translate = async () => {
        setShow(false)
        if (chosen_lan !== '' && target_lan !== '' && txt !== '') {
            setErr({'status': false, 'body': ''})
            setWaiting(true)
            await axios.post(base_url, {
                "source": chosen_lan,
                "dest": target_lan,
                "text": btoa(unescape(encodeURIComponent(txt))),
                "version": "free"
            }, {timeout: 1000000}).then((res) => {
                console.log("😀 : ", atob(res.data))
                setTranslated(atob(res.data))
                setWaiting(false)
                setShow(true)
            }).catch((err) => {
                console.log("😪 : ", err)
                setWaiting(false)
            })
        } else {
            setErr({'status': true, 'body': 'Incomplete Operation !'})
        }
    }

    return (<div>
        <Card>
            <Card.Body>
                <Row>
                    {err.status && <Alert variant="danger">{err.body}</Alert>}
                    <Col sm="6" className="mt-1">
                        <Card.Title>
                            <Form.Select size="sm" style={{width: "50%"}} value={chosen_lan}
                                         onChange={(e) => handleChange(e, 1)}>
                                <option>Chose a Language</option>
                                {langagues.map(l => {
                                    return <option id={l}>{l}</option>
                                })}
                            </Form.Select>
                        </Card.Title>
                        <Card.Text>
                            <Form.Control style={{height: "20rem"}}
                                          as="textarea"
                                          placeholder="Paste you long text here"
                                          value={txt}
                                          onChange={(e) => handleChange(e, 3)}
                            />
                        </Card.Text>
                    </Col>
                    <Col sm="6" className="mt-1">
                        <Card.Title>
                            <Form.Select size="sm" style={{width: "50%"}} value={target_lan}
                                         onChange={(e) => handleChange(e, 2)}>
                                <option>Chose a Language</option>
                                {langagues.map(l => {
                                    return <option id={l}>{l}</option>
                                })}
                            </Form.Select>
                        </Card.Title>

                        <Card.Text>
                            {waiting && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                            {show && <Form.Control style={{height: "20rem"}} as="textarea" value={txttranslated}/>}
                        </Card.Text>
                    </Col>
                    <Col sm="12" className="mt-2">
                        <Button variant="dark" style={{width: "80%"}} onClick={translate}>
                            {waiting && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"
                                                 style={{color: "#0057b7"}}/>}

                            &nbsp;Translate Text&nbsp;
                            {waiting && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"
                                                 style={{color: "#ffd700"}}/>}

                        </Button>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    </div>);
}

export default Mytext;