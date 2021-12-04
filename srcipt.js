let isFlipped = false
let reposAreFetched = false

const fetchRepos = async () => {
  const res = await fetch('https://api.github.com/users/s3fs/repos')
  const jsonified = await res.json()
  return jsonified.filter(i => i.has_pages && i.name !== 's3fs.github.io')
}

let card = document.querySelector('.card-active')
const cont = document.querySelector('.cont')
const logo = document.querySelector('.logo')
const changeCard = document.querySelector('.change-card')
const cardsList = document.querySelectorAll('.card')
const repoList = document.querySelector('.repo-list')

changeCard.onclick = () => {
  isFlipped = !isFlipped
  
  if (!reposAreFetched) {
    fetchRepos().then(res => {
      reposAreFetched = !reposAreFetched
      repoList.innerHTML = ''
      res.map(r => {
        let el = document.createElement('a')
        el.innerHTML = r.name
        el.href = `https://s3fs.github.io/${r.name}`
        repoList.appendChild(el)
      })
    })
  }

  const [front, back] = isFlipped ? [cardsList[0], cardsList[1]] : [cardsList[1], cardsList[0]]

  front.classList.remove('card-active')
  front.classList.add('card-inactive')
  back.classList.remove('card-inactive')
  back.classList.add('card-active')

  card = document.querySelector('.card-active')
}

let [height, width] = [window.innerHeight, window.innerWidth]

const scaleValue = (value, from, to) => {
  const scale = (to[1] - to[0]) / (from[1] - from[0]);
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
}

const move = (x, y) => {
  card.style.transform = `rotateY(${scaleValue(x, [0, width], [-23, 23])}deg) rotateX(${scaleValue(y, [0, height], [23, -23])}deg)`
  cont.style.perspective = `500px`
}

window.addEventListener('resize', () => {
  [height, width] = [window.innerHeight, window.innerWidth]
})

window.addEventListener('touchmove', (ev) => {
  move(ev.touches[0].clientX, ev.touches[0].clientY)
})

window.addEventListener('touchend', () => {
  card.classList.add('tobase')
})

window.addEventListener('touchstart', () => {
  card.classList.remove('tobase')
})

document.addEventListener('mouseleave', () => {
  card.classList.add('tobase')
})

document.addEventListener('mouseenter', () => {
  card.classList.remove('tobase')
})

document.addEventListener('mousemove', (ev) => {
  move(ev.clientX, ev.clientY)
})