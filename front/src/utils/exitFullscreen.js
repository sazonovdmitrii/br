const exitFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
    } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
    } else if (document.msFullscreenElement) {
        document.msExitFullscreen();
    }
};

export default exitFullscreen;
