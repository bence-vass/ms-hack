'use client'

import {Col, Row} from "antd";
import {useEffect, useRef, useState} from "react";
import {overflow_videos} from "@/app/showcase/environment/dummy_videos";
import {error} from "next/dist/build/output/log";
import styled from "styled-components";


const CustomVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transform: ${props => props.isFlip && props.negativeTranslate ? 'translate(-100%, 0)' : null};
  transform: ${props => props.isFlip && !props.negativeTranslate? 'translate(100%, 0)' : null};
`





function Page() {


    const domEnv = useRef(null)

    const [currentSub, setCurrentSub] = useState('Some subscript')
    const [currentOverflowVideoSrc, setCurrentOverflowVideoSrc] = useState()
    const [currentSubjectVideoSrc, setCurrentSubjectVideoSrc] = useState()
    const videoPlayerOverflow = useRef(null)
    const videoPlayerSubject = useRef(null)

    function getNextVideo(list) {
        const rand = Math.floor(Math.random() * list.length)
        return list[rand].url
    }

    useEffect(() => {
        setCurrentSubjectVideoSrc(getNextVideo(overflow_videos))
        setCurrentOverflowVideoSrc(getNextVideo(overflow_videos))
    }, []);


    const [isFlip, setIsFlip] = useState(false)
    function FlipContainers(){
        setIsFlip(prevState => !isFlip)
    }




    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }}>
        <h1>Environment Showcase</h1>
        <button onClick={() => FlipContainers()}>{isFlip ? 'Flip back' : 'Flip'}</button>

        <div id={'subscript'}>{}</div>


        <Row ref={domEnv} style={{height: '100%', }}>
            <Col span={12} id={'overflow'} style={{padding: 0}}>
                <CustomVideo

                    isFlip={isFlip}
                    ref={videoPlayerOverflow}
                    controls={false}
                    autoPlay={true}
                    muted={true}
                    onEnded={() => {
                        setCurrentOverflowVideoSrc(getNextVideo(overflow_videos))
                        videoPlayerOverflow.current.load()
                        videoPlayerOverflow.current.play()
                    }}
                >
                    { currentOverflowVideoSrc ? <source src={currentOverflowVideoSrc} type={'video/mp4'}/> : null }
                </CustomVideo>
            </Col>
            <Col span={12} id={'subject'}>
                <CustomVideo
                    negativeTranslate={true}
                    isFlip={isFlip}
                    ref={videoPlayerSubject}
                    controls={false}
                    autoPlay={true}
                    muted={true}
                    onEnded={() => {
                        setCurrentSubjectVideoSrc(getNextVideo(overflow_videos))
                        videoPlayerSubject.current.load()
                        videoPlayerSubject.current.play()
                    }}
                >
                    { currentSubjectVideoSrc ? <source src={currentSubjectVideoSrc} type={'video/mp4'}/> : null }
                </CustomVideo>
            </Col>
        </Row>


    </div>)
}


export default Page
