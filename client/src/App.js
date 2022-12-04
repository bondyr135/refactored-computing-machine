import React, { useState, useRef } from 'react';
import './App.css';
import FormComponent from './FormComponent/FormComponent';
import ytLogo from './assets/download.png';
import ModalComponent from './ModalComponent/ModalComponent';

const probURL = '/try_yt';
const downloadURL = '/download_yt';


function App() {
  const urlRef = useRef();
  // const [toggleModal, setToggleModal] = useState(false);
  const openModalRef = useRef(false);
  const [response, setResponse] = useState(undefined)

  // Checking the URL for being a YouTube URL address
  const fetchVideoData = (validUrl) => {
    urlRef.current = validUrl;
    fetch(probURL + '?' + new URLSearchParams({
      videourl: validUrl
    }), {
      mode: "cors",
      method: "GET"
    })
      .then(res => {
        if (res.status !== 200) throw new Error('This is shit!');
        return res.json();
      })
      .then(data => {
        setResponse(data);
        // setToggleModal(true);
      })
      .catch(err => {
        console.log(err);
        urlRef.current = '';
      });

  }

  // The actual API call to download the video
  const downloadVideo = (toDownload) => {
    fetch(downloadURL + '?' + new URLSearchParams({
      videourl: toDownload
    }), {
      mode: "cors",
      method: "GET"
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('The URL you gave is not a valid YouTube URL');
        }
        return res.json()
      })
      .then(data => {
        console.log(data);
        openModalRef.current = true;
        setResponse(undefined);

        setTimeout(() => {
          // urlRef.current = '';
          // openModalRef.current = false;
          // setResponse(undefined);
          window.location.reload();
        }, 5000)
      })
      .catch(e => {
        console.error(e);
        setResponse(undefined);
      })
  }


  return (
    <div className='container'>
      <div className='img-container'>
        {response ? <iframe src={`${response.embed_url}`} title={`${response.title}`} className='video-image image' /> : <div className='just-holding image'><img className='yt_logo image' src={ytLogo} alt="YouTube logo" /></div>}
      </div>
      {openModalRef && <ModalComponent isOpen={openModalRef.current} />}
      <FormComponent fetchVideoData={fetchVideoData} downloadVideo={downloadVideo} canDownload={response ? true : false} />
    </div>
  )
}

export default App