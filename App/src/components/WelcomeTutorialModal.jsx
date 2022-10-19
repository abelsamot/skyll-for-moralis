import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import {useMoralis} from "react-moralis";
import {Button, Modal, Badge} from 'react-bootstrap'
import '../styles/styles.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BsFillArrowRightSquareFill} from 'react-icons/bs';

import {BsFillArrowLeftSquareFill} from 'react-icons/bs';

const WelcomeTutorialModal = (props)=>{
    const {user, Moralis}=useMoralis();
    const [userWallet,setUserWallet]=useState('')
    const [step, setStep] = useState(1)


    const connectUserWallet = async () => {
        await Moralis.enableWeb3()
        let account = Moralis.account
        console.log(account)
        await Moralis.link(account)
        setUserWallet(Moralis.account)
      };

    const tutorial = step === 1 ? <div> 
        Bonjour <span style={{fontWeight:"600"}}> {props.username} </span>,<br/><br/>
        Merci de faire confiance à <span style={{fontWeight:"600"}}> Stack Talent </span> dans ta  recherche d'un nouvel emploi dans le monde du web3!<br/><br/>
        Avant de pouvoir sélectionner la meilleure opportunité pour toi, Stack Talent souhaite <span style={{fontWeight:"600"}}> évaluer rapidement certaines de tes compétences </span> grâce à cette plateforme de test. <br/>  <br/>
        Les tests sont à temps limités et seront filmés afin d'éviter toute triche.  <br/> 

    </div> :  step === 2 ? <div > 
        
        Une fois ce petit tutoriel finit, tu arriveras sur ton profil où tu peux appercevoir deux onglet : "Track" et "Achievements". <br/><br/>
        Sur l'onglet "Track", tu retrouveras ton arbre de compétence. Ton but est de compléter cet arbre en réalisant tous les tests qui y sont présents. <br/>
        
        Pour cela, il te suffira de cliquer sur une compétence afin que le test démarre comme le montre la capture ci-dessous.
        <div className="d-flex justify-content-center" style={{marginTop:"30px", marginBottom:"30px"}}> <img style={{borderRadius:"10px"}} src="https://i.ibb.co/CngX6P1/Screenshot-2022-10-04-at-10-08-50.png" alt="Screenshot-2022-10-04-at-10-08-50" border="0"/></div>
        
    
    </div> : step === 3 ?
    <div> 
        Une fois que tu auras cliqué sur un test, mets toi dans un endroit calme où tu ne seras pas dérangé et à toi de jouer :) <br/>
        {/*<div className="d-flex justify-content-center" style={{marginTop:"30px", marginBottom:"30px"}}><img src="https://i.ibb.co/TLjvt0b/Screenshot-2022-10-04-at-10-29-24.png"  style={{borderRadius:"10px",border:"solid 1px #5c4dff"}} border="0"/></div>*/}
        Il te sera proposé à la fin de ton test de récupérer un NFT prouvant tes compétences. Tu pourras par la suite utiliser ce NFT unique sur la plateforme Skyll en cours de construction. <br/>  <br/>

        Pour cela, tu peux commencer par connecter ton wallet en cliquant sur le bouton ci-dessous :  <br/>

        <div className="d-flex justify-content-center">{userWallet==='' ? <Button style={{marginTop:"20px"}} onClick={connectUserWallet}> Link Wallet </Button> :
         <Badge style={{marginTop:"20px"}}> Wallet connected </Badge>}</div>


    </div> : <div>
        Une fois le premier test complété, ton arbre de compétences commencera à se remplir. À toi de finir les autres tests afin d'avoir un arbre complet !  <br/>  <br/>
        <div className="d-flex justify-content-center" style={{marginTop:"30px", marginBottom:"30px"}}> <img style={{borderRadius:"10px"}} src="https://i.ibb.co/bQWmc7r/Screenshot-2022-10-04-at-10-54-36.png" alt="Screenshot-2022-10-04-at-10-08-50" border="0"/></div>
        Tu pourras alors voir tes résultats et badges dans l'onglet "Skills". <br/>  <br/>

        <span style={{fontWeight:"600"}}> Maintenant, à toi de jouer et bonne chance ! </span>
    </div>

    return <div>
            <Modal size="lg" show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton >
                <Modal.Title className="ms-auto" style={{marginTop:"10px"}}> Bienvenue {props.username}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{padding:"50px"}}>{tutorial}</Modal.Body>
                <Modal.Footer>
                <ProgressBar now={60} />
                {step != 1 ? <button><BsFillArrowLeftSquareFill size={35} style={{color:"#5c4dff"}} onClick={()=>setStep(step-1)}></BsFillArrowLeftSquareFill></button> : <div></div>}
                {step != 4 ? <button><BsFillArrowRightSquareFill size={35} style={{color:"#5c4dff"}} onClick={()=>setStep(step+1)}></BsFillArrowRightSquareFill></button> : 
                <Button onClick={props.handleClose} style={{color:"white"}}> Close </Button>}
                </Modal.Footer>
            </Modal>
    </div>
}

export default WelcomeTutorialModal