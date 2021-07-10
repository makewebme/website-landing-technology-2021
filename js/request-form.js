const submitBtn = document.querySelector('.section-request-form .btn-send')

const submitBtnClickHandler = () => {
  const inputNameValue = document.querySelector('.input-name').value
  const inputCompanyValue = document.querySelector('.input-company').value
  const inputPhoneValue = document.querySelector('.input-phone').value
  const inputEmailValue = document.querySelector('.input-email').value

  const fd = new FormData()
  fd.append('name', inputNameValue)
  fd.append('company', inputCompanyValue)
  fd.append('phone', inputPhoneValue)
  fd.append('email', inputEmailValue)

  fetch('http://localhost:8888/request.php', {
    method: 'POST',
    body: fd
  })
}

submitBtn.addEventListener('click', submitBtnClickHandler)
