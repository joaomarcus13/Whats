
import './headBack.css'



function HeadBack({classe,text}) {

    function back() {
        const element = document.querySelector(`.${classe}`)
        element.classList.add('voltar')
        setTimeout(() => {
            element.classList.remove('voltar')
            element.style.display = 'none'
        }, 1000);
    }

    return (
        <div className='head-back'>
            <div className='icon-voltar' onClick={back}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path></svg>
            </div>
            <h1>{text}</h1>
        </div>
    )
}



export default HeadBack