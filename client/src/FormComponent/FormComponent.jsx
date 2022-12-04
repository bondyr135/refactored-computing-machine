import React, { useRef, useState, useEffect } from 'react';
import './FormComponent.css';

const  FormComponent = ({ fetchVideoData, canDownload, downloadVideo }) => {
  const urlRef = useRef('');
  const validRef = useRef(false);
  const [ inputValidation, setInputValidation ] = useState(false);

  useEffect(() => {
    if (!canDownload) {
      urlRef. current.value = '';
      validRef.current = false;
      setInputValidation(false);
    }
  }, [canDownload]);

  const validateUrl = url => {
    if (url.length < 32) {
      validRef.current = false;
      return false;
    }
    if (url.substring(0, 32) !== 'https://www.youtube.com/watch?v=') {
      validRef.current = false;
      return false;
    }
    validRef.current = true;
    return true;
  }

  const fetchUrl = async (e) => {
    e.preventDefault();
    let isValid = validateUrl(urlRef.current.value);
    setInputValidation(isValid);
    if (isValid) fetchVideoData(urlRef.current.value);
  }

  const clearUrl = e => {
    e.preventDefault();
    urlRef.current.value = '';
    validRef.current = false;
    setInputValidation(false);
  }

  const downloadRequest = (e) => {
    e.preventDefault();
    if (inputValidation) downloadVideo(urlRef.current.value);
  }

  return (
    <div className='form-container'>
      <form onSubmit={downloadRequest} className="form">

        <div className="field input">
          <div className='input box'>
          <label htmlFor="url">Paste the URL address of the YouTube you'd like to download: </label>
            <input className='input url-field' id="url" ref={urlRef} name="url" type="url" disabled={inputValidation} required />
            <button className='clear input' onClick={clearUrl}>Clear URL</button>
          </div>
          <button className='fetch input' onClick={fetchUrl}>Check URL</button>
        </div>

        <div className="field btn">
          <a className='btn link' name="submit" href={inputValidation ? urlRef.current.value : ''} type="submit" download value="download">
            <button className='btn download' disabled={!canDownload}>
              Download
            </button>
          </a>
        </div>
        
      </form>
    </div>
  )
}

export default FormComponent