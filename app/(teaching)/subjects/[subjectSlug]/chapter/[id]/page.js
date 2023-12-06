'use client'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import EyeTrackingCursor from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/eyetracking";
import HeatmapComponent from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/heatmap";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";
import {error} from "next/dist/build/output/log";
import {checkIsCamApproved, requestCamApprove} from "@/ui/webcam-permission";
import {FloatButton, Modal, Spin} from "antd";
import {
    FloatingControl,
    SpinContainer
} from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/custom-styled-components";
import {
    AlignCenterOutlined, ClearOutlined, ExperimentFilled,
    ExperimentOutlined, EyeFilled,
    EyeOutlined, HeatMapOutlined,
    InteractionOutlined,
    LoadingOutlined,
    SwapOutlined
} from "@ant-design/icons";
import Environment from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/environment";
import {measureEngagement} from "@/utils/measure-engagement";
import {router} from "next/client";
import {useRouter} from "next/navigation";


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
    const router = useRouter()
    const chapter = params.id || 'No chapter selected'
    const [webgazerScriptLoaded, setWebgazerScriptLoaded] = useState(false)
    const [camApproved, setCamApproved] = useState(false)
    const [webgazerReady, setWebgazerReady] = useState(false)
    const [webgazerPause, setWebgazerPause] = useState(false)
    const [coords, setCoords] = useState({x: null, y: null})
    const [toggleHeatmap, setToggleHeatmap] = useState(false)
    const [toogleEyeTrackingCursor, setToogleEyeTrackingCursor] = useState(false)


    const [isSubtitle, setIsSubtitle] = useState(false)
    const [isFlip, setIsFlip] = useState(false)


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
                    console.log(isFlip)
                    let envDesc = describeEnvironment(envRefParent, isFlip)
                    if (res.x && res.y) {
                        const roundUpTo = 50
                        setCoords({
                            x: Math.ceil(res.x / roundUpTo) * roundUpTo,
                            y: Math.ceil(res.y / roundUpTo) * roundUpTo
                        })
                        console.log(envDesc)
                        actionHandler(envDesc, {x: res.x, y: res.y})
                    }
                })
            }, 200)
            return () => {
                clearInterval(interval)
            }
        }
    }, [webgazerReady, webgazerPause, isFlip]);


    const envRefParent = useRef(null)

    function actionHandler(env, userInput) {
        let actions
        [, , , , actions] = measureEngagement(
            env,
            {x: userInput.x, y: userInput.y},
            {},
            60
        )

        if (actions.length !== 0) {
            for (let action of actions) {
                console.log(action)
                if (action === 'clean') {
                    dispatch(resetData())
                } else if (action === 'flip') {
                    setIsFlip(prev => !prev)

                } else if (action === 'subtitle') {
                    setIsSubtitle(prev => !prev)
                }
            }
        }
    }


    function describeEnvironment(element, flip = false) {
        return Object.values(element.current.children).map((v, i) => {
            const rect = v.getBoundingClientRect()
            let type = null
            if (v.id === 'overflow') {
                type = flip ? 'subject' : 'overflow'
            } else if (v.id === 'subject') {
                type = flip ? 'overflow' : 'subject'
            }
            return {
                id: v.id,
                type: type,
                rect
            }
        })
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
            {/*
            <button onClick={pauseResume}>{webgazerPause ? 'Resume' : 'Pause'}</button>
*/}

            {toggleHeatmap ? <HeatmapComponent newDataPoints={coords}/> : null}
            {toogleEyeTrackingCursor ? <EyeTrackingCursor coords={coords} pause={webgazerPause}/> : null}


            <FloatingControl>
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
                }}>request
                </button>
                <button onClick={() => setToggleHeatmap(prev => !prev)}>Heatmap</button>
                <button onClick={() => setToogleEyeTrackingCursor(prev => !prev)}>Gaze</button>


            </FloatingControl>


            <FloatButton.Group
                trigger={'hover'}
                style={{right: 70 + 70}}
                icon={<EyeFilled/>}

            >
                <FloatButton icon={<HeatMapOutlined/>} tooltip={<div>Heatmap</div>}
                             onClick={() => {
                                 setToggleHeatmap(prev => !prev)
                             }}/>
                <FloatButton icon={<EyeOutlined/>} tooltip={<div>Gaze Cursor</div>}
                             onClick={() => {
                                 setToogleEyeTrackingCursor(prev => !prev)
                             }}/>


            </FloatButton.Group>
            <FloatButton.Group
                trigger={'hover'}
                icon={<ExperimentFilled/>}
                style={{right: 70}}

            >
                <FloatButton icon={<AlignCenterOutlined/>} tooltip={<div>Subtitle</div>}
                             onClick={() => {
                                 setIsSubtitle(prev => !prev)
                             }}/>
                <FloatButton icon={<SwapOutlined/>} tooltip={<div>Flip</div>}
                             onClick={() => {
                                 setIsFlip(prev => !prev)
                             }}/>

            </FloatButton.Group>
            {toggleHeatmap ? <FloatButton icon={<ClearOutlined/>}
                                          tooltip={<div>Clean Heatmap</div>}
                                          onClick={() => dispatch(resetData())}
                                          style={{right: 70 + 70 + 70}}
            /> : null}


            <Environment isFlip={isFlip}
                         isSubtitle={isSubtitle}
                         domEnv={envRefParent}
                         onEndedFn={() => {
                             router.push('/quiz')
                         }}
            />


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
