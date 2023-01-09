import React from "react";
import { BsVolumeUp,BsMicFill,BsFillMicMuteFill,BsEraserFill } from "react-icons/bs";
import {MdContentCopy} from "react-icons/md"; 
import copy from "copy-to-clipboard";
import { useSpeechSynthesis} from "react-speech-kit";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

const Speech = () => {
  const { speak } = useSpeechSynthesis();
  const { transcript, browserSupportsSpeechRecognition,resetTranscript} = useSpeechRecognition();
  const copyToClipBoard = () =>{
    copy(transcript);
  }
  if(!browserSupportsSpeechRecognition){
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div style={{backgroundColor:"#F7F9F9",border: "2px solid #D6EAF8"}} className="container">
      <div className="row">
      <div className="col-sm-6">
        <form>
          <textarea
            className="materialize-textarea"
            placeholder="Enter Text"
            value={transcript}
            
          />
          <button style={{width:"50px" ,height:"50px",border: '10px solid #ffffff',borderRadius:"50px"}}
           onClick={(e)=>{e.preventDefault();SpeechRecognition.startListening({continuous:true})}}
          >
          <i><BsMicFill/></i> 
        </button>
        {transcript!==""?
          <button style={{width:"50px" ,height:"50px",border: '10px solid #ffffff',borderRadius:"50px"}}
            onClick={(e)=>{e.preventDefault();speak({ text: transcript })}}
          >
            <i><BsVolumeUp/></i>
          </button>:""}
          {transcript!==""?
          <button style={{width:"50px" ,height:"50px",border: '10px solid #ffffff',borderRadius:"50px"}}
            onClick={(e)=>{e.preventDefault();
              SpeechRecognition.stopListening()}}
          >
            <i><BsFillMicMuteFill/></i>
          </button>:""}
          {transcript!==""?
          <button style={{width:"50px" ,height:"50px",border: '10px solid #ffffff',borderRadius:"50px"}}
            onClick={(e)=>{e.preventDefault();copyToClipBoard()}}
          >
            <i><MdContentCopy/></i>
          </button>:""}
          {transcript!==""?
          <button style={{width:"50px" ,height:"50px",border: '10px solid #ffffff',borderRadius:"50px"}}
            onClick={(e)=>{e.preventDefault();resetTranscript()}}
          >
            <i><BsEraserFill/></i>
          </button>:""}
        </form>
        </div>
        </div>
    </div>
  );
};

export default Speech;

