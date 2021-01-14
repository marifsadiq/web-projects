const filter = document.getElementById('filter')
const postsContainer = document.getElementById('posts-container')
const loader = document.getElementById('loader')


let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts(){
  let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
  let data = await res.json()

  return data
}

// Show posts in DOM
async function showPosts(){
  let posts = await getPosts()

  posts.forEach(post => {
    let postEl = document.createElement('div')
    postEl.classList.add('post')
    postEl.innerHTML = `
      <div class="post__id">${post.id}</div>
      <h3 class="post__title">${post.title}</h3>
      <p class="post__body">${post.body}</p>
    `

    postsContainer.appendChild(postEl)

  })
}
function showLoading(){
  loader.classList.add('show')

  setTimeout(() =>{
    loader.classList.remove('show')

    setTimeout(() => {
      page++
      showPosts()
    }, 300)

  }, 1000)
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if(scrollTop +  clientHeight >= scrollHeight - 5){
    showLoading()
  }
})

// Show initial posts
showPosts()