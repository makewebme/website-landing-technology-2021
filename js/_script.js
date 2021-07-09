require('../css/_style.css')

fetch('https://gorest.co.in/public-api/products')
  .then((res) => res.json())
  .then(({ data: comments }) => {
    const reviewTmpl = document.querySelector('#review')
    const reviewsItems = document.querySelector('.reviews-items')

    comments.forEach((c) => {
      const review = reviewTmpl.content.cloneNode(true)

      review.querySelector('img').src = c.image
      review.querySelector('.name').innerText = c.name
      review.querySelector('.text').innerText = c.description

      reviewsItems.appendChild(review)
    })
  })
