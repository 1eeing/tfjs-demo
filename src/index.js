const video = document.querySelector('video')
const image = document.querySelector('img')
const status = document.querySelector("p")

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

let model

main()

async function main () {
    status.innerText = "Model loading..."
    model = await mobilenet.load()
    status.innerText = "Model is loaded!"

    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    video.srcObject = stream
    await video.play()
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    refresh()
}

async function refresh(){
    ctx.drawImage(video, 0,0)
    image.src = canvas.toDataURL('image/png')
    
    await model.load()
    const predictions = await model.classify(image)
    
    const className = predictions[0].className
    const percentage = Math.floor(100 * predictions[0].probability)
    
    status.innerHTML = percentage + '%' + ' ' + className
    
    setTimeout(refresh, 100)
}