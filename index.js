new Swiper('.swiper', {
  slidesPerView: 3,
  loop: true,
  navigation: {
    nextEl: '.cards__btn_right',
    prevEl: '.cards__btn_left'
  }
});

const swiperRegistration = new Swiper('.registration__swiper', {
  slidesPerView: 1,
  simulateTouch: false,
  effect: 'slide',
  navigation: {
    nextEl: '.registration__next-button'
  },
  pagination: {
    el: '.swiper__pagination',
  }
})

const btnLogoNode = document.querySelectorAll(".js-logo-btn");

btnLogoNode.forEach(el => {
  el.addEventListener("click", function () {
    window.location.reload();
  });
})

// LOGIN POPUP
const loginOpenNode = document.querySelector('.login-open')
const bodyNode = document.querySelector('body')
const loginNode = document.querySelector('.login')
const loginCloseNode = document.querySelector('.login__close')
const formNode = document.querySelector('.login__form')
const emailInputNode = document.querySelectorAll('.email__input')
const passwordInputNode = document.querySelectorAll('.password__input')

const timeout = 500

loginOpenNode.addEventListener('click', function (e) {
  loginOpen(loginNode)
  e.preventDefault()
})

loginCloseNode.addEventListener('click', function (e) {
  loginClose(loginNode)
  e.preventDefault()
})

formNode.addEventListener('submit', function (e) {
  e.preventDefault()

  emailInputNode.forEach(el => el.value = '')
  passwordInputNode.forEach(el => el.value = '')

  loginClose(loginNode)
})

function loginOpen(loginNode) {
  loginNode.classList.add('open');

  loginNode.addEventListener('click', function (e) {
    if (!e.target.closest('.login__content')) {
      loginClose(e.target.closest('.login'))
    }
  })

  bodyLock()
}

function loginClose(loginNode) {
  loginNode.classList.remove('open')

  bodyUnlock()
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px'

  bodyNode.style.paddingRight = lockPaddingValue

  bodyNode.classList.add('lock')
}

function bodyUnlock() {
  setTimeout(function () {
    bodyNode.style.paddingRight = '0px'

    bodyNode.classList.remove('lock')
  }, timeout)
}

// PASSWORD 
const passwordBtnNode = document.querySelectorAll('.password__btn')
const passwordImgSee = document.querySelectorAll('.password__img-see')
const passwordImgHide = document.querySelectorAll('.password__img-hide')

passwordBtnNode.forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault()

    passwordImgSee.forEach(el => el.classList.toggle('hide'))
    passwordImgHide.forEach(el => el.classList.toggle('hide'))

    passwordInputNode.forEach(el => {
      switch (el.type) {
        case 'password':
          el.type = 'text'
          break
        case 'text':
          el.type = 'password'
          break
      }
    })
  })
})

// REGISTRATION POPUP
const registrationOpenNode = document.querySelectorAll('.btn-reg')
const registrationNode = document.querySelector('.registration')
const registrationCloseNode = document.querySelector('.registration__close')


registrationOpenNode.forEach(el => {
  el.addEventListener('click', function (e) {
    registrationOpen(registrationNode)
    e.preventDefault()
  })
})

registrationCloseNode.addEventListener('click', function (e) {
  registrationClose(registrationNode)
  e.preventDefault()
})

function registrationOpen(registrationNode) {
  registrationNode.classList.add('open');

  registrationNode.addEventListener('click', function (e) {
    if (!e.target.closest('.registration__content')) {
      registrationClose(e.target.closest('.registration'))
    }
  })

  bodyLock()
}

function registrationClose(registrationNode) {
  registrationNode.classList.remove('open')

  bodyUnlock()
}

// REGISTRATION: phone
const privacyNode = document.querySelector('.registration__privacy')
const privacyCloseBtnNode = document.querySelector('.privacy__close')
const phoneInputNode = document.querySelector('.registration__phone-input')
const registrationNextBtnNode = document.querySelectorAll('.registration__next-button')

privacyCloseBtnNode.addEventListener('click', function () {
  privacyNode.classList.add('remove')
})

registrationNextBtnNode.forEach(nextBtn => nextBtn.disabled = true)

