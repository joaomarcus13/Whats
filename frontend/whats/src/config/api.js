//import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import imgtest from '../assets/images/imgtest.png'
import imgUser from '../assets/images/7189bwar9pdx.jpg'

const firebaseConfig = {
    apiKey: "AIzaSyDYghYuMnOabQSx2Nhz1MAwGKyhj-Ne7ew",
    authDomain: "whats-acdbe.firebaseapp.com",
    projectId: "whats-acdbe",
    storageBucket: "whats-acdbe.appspot.com",
    messagingSenderId: "117760083877",
    appId: "1:117760083877:web:d293835fc37f1fa6f78a4c",
    measurementId: "G-1V2YKVGMF3"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);


}

function ifExists(id, conversas) {
    for (let i in conversas) {
        if (conversas[i].idUserChat === id) {
            console.log('ja existe')
            return true
        }
    }
    return false
}



export const api = {


    signIn: function (phone, appVerifier, setPhone, setCodigo, setProgressBar) {
        firebase.auth().signInWithPhoneNumber(phone, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log('confirmado')

            setPhone('')

            setCodigo(true)

            setProgressBar(false)

        }).catch((error) => {
            console.log(error)
        });
    },


    verifyUserToLogin: function (user, setUser, setConversas, setCadastro, setUserId,setSpinner) {
        firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUser({
                    id: user.uid,
                    img: imgUser,
                    name: doc.data().name,
                    status: doc.data().status,
                    conversas: doc.data().conversas,
                    contados: doc.data().contatos,
                    phone: doc.data().phone
                })

                if (doc.data().chats != null) {
                    setConversas(doc.data().chats)
                }

            } else {
                setCadastro(true)
                setSpinner(false)
                setUserId(user.uid)
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },


    createAccount: function (userId, phone, inputName, inputStatus) {
        firebase.firestore().collection('users').doc(userId).set({
            phone: phone,
            name: inputName,
            status: inputStatus ?? 'Disponivel',
            chats: []
        })
    },


    getContacts: async function (user, setContatos) {
        let contacts = []
        const res = await firebase.firestore().collection('users').get()

        res.forEach(e => {
            if (e.id !== user.id) {
                contacts.push({
                    id: e.id,
                    img: imgtest,
                    name: e.data().name,
                    status: e.data().status,
                    chats: e.data().chats,
                    phone: e.data().phone

                })
            }
        })
        setContatos(contacts)

    },


    getConversas: function (user, setConversas) {
        firebase.firestore().collection('users').doc(user.id).onSnapshot((doc) => {
            if (doc.exists) {
                if (doc.data().chats != null) {
                    setConversas(doc.data().chats)

                }
            }
        })
    },


    addConversa: async function (user, conversas, setChatactive, clickedChat) {
        if (!ifExists(clickedChat.id, conversas)) {
            let chat = null

            chat = await firebase.firestore().collection('conversas').add({
                mensagens: [],
                users: [user.id, clickedChat.id]
            })
            const conversa = {
                idChat: chat.id,
                name: clickedChat.name,
                img: imgtest,
                idUserChat: clickedChat.id,
                msg: '',
                hora: Date.now(),
                phone: clickedChat.phone
            }
            conversas.push(conversa)

            setChatactive(conversa)


            firebase.firestore().collection('users').doc(user.id).update({
                chats: firebase.firestore.FieldValue.arrayUnion(conversa)
            })


            firebase.firestore().collection('users').doc(clickedChat.id).update({
                chats: firebase.firestore.FieldValue.arrayUnion({
                    idChat: chat.id,
                    name: user.name,
                    img: imgUser,
                    idUserChat: user.id,
                    msg: '',
                    hora: Date.now(),
                    phone: user.phone
                })
            })

        } else {
            setChatactive(clickedChat)
        }
    },


    getMessages: function (chatactive, scrollRef, handleSetMsgs, setUsersInChat) {
        firebase.firestore().collection('conversas').doc(chatactive.idChat).onSnapshot(docs => {
            if (docs.exists) {

                handleSetMsgs(docs.data().mensagens)
                setUsersInChat(docs.data().users)

                if (scrollRef.current != null)
                    if (scrollRef.current.scrollHeight > scrollRef.current.offsetHeight) {
                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.offsetHeight
                    }
            }
        })
    },


    sendMessage: async function (user, users, chatactive, msg, inputRef, setMsg) {
        firebase.firestore().collection('conversas').doc(chatactive.idChat).update({
            mensagens: firebase.firestore.FieldValue.arrayUnion({
                emissor: user.id,
                text: msg,
                hora: Date.now()
            })
        })
        setMsg('')
        inputRef.current.focus()

        for (let i of users) {
            let cts = await firebase.firestore().collection('users').doc(i).get()
            let chats = [...cts.data().chats]
            for (let j of chats) {
                if (j.idChat === chatactive.idChat) {
                    j.msg = msg
                    j.hora = Date.now()

                }
            }
            await firebase.firestore().collection('users').doc(i).update({
                chats
            })
        }
    },



    deleteChat: function (conversas, chatactive, user) {
        for (let i in conversas) {
            if (conversas[i].idChat === chatactive.idChat) {
                conversas.splice(i, 1)
                firebase.firestore().collection('users').doc(user.id).update({
                    chats: conversas
                })
            }
        }

        firebase.firestore().collection('conversas').doc(chatactive.idChat).get().then((doc) => {

            if (doc.exists) {

                if (doc.data().users.length === 1) {
                    firebase.firestore().collection('conversas').doc(chatactive.idChat).delete().then(() => {
                        console.log('conversa apagada', chatactive.idChat)
                    })
                } else {
                    firebase.firestore().collection('conversas').doc(chatactive.idChat).update({
                        users: [chatactive.idUserChat]
                    })
                    console.log('user apagado', chatactive.idChat)
                }
            }
        })
    }



}

export default firebase




