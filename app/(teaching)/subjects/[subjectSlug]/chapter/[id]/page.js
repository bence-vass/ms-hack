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


async function waitForWebgazerModel(){
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

function setPrediction(){

}




function Page({params}) {
    const chapter = params.id || 'No chapter selected'
    const [webgazerLoaded, setWebgazerLoaded] = useState(false)
    const [webgazerPause, setWebgazerPause] = useState(false)
    useEffect( () => {
        window.saveDataAcrossSessions = true
        loadWebgazerScript(setWebgazerLoaded)


    }, []);


    useEffect( () => {
        if(webgazerLoaded){
            console.log('webgazer loaded')
            console.log(window.webgazer)
            window.webgazer.begin()
            console.log('loaded model')
            setPrediction()
        }


        return () => {
            console.log('will unmount')
            if(webgazerLoaded){
                console.log('stop webgazer')
                window.webgazer.end()
                window.webgazer.stopVideo()
            }
        }

    }, [webgazerLoaded]);

    useEffect(() => {
        console.log('webgazer Ready efect')

    }, []);

    function pauseResume(){
        if(webgazerLoaded){
            console.log('switch')
            if(webgazerPause){
                window.webgazer.resume()
            } else {
                window.webgazer.pause()
            }
            setWebgazerPause(!webgazerPause)
        }
    }

    return (
        <div>
            <h3>Chapter {chapter}</h3>
            <h3>Chapter {chapter}</h3>
            <h3>Chapter {chapter}</h3>
            <h3>Chapter {chapter}</h3>
            <h3>Chapter {chapter}</h3>
            <button onClick={pauseResume}>{webgazerPause ? 'Resume' : 'Pause'}</button>
        </div>
    );
}

export default Page;


function GazerWrapper({children}) {
    if (typeof window !== 'undefined') {
        return <>{children}</>
    }
    return null
}
