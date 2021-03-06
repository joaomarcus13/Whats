
import './perfil.css'

import HeadBack from '../headBack/headBack'
import Context from '../../context'
import { useContext } from 'react'

function Perfil({open,close}) {

    const {user} = useContext(Context) 



    return (
        <div className={`tela-perfil ${open.perfil?'open':''}`}>

            <HeadBack classe='perfil' text='Perfil' open={open} close={close}></HeadBack>

            <div className='tela-perfil-body'>
                <div className={`tela-perfil-img ${open.perfil?'open-img':''}`}>
                    <img src={user.img} alt="imagem perfil" />
                </div>
                
                <div className={`div-tela-perfil ${open.perfil?'open-perfil':''}`}>

                    <div className='tela-perfil-nome'>
                        <div className='nome-green'>Nome</div>
                        <div className='nome-icone'>
                            <h1>{user.name}</h1>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"></path></svg>
                            </span>
                        </div>

                    </div>

                    <div className='tela-perfil-nome'>
                        <div className='nome-green'>Recado</div>
                        <div className="nome-icone">
                            <h1>Disponivel</h1>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"></path></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Perfil