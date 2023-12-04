'use client'

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Col, Row} from "antd";
import HeatmapComponent from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/heatmap";
import {useAppDispatch} from "@/redux/hooks";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";
import {useMousePosition} from "@/utils/mouse-position";


function Page(props) {

    const dispatch = useAppDispatch()

    const col1 = useRef(null)
    const col2 = useRef(null)
    const [coords, setCoords] = useState({x: null, y: null})
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
        }
    }

    const mouseMoveCallback = useCallback(() => {}, [recordCursor])


    useEffect(() => {
        console.log(col1.current.getBoundingClientRect())
        // document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeyDown)
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


    return (
        <div>
            <h1>Select a chapter asd</h1>
            <HeatmapComponent newDataPoints={coords}/>
            <button onClick={() => dispatch(resetData())}>clean heatmap</button>
            <Row>
                <Col span={12} ref={col1}>
                    col1
                </Col>
                <Col span={12} ref={col2}>
                    col2
                </Col>
            </Row>
        </div>
    );
}


export default Page;
