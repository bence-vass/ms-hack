import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";
import h337 from "heatmap.js";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setData } from "@/redux/features/heatmap/heatmapSlice";



const HeatmapComponent = ({newDataPoints}) => {
    const dispatch = useAppDispatch()
    const heatmapData = useAppSelector(state => state.heatmapReducer.data)

    const [heatmapInstance, setHeatmapInstance] = useState(null)

    function cleanHeatmap() {
        console.log('clean heatmap')
        if(heatmapInstance){
            console.log('clean')
            heatmapInstance.setData({max: 0, data: []})
        }
    }


    useEffect(() => {

        const heatmapInstance = h337.create({
            container: document.getElementById('heatmapContainer'),
            radius: 100,
            opacity: .3,
        })
        setHeatmapInstance(heatmapInstance)
    }, []);



    useEffect(() => {
        const roundUpTo = 50
        if (heatmapInstance && newDataPoints.x && newDataPoints.y) {
            heatmapInstance.addData({
                x: Math.ceil(newDataPoints.x / roundUpTo) * roundUpTo,
                y: Math.ceil(newDataPoints.y / roundUpTo) * roundUpTo,
                value: 1,
            })
            dispatch(setData(heatmapInstance.getData()))
            console.log(heatmapData)
        }
    }, [newDataPoints]);


    useEffect(() => {
        console.log('change')
    }, [heatmapData]);

    return (<div style={{
        position: 'absolute !important',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        overflow: "hidden",
        pointerEvents: 'none',
    }}>
        <div id={'heatmapContainer'} style={{width: '100%', height: '100%'}}></div>
    </div>)

}

export default HeatmapComponent