phoneInputNode.addEventListener('input', function () {
  phoneNumberFormatter()

  registrationNextBtnNode.forEach(nextBtn => {
    if (phoneInputNode.value.length < 14) {
      nextBtn.classList.add('disabled')
      nextBtn.disabled = true
    } else {
      nextBtn.classList.remove('disabled')
      nextBtn.disabled = false
    }
  })
})

function phoneNumberFormatter() {
  const formattedInputPhone = formatPhoneNumber(phoneInputNode.value);

  phoneInputNode.value = formattedInputPhone;
}

function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

// REGISTRATION: code
const phoneSelectNode = document.querySelector('.phone-code__select')
const codeInputInfoNode = document.querySelector('.registration__input-info_code')
const codeInputNode = document.querySelector('.registration__code-input')
const resendCodeCountdownNode = document.querySelector('.registration__code-countdown')
const resendCodeBtnNode = document.querySelector('.registration__code-resend')
const sendCodeBtnNode = document.getElementById('send-code-button')

let countdownTime = 60

registrationNextBtnNode.forEach(nextBtn => {
  nextBtn.addEventListener('click', function () {
    const phoneInput = phoneInputNode.value
    const phoneSelect = phoneSelectNode.value

    registrationNextBtnNode.forEach(nextBtn => {
      nextBtn.disabled = true
      nextBtn.classList.add('disabled')
    })

    codeInputInfoNode.innerHTML = `A code was sent to <b>${phoneSelect} ${phoneInput}</b><br>Enter the code from the message`
  })
})

codeInputNode.addEventListener('input', function () {
  codeFormatter()

  registrationNextBtnNode.forEach(nextBtn => {
    if (codeInputNode.value.length < 4) {
      nextBtn.classList.add('disabled')
      nextBtn.disabled = true
    } else {
      nextBtn.classList.remove('disabled')
      nextBtn.disabled = false
    }
  })
})

sendCodeBtnNode.addEventListener('click', function () {
  setCodeCountdown(countdownTime)
})

resendCodeBtnNode.addEventListener('click', function (e) {
  setCodeCountdown(countdownTime)

  codeInputNode.value = ''
})

function setCodeCountdown(countdownTime) {
  resendCodeBtnNode.disabled = true
  resendCodeBtnNode.classList.add('disabled')

  resendCodeCountdownNode.innerText = `${--countdownTime}`

  let resendTimer = setInterval(function () {
    resendCodeCountdownNode.innerText = `${--countdownTime}`

    if (countdownTime === 0) {
      clearInterval(resendTimer)

      resendCodeCountdownNode.innerText = ''

      resendCodeBtnNode.classList.remove('disabled')
      resendCodeBtnNode.disabled = false

      countdownTime = 60
    }
  }, 1000);
}

function codeFormatter() {
  const codeValue = codeInputNode.value

  const code = codeValue.replace(/[^\d]/g, "")

  codeInputNode.value = code
}

// REGISTRATION: login
const formRegistrationNode = document.querySelector('.registration__form-login')

formRegistrationNode.addEventListener('submit', function (e) {
  e.preventDefault()

  emailInputNode.forEach(el => el.value = '')
  passwordInputNode.forEach(el => el.value = '')

  registrationClose(registrationNode)

  swiperRegistration.slideTo(0)

  phoneInputNode.value = ''
  codeInputNode.value = ''
})

// VIDEO popup
const videoOpenBtnNode = document.querySelector('.begin__btn-play-video')
const videoNode = document.querySelector('.video')
const videoCloseNode = document.querySelector('.video__close')

videoOpenBtnNode.addEventListener('click', function (e) {
  videoOpen(videoNode)
  e.preventDefault()
})

videoCloseNode.addEventListener('click', function (e) {
  videoClose(videoNode)
  e.preventDefault()
})

function videoOpen(videoNode) {
  videoNode.classList.add('open');

  videoNode.addEventListener('click', function (e) {
    if (!e.target.closest('.video__content')) {
      videoClose(e.target.closest('.video'))
    }
  })

  bodyLock()
}

function videoClose(videoNode) {
  videoNode.classList.remove('open')

  bodyUnlock()
}