import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";
import h337 from "heatmap.js";

const HeatmapComponent = forwardRef(({newDataPoints}, ref) => {

    const [heatmapInstance, setHeatmapInstance] = useState(null)

    function cleanHeatmap() {
        console.log('clean heatmap')
        if(heatmapInstance){
            console.log('clean')
            heatmapInstance.setData({max: 0, data: []})
        }
    }


    useImperativeHandle(ref, () => ({
        cleanHeatmap: cleanHeatmap,

    }))


    useEffect(() => {

        const heatmapInstance = h337.create({
            container: document.getElementById('heatmapContainer'),
            radius: 100,
            opacity: .3,
        })
        setHeatmapInstance(heatmapInstance)
    }, []);

    useEffect(() => {
        if (heatmapInstance && newDataPoints.x && newDataPoints.y) {
            heatmapInstance.addData({
                x: newDataPoints.x,
                y: newDataPoints.y,
                value: 1,
            })
        }
    }, [newDataPoints]);

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

})

export default HeatmapComponent
