
const stages = document.querySelectorAll('.stage')
stages.forEach(stage => {
    stage.addEventListener('click', () => {
        window.location = `index.html?stage=${stage.id}`
        

    })
})
function startGame(){
    window.location = 'index.html';
}
const screens = ['stage1.html', 'stage2.html','stage3.html', 'stage4.html'];
