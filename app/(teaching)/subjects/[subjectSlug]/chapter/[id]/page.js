'use client'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import EyeTrackingCursor from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/eyetracking";
import HeatmapComponent from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/heatmap";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";


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
    const chapter = params.id || 'No chapter selected'
    const [webgazerScriptLoaded, setWebgazerScriptLoaded] = useState(false)
    const [webgazerReady, setWebgazerReady] = useState(false)
    const [webgazerPause, setWebgazerPause] = useState(false)
    const [coords, setCoords] = useState({x: null, y: null})

    useEffect(() => {
        window.saveDataAcrossSessions = true
        loadWebgazerScript(setWebgazerScriptLoaded)


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


    const dispatch = useAppDispatch()

    return (
        <div>
            <HeatmapComponent newDataPoints={coords}/>


            <EyeTrackingCursor coords={coords} pause={webgazerPause}/>

            <h3>Chapter {chapter}</h3>
            <h2>{webgazerReady ? 'Ready' : 'Loading...'}</h2>
            <button onClick={pauseResume}>{webgazerPause ? 'Resume' : 'Pause'}</button>

            <button onClick={() => dispatch(resetData())}>Clean heatmap</button>

        </div>
    );
}

export default Page;

