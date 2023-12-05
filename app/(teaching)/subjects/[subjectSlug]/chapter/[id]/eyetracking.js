import React from "react";

export default function EyeTrackingCursor({coords, pause}) {

    const dotStyle = {
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#21867f',
        position: 'absolute',
        opacity: 0.3,
        boxShadow: "0 0 10px 20px #21867f",
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
