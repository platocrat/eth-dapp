import React, { useState } from 'react'
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'
import s1 from "../images/facebook_profile_image.1.png"
import s12 from "../images/favicon.png"

const About = () => {
    const [cards, setCards] = useState(data);
        return(
            <div>
                <section className="bg-white mt-10 mx-5 px-5 py-10 mb-20 rounded-lg border-2 lg:w-2/3 lg:mx-auto"> 
                    <div>
                    <h3 className="font-bold text-xl"> About this project </h3>
                    <p className="my text-gray-600">
                        The Mastercraft Bamboo is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height.
                    </p>
                    </div>
                <Pledges />
                
                </section>
            </div>     
        )
}
export default About;