'use client'

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Col, message, Row} from "antd";
import HeatmapComponent from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/heatmap";
import {useAppDispatch} from "@/redux/hooks";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";
import {useMousePosition} from "@/utils/mouse-position";
import {cleanCache, cleanFocusStore, measureEngagement} from "@/utils/measure-engagement";
import styled from "styled-components";


const StyledCol = styled(Col)`
  border: dashed black 2px;
  font-size: xx-large;
  text-align: center;
  display: table;

  background-color: ${props => props.id === 'col4' ? '#bdbdbd' : null};
  background-color: ${props => props.id === 'col6' ? '#5d5d5d' : null};


  p {
    vertical-align: middle;
    display: table-cell;
    pointer-events: none;
    user-select: none;
  }
`


function Page(props) {

    let cols = []
    for (let i = 0; i < 9; i++) {
        cols.push(<StyledCol key={i} id={'col' + (i + 1)} span={24 / 3}><p>{i + 1}</p></StyledCol>)
    }


    function describeEnvironment(element) {
        return Object.values(element.current.children).map((v, i) => {
            const rect = v.getBoundingClientRect()
            let type = null
            if (i === 3) {
                type = 'overflow'
            } else if (i === 5) {
                type = 'subject'
            }
            return {
                id: v.id,
                type: type,
                rect
            }
        })
    }

    const dispatch = useAppDispatch()

    const domEnv = useRef(null)
    const [coords, setCoords] = useState({x: null, y: null})
    const [currentFocusIdState, setCurrentFocusIdState] = useState(null)
    const [currentFocusTypeState, setCurrentFocusTypeState] = useState(null)

    const handleClick = (e) => {
        setCoords({x: e.x, y: e.y})
    }

    const [recordCursor, setRecordCursor] = useState(false)

    function handleKeyDown(e) {
        if (e.key === 'p') {
            setRecordCursor(prevState => !prevState)
        }
    }


    function handleMouseMove(e) {
        if (recordCursor) {
            setCoords({x: e.clientX, y: e.clientY})
            const env = describeEnvironment(domEnv)
            let currentFocusId, currentFocusType
            let actions
            [currentFocusId, currentFocusType, , , actions] = measureEngagement(
                env,
                {x: e.clientX, y: e.clientY},
                {},
                1000
            )
            if (currentFocusId !== currentFocusIdState) {
                setCurrentFocusIdState(currentFocusId)
            }
            if (currentFocusType !== currentFocusTypeState) {
                setCurrentFocusTypeState(currentFocusType)
            }

            if (actions.length !== 0) {
                for (let action of actions) {
                    console.log(action)
                    if (action === 'clean') {
                        dispatch(resetData())
                    } else if (action === 'flip') {
                        messageApi.warning('Taking action (ex. flip the videos)')

                    } else if (action === 'subtitle') {
                        messageApi.warning('Taking action (ex. turn on subtitle)')
                    }
                }
            }

        }
    }

    const mouseMoveCallback = useCallback(() => {
    }, [recordCursor])


    useEffect(() => {
        describeEnvironment(domEnv)
        // document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeyDown)
        info()
        return () => {
            // document.removeEventListener('click', handleClick)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, []);


    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [mouseMoveCallback]);


    const [messageApi, contextHolder] = message.useMessage()

    function info() {
        messageApi.info({
            content: "Press the Button ( P ) on your keyboard to simulate gazing, press again to turn off",
            key: 'infoMessage',
            duration: 15,
        })

    }

    const focusTypeText = {
        overflow: "Focusing on the entertainment unit (light grey)",
        subject: "Focusing on the subject (dark grey)",
        empty: "You have lost focus"
    }[currentFocusTypeState] ?? null

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            {contextHolder}

            <h1>Engagement Analytics Showcase</h1>

            {currentFocusIdState ?
                <>
                    <p>You are focusing on Block <b>No. {currentFocusIdState.slice(-1)}</b></p>
                </>
                :
                <p>You are not focusing (Press P on your keyboard)</p>
            }
            {currentFocusTypeState && currentFocusIdState ? <p>{focusTypeText}</p> : "You are not concentrating"}

            {/*
            <button onClick={() => {
                dispatch(resetData())
                cleanCache()
                cleanFocusStore()
            }}>clean heatmap
            </button>
            */}
            <Row ref={domEnv} style={{
                flexGrow: 1
            }}>
                {cols}
            </Row>


            <HeatmapComponent newDataPoints={coords}/>

        </div>
    );
}


export default Page;
