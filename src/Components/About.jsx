import React from 'react'
import pic from '../assets/meals2.jpg'

const About = () => {
  return (
    <section className='about'>
      <main>
        <div>
          <img src={pic} alt="img" />
          <h1>How HealthyMe Works</h1>
          <p>The Smart Nutritionist website enables customers to access health advice and expert insights to help them optimize their lifestyle and achieve personalized dietary goals.
            The Smart Nutritionist website also provides customers with a shopping platform for a wide range of health products.
            <br />
            The Smart Nutritionist provides one-on-one counseling with a professional nutritionist who will prepare a personal report and make recommendations based on the client's individual health status.
            The Smart Nutritionist will also provide the client with the appropriate health products to support the client's healthy lifestyle.
          </p>
        </div>
      </main>
    </section>
  )
}

export default About
