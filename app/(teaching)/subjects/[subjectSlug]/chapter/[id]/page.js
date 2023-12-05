'use client'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import EyeTrackingCursor from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/eyetracking";
import HeatmapComponent from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/heatmap";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";
import {error} from "next/dist/build/output/log";
import {checkIsCamApproved, requestCamApprove} from "@/ui/webcam-permission";
import {Modal, Spin} from "antd";
import {SpinContainer} from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/custom-styled-components";
import {LoadingOutlined} from "@ant-design/icons";
import Environment from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/environment";


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


function Page({params}) {
    const dispatch = useAppDispatch()

    const chapter = params.id || 'No chapter selected'
    const [webgazerScriptLoaded, setWebgazerScriptLoaded] = useState(false)
    const [camApproved, setCamApproved] = useState(false)
    const [webgazerReady, setWebgazerReady] = useState(false)
    const [webgazerPause, setWebgazerPause] = useState(false)
    const [coords, setCoords] = useState({x: null, y: null})
    const [toggleHeatmap, setToggleHeatmap] = useState(false)
    const [toogleEyeTrackingCursor, setToogleEyeTrackingCursor] = useState(false)

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

    const [modalIsOpen, setModalIsOpen] = useState(false)

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
            <div><h3>Chapter {chapter}</h3></div>
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
        }}>

            {toggleHeatmap ? <HeatmapComponent newDataPoints={coords}/> : null}
            {toogleEyeTrackingCursor ? <EyeTrackingCursor coords={coords} pause={webgazerPause}/> : null}

            <button onClick={pauseResume}>{webgazerPause ? 'Resume' : 'Pause'}</button>
            <button onClick={() => dispatch(resetData())}>Clean heatmap</button>
            <button onClick={() => checkIsCamApproved().then(res => {
                console.log('Cam permission: ', res)
                if (res) {
                    setCamApproved(true)
                } else {
                    setModalIsOpen(true)
                }
            })}>check
            </button>
            <button onClick={() => {
                requestCamApprove()
            }}>request</button>
            <button onClick={() => setToggleHeatmap(prev => !prev)}>Heatmap</button>
            <button onClick={() => setToogleEyeTrackingCursor(prev => !prev)}>Gaze</button>



            <Environment/>

        </div>
    );
}

export default Page;

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
