document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px'

document.documentElement.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault()
    }
})