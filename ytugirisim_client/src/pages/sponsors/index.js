import Layout from "@/hoc/Layout";
import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

const index = ({ error, sponsors, imgLink }) => {

    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    }); 

 return (   
	<Layout>  
	
	<motion.div className="progress-bar" style={{ scaleX }} />

            <div className="section">
                <h2 className="section-title ">Sponsorlarımız!</h2>
	
	<img className="page_hero"
        src="/agreement-animate.svg"/>
	
    <div className="work__container bd-grid">
                    {sponsors.map((sponsor) => {
                        // Get the ID of the profile picture for the member
                        const pictureId =
                            sponsor.attributes.Photo.data.id;
                        // Find the media object with the same ID as the profile picture (using optional chaining to avoid errors)
                        const mediaObject = imgLink?.find(
                            (obj) => obj.id === pictureId
                        );

                        // If the media object exists, get the URL property
                        const picPath =
                            mediaObject?.attributes.media_field.data.attributes
                                .url;

                        return (
                            <article
                                id={sponsor.id}
                                key={sponsor.id}
                                className="featured__card"
                            >

                                <img
                                    src={
                                        process.env.NEXT_PUBLIC_BASE_URL +
                                        `${picPath}`
                                    }
                                    alt=""
                                    className="featured__img"
                                />

                                <div className="featured__data">
                                    <h3 className="featured__title">
                                        {sponsor.attributes.Name}
                                    </h3>
                                </div>

                                <div className="featured__button">
                                    <h3 className="featured__department">
                                        {sponsor.attributes.Code}
                                    </h3>
                                </div>
                            </article>
                        );
                    })}
                </div>
				</div>
	</Layout>
  )
}
export async function getServerSideProps() {
    const sponsorResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsors?populate=*`
    );

    const data = await sponsorResponse.json();
	const mediaResponse = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/medias?populate=*`
    );
	const mediaData = await mediaResponse.json();
	console.log(mediaData.data[0].attributes.media_field.data.attributes.url);
    if (data && mediaData) {
        return {
            props: {
				imgLink: mediaData.data,
                sponsors: data.data,
            },
        };
    } else {
        return {
            props: {
                error: sponsorResponse.statusText,
            },
        };
    }
}


export default index;

