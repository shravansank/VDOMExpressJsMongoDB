import "ojs/ojinputtext";
import "ojs/ojformlayout";
import {useState, useRef} from "preact/hooks";

export function Login(){
    const [email, setEmail] = useState<String>("")
    const [pass, setPass] = useState<String>("")

    function loginEvent(){
        console.log(email + " " + pass);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, pass: pass})})
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }

    return (
        <>
        <oj-form-layout
                  id="formLayoutOptions"
                  max-columns="1"
                  direction="row"
                  user-assistance-density="compact">
            
            <h2>Login Page</h2>

            <oj-input-text value={email} onvalueChanged={(event: CustomEvent) => setEmail(event.detail.value)} label-hint="Email"></oj-input-text>
            <oj-input-password value={pass} onvalueChanged={(event: CustomEvent) => setPass(event.detail.value)} label-hint="Password"></oj-input-password>
            
            <oj-button onojAction={loginEvent}>Login</oj-button>
        </oj-form-layout>
        </>
    );
}