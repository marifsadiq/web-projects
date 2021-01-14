const hamburger = document.getElementById('hamburger')
const open = document.getElementById('open')
const close = document.getElementById('close')
const modal = document.getElementById('modal-container')

hamburger.addEventListener('click', () => {
    document.body.classList.toggle('show-nav')
})

open.addEventListener('click', () =>{
    modal.classList.add('show-modal')
})
close.addEventListener('click', () =>{
    modal.classList.remove('show-modal')
})
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false)