export function checkIsCamApproved() {
    return navigator.mediaDevices.enumerateDevices().then(infos => {
        return [...infos].some(info => info.label !== "")
    })
}

export function requestCamApprove() {
    navigator.mediaDevices.getUserMedia({video: true}).then(s => {
    })
}
