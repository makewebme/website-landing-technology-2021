fetch('https://gorest.co.in/public-api/products')
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    }
  })
  .then((res) => {
    const reviewsItems = document.querySelector('.reviews-items')

    if (!res) {
      reviewsItems.innerText = 'Ошибка подгрузки комментариев'
      return
    }

    const { data: comments } = res

    const reviewTmpl = document.querySelector('#review')

    comments.forEach((c) => {
      const review = reviewTmpl.content.cloneNode(true)

      review.querySelector('img').src = c.image
      review.querySelector('.name').innerText = c.name
      review.querySelector('.text').innerText = c.description

      reviewsItems.appendChild(review)
    })
  })
