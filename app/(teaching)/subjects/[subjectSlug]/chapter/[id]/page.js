'use client'
import React, {useEffect, useLayoutEffect, useState} from 'react';


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


async function waitForWebgazerModel() {
    /*const n= 10
    let ready = false
    for(let i=1; i <= n; i++){
        if(ready){
            break
        }
        await new Promise(res => setTimeout(res, 1500 * (1 + (i/n))))
        console.log(i, ' sec')
        window.webgazer.getCurrentPrediction().then(res => {
            console.log(res)
            ready = true
        })
    }*/
    await window.webgazer.getCurrentPrediction().teh
}

async function setPrediction() {
    const attempts = 10
    let ready = false
    console.log(window.webgazer)

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
            //window.webgazer.setRegression("weightedRidge")
            window.webgazer.setRegression("ridge")
            window.webgazer.begin().then(res => {
                console.log('begin')
                setWebgazerReady(true)
            })
            window.webgazer.showVideoPreview(false)
            //window.webgazer.applyKalmanFilter(true)
            window.webgazer.showPredictionPoints(false)

        }


        return () => {
            console.log('will unmount')
            if (webgazerScriptLoaded) {
                console.log('stop webgazer')
                window.webgazer.end()
                window.webgazer.stopVideo()
            }
        }

    }, [webgazerScriptLoaded]);

    useEffect(() => {
        if (webgazerReady && !webgazerPause) {
            const interval = setInterval(() => {
                window.webgazer.getCurrentPrediction().then(res => {
                    if(res.x && res.y){
                        setCoords({x: res.x, y: res.y})
                    }
                })
            }, 250)
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

    return (
        <div>
            <EyeTrackingCursor coords={coords} pause={webgazerPause}/>
            <h3>Chapter {chapter}</h3>
            <h2>{webgazerReady ? 'Ready' : 'Loading...'}</h2>
            <button onClick={pauseResume}>{webgazerPause ? 'Resume' : 'Pause'}</button>
        </div>
    );
}

export default Page;


function EyeTrackingCursor({coords, pause}) {

    const dotStyle = {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'red',
        position: 'absolute',
    }
    if (pause || (coords.x == null && coords.y == null)) {
        return null
    } else {
        return <div style={{
            width: '100vw',
            height: '100vh',
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
            pointerEvents: 'none'
        }}>
            <div style={{
                ...dotStyle,
                top: coords.y || 0,
                left: coords.x || 0,
            }}></div>
        </div>
    }
}
