"use client"
import React from 'react'
import { Logo } from './icons';
import { siteConfig } from '@/config/site';
import { TbChevronUp } from 'react-icons/tb';
import Link from 'next/link';

const Footer = () => {
  return (
      <footer className="footer">
          <div className="page-up">
              <a onClick={() => {
                  window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                  });
              }} id="scrollToTopButton">
                  <TbChevronUp className="icon w-full h-full flex justify-center items-center p-2" />
              </a>
          </div>
          <div className="container">
              <div className="row">
                  <div className="col-lg-3">
                      <div className="footer__logo flex gap-0 items-center">
                          <Logo />
                          {siteConfig?.name}
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="footer__nav">
                          <ul>
                              {siteConfig.navItems.map((item) => (
                                  <li key={item.href}>
                                      <Link href={item.href}>
                                          {item.label}
                                      </Link>
                                  </li>
                              ))}

                          </ul>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <p>
                          Copyright &copy;{new Date().getFullYear()} All rights reserved | made with 💖 by <Link href="https://uditvegad.vercel.app" target="_blank">Udit Vegad.</Link>
                      </p>

                  </div>
              </div>
          </div>
      </footer>
  )
}

export default Footer