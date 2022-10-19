import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect,} from 'react'
import {useMoralis} from "react-moralis";
import {Button, Col, Row, Badge} from 'react-bootstrap'
import '../styles/styles.css';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../contract';
import LoadingIcons from 'react-loading-icons'

const web3 = new Web3(Web3.givenProvider);

const MintNFT = (props)=>{ 
    // The full Blob Object can be seen 
    // in the Console of the Browser
    useEffect(() => {
        convertFile()
        setName(props.nftName)
        setDescription(props.nftDescription)
      },[props.nftName]);


    const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
        u8arr[n] = bstr.charCodeAt(n);
        }
      return new File([u8arr], filename, {type:mime});
     }
    const convertFile =() => {
        const url = props.nftImage
        toDataURL(url)
        .then(dataUrl => {
            console.log('Here is Base64 Url', dataUrl)
            var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
            console.log("Here is JavaScript File Object",fileData)
            setFile(fileData)
   })
    }
    const {user, Moralis } = useMoralis();
    const [name, setName] = useState("");
    const [submited, setSubmited] = useState(false);
    const [nftCreated, setNftCreated] = useState(false);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState();
    const onSubmit = async (e) => {
        console.log("Minting ...")
        console.log(file)
        setSubmited(true)
        e.preventDefault();
        try {
          // Attempt to save image to IPFS
          const file1 = new Moralis.File(file.name, file);
          await file1.saveIPFS();
          const file1url = file1.ipfs();
          // Generate metadata and save to IPFS
          const metadata = {
            name,
            description,
            image: file1url,
          };

          const file2 = new Moralis.File(`${name}metadata.json`, {
            base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
          });

          await file2.saveIPFS();

          const metadataurl = file2.ipfs();
          // Interact with smart contract
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          const response = await contract.methods
            .mint(metadataurl)
            .send({ from: user.get("ethAddress") });
          // Get token id
          const tokenId = response.events.Transfer.returnValues.tokenId;
          // Display alert
          alert(
            `NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`
          );
        } catch (err) {
          console.error(err);
          alert("An error occured!");
        }
        setSubmited(false)
        setNftCreated(true)
      };

    return <div >


        <div className="d-grid gap-3">
        <div style={{height:"20px"}}></div>

            {!nftCreated ? <div className="d-flex justify-content-center">

                <Button onClick={onSubmit} className="w-50"> Mint NFT </Button></div> :  <div className="d-flex justify-content-center"><div className="w-75"> ✅ NFT created. You can see it on Opensea in the Polygon Network ! </div></div>}

           {submited ? <Row className="d-flex justify-content-center"> 
                <Col sm={5}>Please wait ...</Col>
                <Col> <LoadingIcons.TailSpin stroke="#5c4dff" strokeOpacity={.5} speed={1} /> </Col>
            </Row> : <></>}
        </div>
    </div>
}

export default MintNFT