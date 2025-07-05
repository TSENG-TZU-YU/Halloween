'use client';
import { useEffect } from "react";
import Atropos from 'atropos';

export default function Home() {

  /*=============== 顯示菜單  ===============*/
  useEffect(() => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    function showMenu() {
      navMenu?.classList.add('show-menu');
    }
    function hideMenu() {
      navMenu?.classList.remove('show-menu');
    }
    // 當點擊「開啟選單」按鈕時，增加 navMenu 的 class "show-menu"
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', showMenu);
    }
    // 當點擊「關閉選單」按鈕時，移除 navMenu 的 class "show-menu"
    if (navClose && navMenu) {
      navClose.addEventListener('click', hideMenu);
    }

    // 在元件卸載時，清除上述加的事件監聽器，避免記憶體洩漏
    return () => {
      if (navToggle && navMenu) {
        navToggle.removeEventListener('click', showMenu);
      }
      if (navClose && navMenu) {
        navClose.removeEventListener('click', hideMenu);
      }
    };
  }, []);

  /*=============== 移除菜單 手機 ===============*/
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav__link');

    function linkAction() {
      const navMenu = document.getElementById('nav-menu');
      navMenu?.classList.remove('show-menu');
    }

    navLinks.forEach(n => n.addEventListener('click', linkAction));

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', linkAction);
      });
    };
  }, []);
  /*=============== ATROPOS JS ===============*/

  useEffect(() => {
    const myAtropos = Atropos({
      el: '.home__images',
      shadow: false,
      highlight: false
    });

    return () => {
      myAtropos.destroy();
    };

  }, []);

  /*=============== 新增陰影標頭  ===============*/
  useEffect(() => {
    const shadowHeader = () => {
      const header = document.getElementById('header');
      if (window.scrollY >= 50) {
        header?.classList.add('shadow-header');
      } else {
        header?.classList.remove('shadow-header');
      }
    };

    window.addEventListener('shadow', shadowHeader);

    // 清除事件監聽，避免記憶體洩漏
    return () => {
      window.removeEventListener('shadow', shadowHeader);
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="header" id="header">
        <nav className="nav contioner">
          <a href="#" className="nav__logo">Halloween</a>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li>
                <a href="#" className="nav__link">Home</a>
              </li>

              <li>
                <a href="#" className="nav__link">Events</a>
              </li>

              <li>
                <a href="#" className="nav__link">Visit us</a>
              </li>

              <li>
                <a href="#" className="nav__link">Contact</a>
              </li>
            </ul>
            {/* <!-- Close button */}
            <div className="nav__close" id="nav-close">
              <i className="ri-close-large-line"></i>
            </div>
          </div>
          {/* <!-- Toggle button */}
          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-apps-2-fill"></i>
          </div>
        </nav>
      </header>

      {/* <!--==================== MAIN ====================--> */}
      <main className="main">
        {/* <!--==================== HOME ====================--> */}
        <section className="home">
          <div className="home__container container grid">
            <div className="home__data">
              <h1 className="home__title">
                Ready For <br /> Trick Or Treat
              </h1>
              <p className="home__description">
                {/* Don't wait for trick or treating, pumpkins,
                and other sweets await you tonight to
                begin the adventure. */}
                2025年10月31日 星期五 萬聖節
              </p>
              <a href="#" className="home__button">
                搗蛋就送 Pumpkins、candy</a>
            </div>
            {/* 使用Atropos.js  */}
            <div className="home__images atropos ">
              <div className="atropos-scale">
                <div className="atropos-rotate">
                  <div className="atropos-inner">
                    <img src="/assets/img/pumpkin-1.png" alt="" data-atropos-offset="10" className="home__img-1" />
                    <img src="/assets/img/pumpkin-2.png" alt="" data-atropos-offset="10" className="home__img-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
