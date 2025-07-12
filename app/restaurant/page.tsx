'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const images = ['/assets/img/1.png', '/assets/img/2.png', '/assets/img/3.png', '/assets/img/4.png', '/assets/img/5.png']

export default function Home() {
  const [active, setActive] = useState(1)
  const [widthItem, setWidthItem] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const singleItemRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 根據圖片實際寬度抓取寬度
    const handleResize = () => {
      if (singleItemRef.current) {
        const width = singleItemRef.current.getBoundingClientRect().width
        setWidthItem(width)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // carousel UI
    if (!listRef.current || itemsRef.current.length === 0 || widthItem === 0) return

    const leftTransform = widthItem * (active - 1) * -1
    listRef.current.style.transform = `translateX(${leftTransform}px)`

    itemsRef.current.forEach((el, index) => {
      if (index === active) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }, [active, widthItem])

  useEffect(() => {
    // Setup circular text
    if (!circleRef.current) return
    const text = circleRef.current.innerText.split('')
    circleRef.current.innerText = ''
    text.forEach((char, idx) => {
      const span = document.createElement('span')
      span.innerText = char
      const rotate = (360 / text.length) * (idx + 1)
      span.style.setProperty('--rotate', `${rotate}deg`)
      circleRef.current?.appendChild(span)
    })
  }, [])

  const goPrev = () => {
    setActive((prev) => (prev <= 0 ? 0 : prev - 1))
  }

  const goNext = () => {
    setActive((prev) => (prev >= images.length - 1 ? images.length - 1 : prev + 1))
  }

  return (
    <div >
      <header>
        <div>LUNDEV</div>
        <nav>
          <ul className="flex gap-4">
            <li>HOME</li>
            <li>CONTACT</li>
            <li>LOGIN</li>
          </ul>
        </nav>
      </header>

      <div className="slider relative">
        <div ref={listRef} className="list flex transition-transform duration-500">
          {images.map((src, index) => (
            <div
              key={index}
              className={`item w-full max-w-[400px] ${index === active ? 'active' : ''}`}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
                if (index === 0) singleItemRef.current = el
              }}
            >
              <Image src={src} alt={`img-${index + 1}`} width={300} height={200} className="w-full h-auto" />
            </div>
          ))}
        </div>

        <div ref={circleRef} className="circle absolute top-[-100px]">
          LUN DEV YOUTUBE - coding and design website - coding and design website
        </div>

        <div className="content mt-4 flex flex-col gap-2">
          <div>menu</div>
          <div>restaurant</div>
          <button className="px-4 py-2 bg-black text-white">更多</button>
        </div>

        <div className="arow mt-4 flex gap-4">
          <button id="prev" onClick={goPrev} className="px-3 py-1 text-xl">
            {'<'}
          </button>
          <button id="next" onClick={goNext} className="px-3 py-1 text-xl">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
