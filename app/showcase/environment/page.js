'use client'

import {Col, FloatButton, Row} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {overflow_videos} from "@/app/showcase/environment/dummy_videos";
import {subtitle} from "@/app/showcase/environment/dummy_text";
import styled from "styled-components";
import {slicingWindows} from "@/utils/slicing-windows";
import Environment from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/environment";
import {
    AlignCenterOutlined, ClearOutlined,
    ExperimentFilled,
    EyeFilled,
    EyeOutlined,
    HeatMapOutlined,
    SwapOutlined
} from "@ant-design/icons";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";


const CustomVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition-duration: 300ms;
  transform: ${props => props.isFlip && props.negativeTranslate ? 'translate(-100%, 0)' : null};
  transform: ${props => props.isFlip && !props.negativeTranslate ? 'translate(100%, 0)' : null};
`


const SubtitleDiv = styled.div`
  position: absolute;
  text-align: center;
  z-index: 10;
  transform: translate(-50%, -50%);
  color: aliceblue;
  font-size: 3rem;
  font-weight: bold;
  max-width: 30vw;

  p {
    -webkit-text-stroke: .1rem #000;
  }
  
  b {
    color: red;
  }
`

/*

function Page() {
    const subtitleWindows = slicingWindows(subtitle, 5)
    let i = 0

    const domEnv = useRef(null)

    const [showSub, setShowSub] = useState(true)
    const [subCoords, setSubCoords] = useState({x: 0, y: 0})
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
        const rect = domEnv.current.children['overflow'].getBoundingClientRect()
        console.log(rect)
        setSubCoords({
            x: rect.x + (rect.right - rect.left) / 2,
            y: rect.y + (rect.bottom - rect.top) / 2
        })
        setCurrentSub(subtitleWindows[i])
        i += 1
        const interval = setInterval(() => {
            if(i < subtitleWindows.length){
                const sub = (<>
                    <p>{subtitleWindows[i]}</p>
                </>)
                setCurrentSub(subtitleWindows[i])
                i += 1
            } else {
                i = 0
            }
        }, 1000)


        return () => {
            clearInterval(interval)
        }

    }, []);


    const [isFlip, setIsFlip] = useState(false)

    function flipContainers() {
        setIsFlip(prevState => !prevState)
        const rect = domEnv.current.children['overflow'].getBoundingClientRect()
        if (!isFlip) {
            setSubCoords({
                x: rect.x + (rect.right - rect.left) * (3 / 2),
                y: rect.y + (rect.bottom - rect.top) / 2
            })
        } else {
            setSubCoords({
                x: rect.x + (rect.right - rect.left) / 2,
                y: rect.y + (rect.bottom - rect.top) / 2
            })
        }
    }


    function toggleSub() {
        setShowSub(prevState => !prevState)
    }


    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }}>
        <h1>Environment Showcase</h1>
        <button onClick={() => flipContainers()}>{isFlip ? 'Flip back' : 'Flip'}</button>
        <button onClick={() => toggleSub()}>{showSub ? 'Hide sub' : 'Show sub'}</button>

        <SubtitleDiv id={'subscript'} style={{
            left: subCoords.x,
            top: subCoords.y,
            display: showSub ? 'block' : 'none',
        }}>
            <p dangerouslySetInnerHTML={{__html: currentSub}}></p>
        </SubtitleDiv>


        <Row ref={domEnv} style={{height: '100%',}}>
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
                    {currentOverflowVideoSrc ? <source src={currentOverflowVideoSrc} type={'video/mp4'}/> : null}
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
                    {currentSubjectVideoSrc ? <source src={currentSubjectVideoSrc} type={'video/mp4'}/> : null}
                </CustomVideo>
            </Col>
        </Row>


    </div>)
}

*/



function Page(){


    const [isSubtitle, setIsSubtitle] = useState(false)
    const [isFlip, setIsFlip] = useState(false)



    return(<div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }}>




        <Environment isFlip={isFlip} isSubtitle={isSubtitle}/>



        <FloatButton.Group
            open={true}
            trigger={'click'}
            icon={<ExperimentFilled />}
            style={{
                right: 70
            }}
        >
            <FloatButton icon={<AlignCenterOutlined />} tooltip={<div>Subtitle</div>}
                         onClick={()=> {setIsSubtitle(prev => !prev)}}/>
            <FloatButton icon={<SwapOutlined />} tooltip={<div>Flip</div>}
                         onClick={()=> {setIsFlip(prev => !prev)}}/>

        </FloatButton.Group>



    </div>)
}

export default Page
