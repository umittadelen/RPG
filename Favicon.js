let faviconFrames = [
    {src: "./assets/favicon/1.png", time: 1000},
    {src: "./assets/favicon/2.png", time: 100},
    {src: "./assets/favicon/3.png", time: 100},
    {src: "./assets/favicon/4.png", time: 200},
    {src: "./assets/favicon/5.png", time: 100},
    {src: "./assets/favicon/6.png", time: 100},
    {src: "./assets/favicon/7.png", time: 200},
    {src: "./assets/favicon/8.png", time: 100},
    {src: "./assets/favicon/9.png", time: 100},
    {src: "./assets/favicon/10.png", time: 100},
    {src: "./assets/favicon/11.png", time: 100},
    {src: "./assets/favicon/12.png", time: 1000},
    {src: "./assets/favicon/13.png", time: 100},
    {src: "./assets/favicon/14.png", time: 100},
    {src: "./assets/favicon/15.png", time: 100},
    {src: "./assets/favicon/16.png", time: 100}
];

let currentFrame = 0;

const changeFavicon = () => {
    const favicon = document.getElementById("dynamic-favicon");
    favicon.href = faviconFrames[currentFrame].src;
    let displayTime = faviconFrames[currentFrame].time;

    // Move to the next frame (loop back to first frame if at the end)
    currentFrame = (currentFrame + 1) % faviconFrames.length;

    // Schedule the next frame change based on the current frame's time
    setTimeout(changeFavicon, displayTime);
};

// Start the favicon animation
changeFavicon();