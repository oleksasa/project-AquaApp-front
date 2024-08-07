import React from 'react';
import homeMobile1 from '../../img/home/home-mobile1x.jpg';
import homeMobile2 from '../../img/home/home-mobile2x.jpg';
import homeTablet1 from '../../img/home/home-tablet1x.jpg';
import homeTablet2 from '../../img/home/home-tablet2x.jpg';
import homeDesktop1 from '../../img/home/home-desktop1x.jpg';
import homeDesktop2 from '../../img/home/home-desktop2x.jpg';

export default function AdvantagesSection() {
  return (
    <div>
      <picture>
        <source
          media="(min-width: 1440px)"
          srcSet={`${homeDesktop1} 1x, ${homeDesktop2} 2x`}
          type="image/jpg"
        />

        <source
          media="(min-width: 768px)"
          srcSet={`${homeTablet1} 1x, ${homeTablet2} 2x`}
          type="image/jpg"
        />

        <source
          media="(max-width: 767px)"
          srcSet={`${homeMobile1} 1x, ${homeMobile2} 2x`}
          type="image/jpg"
        />
        <img
          alt="hero-img"
          width="704"
          height="700"
          loading="lazy"
          src={homeMobile1}
        />
      </picture>
    </div>
  );
}
