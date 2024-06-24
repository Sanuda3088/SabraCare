// eslint-disable-next-line no-unused-vars
import React from 'react'

const Home = () => {
  return (
    <>
    {/*============= hero section ===========*/}
    <section className='hero_section pt-[60px] 2xl:h-[800px]'>
      <div className='container'>
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
          {/*============= hero section ===========*/}
          <div>
            <div className="lg:w-[570px]">
              <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>We help patients live a healthy, longer life.</h1>
              <p className='text_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis accusantium cum harum aspernatur nemo qui ad doloremque voluptatem et? Omnis vel repellat beatae quis asperiores qui molestias eum repudiandae deserunt!</p>
              <button className='btn'>Request an Appointment</button>
            </div>
          </div>

        </div>

      </div>

    </section>
    </>
  )
}

export default Home