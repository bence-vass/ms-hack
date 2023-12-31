import React from "react";

export default function EyeTrackingCursor({coords, pause}) {

    const dotStyle = {
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#862121',
        position: 'absolute',
        opacity: 0.4,
        boxShadow: "0 0 10px 20px #862121",
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
            pointerEvents: 'none',
            zIndex: 999,
        }}>
            <div style={{
                ...dotStyle,
                top: coords.y || 0,
                left: coords.x || 0,
            }}></div>
        </div>
    }
}
