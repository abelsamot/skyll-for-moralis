import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import '../styles/test.css'
import dayjs from "dayjs";

const defaultRemainingTime={
    seconds:'00',
    minutes:'00'
}

const CountDownTimer = (props) =>{

    const getRomainingTimeUntilMsTimeStamp = (timestampMs) =>{

        const timestamDayjs= dayjs(timestampMs);
        const nowDayjs = dayjs()
        if(timestamDayjs.isBefore(nowDayjs)){
            props.quizStep()
            return {
                seconds:'00',
                minutes:'10'
            }
        }
        return {
            seconds:getRemainingSeconds(nowDayjs,timestamDayjs),
            minutes:getRemainingMinutes(nowDayjs,timestamDayjs)
        }
    }

    const getRemainingSeconds =(nowDayjs, timestamDayjs) =>{
        const seconds = timestamDayjs.diff(nowDayjs,'seconds') % 60
        return seconds

    }
    const getRemainingMinutes =(nowDayjs, timestamDayjs) =>{
        const minutes = timestamDayjs.diff(nowDayjs,'minutes')
        return minutes
    }
    const [remainintTime, setRemainingTime]= useState(defaultRemainingTime)

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            updateRemainingTime(props.countdownTimeStampMs);
        },1000);
        return ()=> clearInterval(intervalId);
    },[props.countdownTimeStampMs])
    function updateRemainingTime(countdown){
        setRemainingTime(getRomainingTimeUntilMsTimeStamp(countdown));

    }
    return  <div style={{marginTop:"20px"}}>
    <span style={{marginLeft:"5px"}}>{remainintTime.minutes}</span>
    <span style={{marginLeft:"2px"}}>min</span>
    <span style={{marginLeft:"7px"}}>{remainintTime.seconds}</span>
    <span style={{marginLeft:"2px"}}>sec</span>
        </div>
        
    }

export default CountDownTimer;