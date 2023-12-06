'use client'
import React, {useEffect, useState} from "react";
import {checkIsCamApproved, requestCamApprove} from "@/ui/webcam-permission";
import {SpinContainer} from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/custom-styled-components";
import {Modal, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import EyeTrackingCursor from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/eyetracking";
import styled from "styled-components";



const CalibrationDots = styled.div`
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
`

function CamWarningModal({isOpen, onOkFn, onCancelFn, okText, cancelText}) {

    return (<Modal title={'No cam waring'}
                   open={isOpen}
                   onOk={onOkFn}
                   okText={okText}
                   onCancel={onCancelFn}
                   cancelText={cancelText}
    >
        <p>No cam permission</p>

    </Modal>)
}

function Page(props) {

    const [webgazerScriptLoaded, setWebgazerScriptLoaded] = useState(false)
    const [camApproved, setCamApproved] = useState(false)
    const [webgazerReady, setWebgazerReady] = useState(false)
    const [webgazerPause, setWebgazerPause] = useState(false)
    const [coords, setCoords] = useState({x: null, y: null})
    const [modalIsOpen, setModalIsOpen] = useState(false)


    useEffect(() => {
        window.saveDataAcrossSessions = true
        loadWebgazerScript(setWebgazerScriptLoaded)
        checkIsCamApproved().then(res => {
            if (res) {
                setCamApproved(res)

            } else {
                setModalIsOpen(true)
            }
        })

    }, []);

    useEffect(() => {
        if (webgazerScriptLoaded) {
            console.log('webgazer loaded')
            console.log(window.webgazer)
            window.webgazer.showVideoPreview(false)
            window.webgazer.showPredictionPoints(false)
            //window.webgazer.applyKalmanFilter(false)
            //window.webgazer.setRegression("weightedRidge")
            window.webgazer.begin().then(res => {
                console.log('begin')
                setWebgazerReady(true)
            }).catch(error => {
                console.log(error)
                setModalIsOpen(true)
            })


        }


        return () => {
            console.log('will unmount')
            if (webgazerScriptLoaded) {
                console.log('stop webgazer')
                window.webgazer.pause()
                window.webgazer.end()
                window.webgazer.stopVideo()
            }
        }

    }, [webgazerScriptLoaded]);


    useEffect(() => {


        if (webgazerReady && !webgazerPause) {
            const interval = setInterval(() => {
                window.webgazer.getCurrentPrediction().then(res => {
                    if (res.x && res.y) {
                        const roundUpTo = 50
                        setCoords({
                            x: Math.ceil(res.x / roundUpTo) * roundUpTo,
                            y: Math.ceil(res.y / roundUpTo) * roundUpTo
                        })
                    }
                })
            }, 200)
            return () => {
                clearInterval(interval)
            }
        }
    }, [webgazerReady, webgazerPause]);

    function loadWebgazerScript(setState) {
        const script = document.getElementById('webgazer_script') || null
        if (!script) {
            const script = document.createElement('script')
            script.id = 'webgazer_script'
            script.src = '/js/webgazer.js'
            script.async = true
            script.onload = () => {
                console.log('script loaded')
                setState(true)
            }
            document.body.appendChild(script)
        }

    }

    function pauseResume() {
        if (webgazerScriptLoaded) {
            console.log(window.webgazer.isReady())
            if (webgazerPause) {
                console.log('webgazer resume')
                window.webgazer.resume()
            } else {
                console.log('webgazer pause')
                window.webgazer.pause()
            }
            setWebgazerPause(!webgazerPause)
        }
    }


    function modalHandleOk() {
        setModalIsOpen(false)
    }

    function modalHandleCancel() {
        setModalIsOpen(false)
        setWebgazerReady(true)
        pauseResume()

    }


    if (!webgazerReady) {
        return (<div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <SpinContainer><Spin indicator={<LoadingOutlined style={{fontSize: 100}}/>}/></SpinContainer>
            <CamWarningModal isOpen={modalIsOpen}
                             onOkFn={modalHandleOk}
                             okText={'Understood'}
                             onCancelFn={modalHandleCancel}
                             cancelText={'Continue without camera'}
            />

        </div>)
    }

    return (<div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    }}>
        {/*
            <button onClick={pauseResume}>{webgazerPause ? 'Resume' : 'Pause'}</button>
*/}

        <EyeTrackingCursor coords={coords} pause={webgazerPause}/>

        <CalibrationDots style={{left: 50, top: 50}}/>
        <CalibrationDots style={{right: 50, top: 50}}/>
        <CalibrationDots style={{left: 50, bottom: 50}}/>
        <CalibrationDots style={{right: 50, bottom: 50}}/>
        <CalibrationDots style={{right: '50%', bottom: '50%'}}/>

        <div style={{
            textAlign: 'center',
            fontSize: 20,
            top: '20vh',
            position: 'relative'
        }}>
            <p>Optimal performance is achieved when using this device in a well-lit room, positioned approximately 1 to
                1.2 meters from the camera.</p>
            <p>Calibration involves clicking and moving the cursor while maintaining direct eye contact.</p>
        </div>


    </div>)
}


export default Page
