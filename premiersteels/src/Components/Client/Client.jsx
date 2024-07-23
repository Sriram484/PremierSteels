
import "../Home/Home.css"
import ClientCard from './ClientCard'

import React, { useEffect, useState } from 'react'

import Carousel from 'react-multi-carousel';

import { responsive } from "../Carousel/ClientCardResponsive";

let customerReviews = [
  {
      id: 1,
      name: "Karthick",
      date: "March 2023",
      comment: "Impressive service",
      description: "Premier Steels sets a high standard with their impeccable service and attention to detail. They provided tailored solutions that perfectly matched my project requirements. Their team ensured every step, from consultation to delivery, was smooth and efficient. Premier Steels' commitment to quality and professionalism is unmatched, making them a reliable partner for any steel-related needs."
  },
  {
      id: 2,
      name: "Dharneesh",
      date: "April 2022",
      comment: "Exceptional experience",
      description: "Choosing Premier Steels was a wise decision. Their expertise and dedication to customer satisfaction were evident throughout my project. They offered prompt and reliable service, delivering high-quality products that met my specifications. Premier Steels' team was knowledgeable and responsive, ensuring a seamless experience from start to finish. I highly recommend them for their reliability and commitment to excellence."
  },
  {
      id: 3,
      name: "Rokhithran",
      date: "June 2021",
      comment: "Reliable partner",
      description: "Premier Steels proved to be a reliable partner in our steel procurement. Their service was exemplary, providing tailored solutions that fit our project timeline and budget. They demonstrated expertise and professionalism at every stage, ensuring efficient handling and delivery of our orders. Premier Steels' dedication to quality and customer satisfaction makes them a standout choice in the industry."
  },
  {
      id: 4,
      name: "Ram",
      date: "August 2020",
      comment: "Top-notch service",
      description: "I had an outstanding experience with Premier Steels. Their service was top-notch, from the initial consultation to the final delivery. They offered innovative solutions and expert advice, ensuring our project's success. Premier Steels' commitment to excellence and reliability is commendable, making them our preferred supplier for steel products."
  },
  {
      id: 5,
      name: "Krishna",
      date: "October 2019",
      comment: "Exceptional quality",
      description: "Premier Steels provided exceptional quality and service throughout our partnership. Their team was responsive and proactive, offering solutions that exceeded our expectations. From product selection to delivery, every interaction with Premier Steels was efficient and professional. They are a trusted partner in the industry, delivering on their promises with integrity."
  },
  {
      id: 6,
      name: "Ram",
      date: "January 2024",
      comment: "Highly recommended",
      description: "Premier Steels stands out for their superior service and product quality. They consistently deliver on their commitments with professionalism and attention to detail. From start to finish, our experience with Premier Steels was exceptional, showcasing their expertise and dedication. I confidently recommend them to anyone seeking reliable steel solutions."
  },
  {
      id: 7,
      name: "Muthuvel",
      date: "May 2023",
      comment: "Excellent service",
      description: "Choosing Premier Steels was the best decision for our project. They provided comprehensive solutions tailored to our specific needs. Their team was knowledgeable and responsive, ensuring seamless coordination and timely delivery. Premier Steels' commitment to excellence and customer satisfaction is unparalleled, setting them apart as a leader in the industry."
  },
  {
      id: 8,
      name: "Gautham",
      date: "July 2022",
      comment: "Professionalism at its best",
      description: "Premier Steels exemplifies professionalism and reliability in every aspect of their service. They offered proactive solutions and demonstrated expertise from the initial consultation through project completion. Premier Steels' dedication to quality and customer care makes them a preferred choice for steel solutions."
  },
  {
      id: 9,
      name: "Sanjay",
      date: "September 2021",
      comment: "Outstanding performance",
      description: "Premier Steels delivered outstanding performance and service quality throughout our collaboration. Their team was committed to meeting our project requirements with precision and efficiency. They provided valuable insights and proactive support, ensuring a seamless experience from start to finish. I highly recommend Premier Steels for their reliability and professionalism."
  },
  {
      id: 10,
      name: "Puli Pandi",
      date: "December 2020",
      comment: "Impressive results",
      description: "Our experience with Premier Steels was nothing short of impressive. They offered innovative solutions and exceptional service quality. Premier Steels' team was proactive and responsive, ensuring our project's success. Their commitment to excellence and customer satisfaction makes them a trusted partner in the industry."
  }
];

const Client = () => {
  const [hiddenElements, setHiddenElements] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
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

    useEffect(() => {
      // Dynamically import the CSS for the carousel
      const loadCarouselCss = async () => {
        await import('react-multi-carousel/lib/styles.css');
        setIsLoaded(true);
      };
  
      // Delay to ensure the carousel is rendered before adding hidden class
      const timeout = setTimeout(() => {
        loadCarouselCss();
      }, 10); // Adjust delay as needed
      return () => clearTimeout(timeout);
    }, []);
  return (
    <>
    <div className="Client-MainBody">
      <div className=" Client-Heading hidden">
        <h1>
      Our Clients

        </h1>
      </div>
      <div className="Client-Body">
      <Carousel
      responsive={responsive}
      arrows={false} autoPlay={true} autoPlaySpeed={5000} infinite={true}
      >
        {customerReviews.map(review => (
            <ClientCard key={review.id} review={review} />
          ))}
  </Carousel>
      </div>
    </div>
   
  </>
)
}
export default Client; 