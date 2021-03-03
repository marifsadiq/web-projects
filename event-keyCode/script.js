const displayCode = document.querySelector('.display-code')



window.addEventListener('keydown', e => {
    displayCode.innerHTML = `
        <div class="key-box">
         ${e.key === ' ' ? 'Space' : e.key} 
          <small>e.key</small>
        </div>
        
        <div class="key-box">
          ${e.keyCode}
          <small>e.keyCode</small>
        </div>
      
        <div class="key-box">
          ${e.code}
          <small>e.code</small>
    </div>
  </div>
    `

})
