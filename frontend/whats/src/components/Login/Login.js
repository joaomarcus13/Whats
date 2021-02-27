import { useContext } from 'react'
import Context from '../../context'
import firebase from '../../config/api'
import './Login.css'
import imgUser from '../../assets/images/7189bwar9pdx.jpg'


function Login() {

    const { setUser } = useContext(Context)

    function setUpRecaptcha() {


    }

    function handleLogin(e) {
        e.preventDefault()
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response)
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });




        const phoneNumber = '+11212345678'
        const appVerifier = window.recaptchaVerifier;
        console.log('recaptcha ok')
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {

                window.confirmationResult = confirmationResult;

                console.log('confirmado', confirmationResult)

                const code = '123456' //getCodeFromUserInput();
                confirmationResult.confirm(code).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(user)
                    // ...
                }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                });

            }).catch((error) => {
                console.log(error)

            });




        //criar aqui conta usuario com numero do celular e usar setUser
        //fazer validacao de formulario

        //setUser({ id: 1, img: imgUser, name: 'Joao Marcos', status: 'Disponivel' })

    }



    return (
        <div className='login'>

            <div id="recaptcha-container"></div>

            <div className='login-header'>
                <div className='login-header-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39"><path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg>
                    <span>WHATS</span>
                </div>
            </div>
            <div className='login-container'>
                <form onSubmit={handleLogin} >
                    <h1>LOGIN</h1>
                    numero telefone
                    <input type="text" placeholder='+99 99 99999-9999' id='phone' />
                    <input type="text" placeholder='codigo de verificacao' />

                    <button type='submit' id='sign-in-button'>Logar</button>
                    <div  ></div>
                </form>

            </div>

        </div>
    )
}

export default Login