import '../Styles/SliderComponent.css'
import React, {useEffect}from 'react'
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

import breakfast from '../breakfast.jpg'
import lunch from '../lunch.jpg'
import dinner from '../dinner.jpg'


export default function SliderComponent(){
    useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'fade',
            loop: true,
            speed: 300,
            mousewheel: {
              invert: false,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true
            },
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          });
    }, []);

    return (
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="slider-item swiper-slide">
                    <div className="slider-image-wrapper">
                        <img className="slider-image" src={breakfast} alt="SliderImg"/>
                    </div>
                    <div className="slider-item-content">
                        <h1>Breakfast</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                    </div>
                </div>
                <div className="slider-item swiper-slide">
                    <div className="slider-image-wrapper">
                        <img className="slider-image" src={lunch} alt="SliderImg"/>
                    </div>
                    <div className="slider-item-content">
                        <h1>Lunch</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sadfpo asdjflkasjfak asdfk;jasdf;kj asd;f asdkjf ;asdkjf asldjf ;</p>
                    </div>
                </div>
                <div className="slider-item swiper-slide">
                    <div className="slider-image-wrapper">
                        <img className="slider-image" src={dinner} alt="SliderImg"/>
                    </div>
                    <div className="slider-item-content">
                        <h1>Dinner</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                    </div>
                </div>
               
            </div>
            <div className="slider-buttons">
                <button className="swiper-button-prev">Prev</button>
                <button className="swiper-button-next">Next</button>
            </div>

            <div className="swiper-pagination"></div>
        </div>
    )
}

