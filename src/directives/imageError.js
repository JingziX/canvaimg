import defaultImg from '@/assets/images/default.svg'

export const imageError = {
  mounted(el) {
    el.addEventListener('error', () => {
      el.src = defaultImg
    })
  }
} 