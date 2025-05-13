
const stages = document.querySelectorAll('.stage')
stages.forEach(stage => {
    stage.addEventListener('click', () => {
        window.location = `index.html?stage=${stage.id}`
        

    })
})


