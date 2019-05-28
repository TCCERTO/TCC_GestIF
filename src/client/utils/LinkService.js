import Router from 'next/router'
import links from '../links'

const isBrowser = typeof window !== 'undefined'

export const getLink = () => {
  const link = isBrowser ? localStorage.getItem('link') : null
  return link ? JSON.parse(localStorage.getItem('link')) : {}
}

export const setLink = (id, name) => {
  localStorage.setItem('link', JSON.stringify({ name, id }))
  return
}

export const getLinkMenu = link => links.filter(obj => obj.id === link)[0].menu
