import React, { useContext, useEffect, useState } from 'react';
import './aside.css'
import {api} from '../../config/api'
import Perfil from '../Perfil/perfil'
import NovaConversa from '../NovaConversa/novaConversa'
import Input from '../input/input'
import ItemConversa from '../itemconversa/itemconversa'
import Context from '../../context'
import Configuracoes from '../configuracoes/configuracoes';

function Aside( ) {

    const {chatactive,conversas,user,setChatactive,setConversas, isRightOpen} = useContext(Context) 
    const [isOptionsActive, setIsOptionActive] = useState(false)
    const [openDrawer, setOpenDrawer] = useState({novaconversa:false,perfil:false,configuracoes:false})
    
    useEffect(() => {
       
        api.getConversas(user,setConversas)

    },[user, setConversas])


    function handleOptions() {
        setIsOptionActive(!isOptionsActive)
        
    }

    function  handleChatActive(e) {
        setChatactive(e)
    }


    function handleDrawer(classe) {
        
       let obj = {...openDrawer}
       obj[classe] = true 
      
       setOpenDrawer(obj)
       !isOptionsActive || setIsOptionActive(false)   

    }




    return (
        <>
            <aside className={`aside ${isRightOpen? 'aside-min': ''}`}>
                <div className='head-aside'>
                    <div className='img-perfil' >
                        <img onClick={() => { handleDrawer('perfil') }} src={user.img} alt="" />
                    </div>

                    <div className='icons-aside'>

                        <div className="icon-stories-whats">
                            <svg id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 1.756.855 8.098 8.098 0 0 1 7.496-4.553.977.977 0 1 0 .051-1.952zM1.926 13.64a10.052 10.052 0 0 0 7.461 7.925.977.977 0 0 0 .471-1.895 8.097 8.097 0 0 1-6.012-6.386.977.977 0 0 0-1.92.356zm13.729 7.454a10.053 10.053 0 0 0 6.201-8.946.976.976 0 1 0-1.951-.081v.014a8.097 8.097 0 0 1-4.997 7.209.977.977 0 0 0 .727 1.813l.02-.009z"></path><path fill="#009588" d="M19 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path></svg></div>

                        <div className="icon-msgs-whats" onClick={() => { handleDrawer('novaconversa') }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg></div>

                        <div className={`icon-options-whats ${isOptionsActive?'bg-icon-click':''}`} id='opt-w' onFocus={handleOptions}  onClick={handleOptions} onBlur={handleOptions}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </div>
                    </div>


                    <div className={`options-whats ${isOptionsActive?'options-whats-open':''}`}>
                        <ul>
                            <li >Novo grupo</li>
                            <li>Criar uma sala</li>
                            <li>Perfil</li>
                            <li>Arquivadas</li>
                            <li> Favoritas</li>
                            <li onClick={() => { handleDrawer('configuracoes') }}>Configuracoes</li>
                            <li>Desconectar</li>
                        </ul>
                    </div>




                </div>

                <Input index={0} placeholder='Pesquisar ou começar uma nova conversa'></Input>

                <div className='chat-msgs'>
                    <ul>
                        {
                            Object.values(conversas).map(e =>
                                <ItemConversa
                                    key={e.idChat}
                                    active={chatactive.idChat === e.idChat}
                                    onClick={() => { handleChatActive(e) }}
                                    id={e.idChat}
                                    img={e.img}
                                    name={e.name}
                                    msgPrev={e.msg}
                                    hora={e.hora}>
                                </ItemConversa>)
                        }

                    </ul>
                </div>

            </aside>
            <Perfil open={openDrawer} close={setOpenDrawer}></Perfil>
            <NovaConversa open={openDrawer} close={setOpenDrawer}></NovaConversa>
            <Configuracoes open={openDrawer} close={setOpenDrawer}></Configuracoes>

        </>
    )

}


export default Aside