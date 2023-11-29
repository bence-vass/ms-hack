import React from "react";

export default function EyeTrackingCursor({coords, pause}) {

    const dotStyle = {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'green',
        position: 'absolute',
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
