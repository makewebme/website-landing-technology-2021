require('../css/_style.css')

fetch('/comments.json')
  .then((res) => res.json())
  .then(({ comments }) => {
    const reviewTmpl = document.querySelector('#review')
    const reviewsItems = document.querySelector('.reviews-items')

    comments.forEach((c) => {
      const review = reviewTmpl.content.cloneNode(true)

      review.querySelector('img').src = c.img
      review.querySelector('.name').innerText = c.name
      review.querySelector('.text').innerText = c.text

      reviewsItems.appendChild(review)
    })
  })
