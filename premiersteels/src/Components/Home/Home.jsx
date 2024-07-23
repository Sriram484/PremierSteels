import React, { useState, useEffect } from 'react';
import './Home.css';
import img1 from '../../Assets/CEO.jpeg';
import img2 from '../../Assets/machine1.jpeg';
import img3 from '../../Assets/machine2.jpeg';
import img4 from '../../Assets/Factory.jpeg';
import img5 from '../../Assets/item1.jpeg';
// import img6 from '../../Assets/item2';

import { FaPhone } from "react-icons/fa6";



import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Client from '../Client/Client';
import useFetchCollection from '../Firebase/useFetchCollection';
import Products from '../Products/Products';
import Quotation from './Quotation';

const images = [img1, img2, img3, img4, img5]; // Replace CEO with actual image URLs

const Home = () => {
    const [hiddenElements, setHiddenElements] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);


    //Products

    const { documents: categoryData } = useFetchCollection('Categories');

    const [options, setOptions] = useState([]);




    useEffect(() => {

        if (Array.isArray(categoryData) && categoryData.length > 0) {
            const uniqueCategoryTypes = [];
            categoryData.forEach(entry => {
                uniqueCategoryTypes.push(entry.id);
            });
            setOptions(uniqueCategoryTypes);
        }
    }, [categoryData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {

                const nextIndex = (currentImageIndex + 1) % images.length;
                setCurrentImageIndex(nextIndex);
                setFadeIn(true);
            }, 500);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex]);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
                else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const elements = document.querySelectorAll('.hidden');
        elements.forEach((el) => observer.observe(el));

        setHiddenElements(elements);

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <>
            <div className='Body'>
                <Navbar />
                <div className='Home-Container' id='Home'>
                    <div className='hidden Home-Ele'>
                        <div className='Home-Quote'>
                            Your Vision, Our Precision
                        </div>
                        <div className='Home-Body'>
                            <div className='Home-List'>
                                <ol>
                                    <li>தரம்.</li>
                                    <li>நேர்மை.</li>
                                    <li>நாணயம்.</li>
                                </ol>
                            </div>
                            <div className='Home-Contact'>
                                <div className='Home-Quotation'>
                                    <div className='Quotation'>
                                        <button>
                                            Get A Quote
                                        </button>
                                    </div>
                                    <div className='Home-Mobile'>
                                        <div className='Home-MobileIcon'>
                                            <FaPhone />
                                        </div>

                                        <div className='Home-MobileValue'>
                                          
                                                <a href='tel:+91 984220665' style={{ textDecoration: 'none', color: '#ffffff' }}>
                                                    (+91)9842206654
                                                </a>
                                     
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="About" className='About-Container'>

                    <div className='About-ImageContainer'>
                        <img
                            src={images[currentImageIndex]}
                            alt="CEO"
                            className={fadeIn ? 'fade-in' : ''}

                        />



                    </div>

                    <div className='About-Body'>

                        <span className='About-Title hidden'>
                            <h1>
                                Our Story
                            </h1>
                        </span>
                        <div className='About-Description'>
                            <div className='About-SideDescription PC'>
                                Focused on excellence for our clients, we are well established, with a reputation for great service and a high-quality  finish.
                            </div>
                            <div className='About-MainDescription'>
                                <div className='About-Para1 '>
                                    With our roots in high-precision steel cutting, Premier Steels tackles a wide spectrum of projects with top-tier industrial partners and designers. We thrive on diversity, from intricate custom cuts to large-scale manufacturing projects.
                                </div>

                                <div className='About-Para2'>
                                    The magic happens at Premier Steels HQ - a 4,000m² cutting-edge facility in Coimbatore. This expansive, flexible space is reconfigured for every job, creating the optimal work environment with plenty of room to test and perfect your project prior to delivery.
                                </div>
                                <div className='About-Para3 PC'>
                                    Our advanced machinery and skilled craftsmen ensure that every cut meets the highest standards of precision and quality. By continually investing in the latest technology and training, we stay at the forefront of the steel cutting industry, capable of handling the most complex and demanding projects with unparalleled accuracy and efficiency.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='Client-Container' id='Clients'>
                    <Client />


                </div>
                <div className='Product-Container' id="Products">
                    <Products options={options} categoryData={categoryData} />

                </div>


                <div className='Location-Container' id='Location'>
                    <div className='Location-MainBody'>
                        <div className="Location-Heading hidden">
                            <h1>Our Location</h1>
                        </div>

                        <div className='Location-Body'>

                            <div className='Location-Description'>
                                <div className='Location-P1'>

                                    <h1>CONTACT US</h1>
                                    <p className='Location-Intro'>
                                        Premier Steels is committed to establishing itself as a premier metal contract manufacturer, starting with a contemporary approach as a low volume – high mix job shop.
                                        <span className='Location-PC'>
                                            <br /><br />
                                            We proudly serve clients nationwide, prioritizing swift project turnarounds, competitive pricing models, and uncompromising quality in every aspect of our work. Our dedication to precision and customer satisfaction drives us to continuously improve our processes and capabilities, ensuring that we meet and exceed the expectations of our partners.
                                        </span>
                                    </p>

                                </div>
                                <div className='Location-P2'>

                                    <h2>Mobile Phone</h2>
                                    <ol>
                                        <li>9842206654</li>
                                        <li>9842246654</li>
                                        <li>premierpostbox@gmail.com</li>
                                    </ol>
                                </div>
                                <div className='Location-P3'>
                                    <h2>Hours</h2>
                                    <ol>
                                        <li>M-F 8:00 am - 8:00 pm</li>
                                        <li>SAT 9:00 am - 4:30 pm</li>
                                        <li>SUN Closed</li>
                                    </ol>
                                </div>
                            </div>

                            <div className='Location-Map'>
                                <iframe className='Location-Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.2765063679785!2d76.9711936748074!3d10.942473389216577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85a48cdaeb17d%3A0xf3054e6313b991bf!2sPREMIER%20STEELS%20%26%20ENGINEERING!5e0!3m2!1sen!2sin!4v1720364541914!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                        </div>

                        <Footer />
                    </div>
                </div>





            </div>
        </>
    );
}

export default Home;
