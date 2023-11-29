'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Col, Row} from "antd";
import HeatmapComponent from "@/app/(teaching)/subjects/[subjectSlug]/chapter/[id]/heatmap";
import {useAppDispatch} from "@/redux/hooks";
import {resetData} from "@/redux/features/heatmap/heatmapSlice";

function Page(props) {

    const dispatch = useAppDispatch()

    const col1 = useRef(null)
    const col2 = useRef(null)
    const [coords, setCoords] = useState({x: null, y: null})

    useEffect(() => {
        console.log(col1.current.getBoundingClientRect())
        document.addEventListener('click', e => {
            setCoords({x: e.x, y: e.y})
        })

    }, []);

    return (
        <div>
            <h1>Select a chapter</h1>
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
