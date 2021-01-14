const container = document.getElementById('container')
const card = document.getElementById('card')
const logo = document.getElementById('logo')
const title = document.getElementById('title')
const specs = document.getElementById('specs')

container.addEventListener('mousemove', (e) => {
    let x = (window.innerWidth / 2 - e.pageX) / 10
    let y = (window.innerHeight / 2 - e.pageY) / 10

    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
})
container.addEventListener('mouseenter', () => {
    logo.style.transform = 'translateZ(150px) rotateZ(-45deg)'
    title.style.transform = 'translateZ(200px)'
    specs.style.transform = 'translateZ(100px)'
})
container.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`
    logo.style.transform = 'translateZ(0px) rotateZ(0deg)'
    title.style.transform = 'translateZ(0px)'
    specs.style.transform = 'translateZ(0px)'
})