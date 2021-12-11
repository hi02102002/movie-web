import React from 'react';
import classes from './Footer.module.scss';
import { BsFacebook, BsGithub, BsInstagram } from 'react-icons/bs';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footer__container}>
          <div>
            <ul className={classes.footer__nav}>
              <li>
                <a href="/">Terms Of Use</a>
              </li>
              <li>
                <a href="/">Privacy-Policy</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">Watch List</a>
              </li>
            </ul>
            <p className={classes.footer__desc}>
              © 2021 HMovie . All Rights Reserved. All videos and shows on this
              platform are trademarks of, and all related images and content are
              the property of, HMovie Inc. Duplication and copy of this is
              strictly prohibited. All rights reserved.
            </p>
          </div>
          <div className={classes.footer__socials}>
            <span className={classes['footer__socials-title']}>
              Follow Us :
            </span>
            <ul className={classes['footer__socials-list']}>
              <li>
                <a
                  href="https://www.facebook.com/hiiiii.2102002"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hi02102002"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hiiiii_021002/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
