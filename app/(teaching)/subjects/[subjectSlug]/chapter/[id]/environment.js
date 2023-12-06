import {Button, Col, Row} from "antd";
import {overflow_videos, subject_videos} from "@/app/showcase/environment/dummy_videos";
import styled from "styled-components";
import {slicingWindows} from "@/utils/slicing-windows";
import {subtitle} from "@/app/showcase/environment/dummy_text";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";


const CustomVideo = styled("video", {
    shouldForwardProp: props => props !== 'isflip' || props !== 'negativetranslate'
})`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition-duration: 300ms;
  transform: ${props => props.isflip === 'true' && props.negativetranslate === 'true' ? 'translate(-100%, 0)' : null};
  transform: ${props => props.isflip === 'true' && props.negativetranslate === 'false' ? 'translate(100%, 0)' : null};
  user-select: none;
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
const subtitleWindows = slicingWindows(subtitle, 5)


function Environment({isFlip, isSubtitle, domEnv, onEndedFn=null, }) {
    let i = 0


    const [subCoords, setSubCoords] = useState({x: 0, y: 0})
    const [currentSub, setCurrentSub] = useState('Some subscript')
    const [currentOverflowVideoSrc, setCurrentOverflowVideoSrc] = useState()
    const [currentSubjectVideoSrc, setCurrentSubjectVideoSrc] = useState()
    const videoPlayerOverflow = useRef(null)
    const videoPlayerSubject = useRef(null)
    const [isMute, setIsMute] = useState(true)
    const router = useRouter()

    function getNextVideo(list) {
        const rand = Math.floor(Math.random() * list.length)
        return list[rand].url
    }


    function toogleMute(){
        setIsMute(prevState => !prevState)
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
            if (i < subtitleWindows.length) {
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
            window.removeEventListener('focus', toogleMute)

        }

    }, []);


    function flipContainers() {
        const rect = domEnv.current.children['overflow'].getBoundingClientRect()
        if (isFlip) {
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


    useEffect(() => {
        flipContainers()
    }, [isFlip]);



    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }}>

        <SubtitleDiv id={'subscript'} style={{
            left: subCoords.x,
            top: subCoords.y,
            display: isSubtitle ? 'block' : 'none',
        }}>
            <p dangerouslySetInnerHTML={{__html: currentSub}}></p>
        </SubtitleDiv>


        <Row ref={domEnv} style={{height: '100%',}} onClick={() => toogleMute()}>
            <Col span={12} id={'overflow'} style={{padding: 0}}>
                <CustomVideo
                    negativetranslate={false.toString()}
                    isflip={isFlip.toString()}
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
                    negativetranslate={true.toString()}
                    isflip={isFlip.toString()}
                    ref={videoPlayerSubject}
                    controls={false}
                    autoPlay={true}
                    muted={isMute}
                    src={subject_videos[0].url}
                    onEnded={onEndedFn}
                    loop={!onEndedFn}

                >
                    {currentSubjectVideoSrc ? <source src={"https://classhackathon4076695827.blob.core.windows.net/asset-0194eac6-05f0-43ec-9427-ff2218c29969/teaching_vid_2.mp4"} type={'video/mp4'}/> : null}
                </CustomVideo>
            </Col>
        </Row>


    </div>)
}

export default Environment
