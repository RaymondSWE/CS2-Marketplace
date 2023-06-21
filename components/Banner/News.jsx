import React from "react";
import "./News.css";

const News = () => {
  const blogPosts = [
    {
      title: "G2A/Zen Pay Integration",
      description:
        "We're excited to announce the implementation of G2A Pay! Now you can make payments using cryptocurrencies, Apple/Google Pay, credits, and even PayPal. Enjoy a seamless and secure shopping experience.",
      date: "April 10, 2023",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Logo_g2a_icon.svg/1280px-Logo_g2a_icon.svg.png",
    },
    {
      title: "Trade Lock Issue Update",
      description:
        "We are aware of the trade lock issue and our team is working diligently to resolve it. Soon, you'll be able to see the exact number of days left until your item becomes tradeable again. Stay tuned for updates!",
      date: "April 12, 2023",
      image: "https://th.bing.com/th/id/OIG.a0Ga352dL8uCHH4sfSuU?pid=ImgGn",
    },
    {
      title: "Join Our Development Team",
      description:
        "We're seeking talented individuals to join our development team! Whether you're a frontend, backend, or DevOps specialist, we want to hear from you. Apply now and help us shape the future of our platform.",
      date: "April 15, 2023",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWBP8gN32Ssk_x37x8uMqDHlzaCpYsxnINhbMJnBCbeudxclKDWOeBVNWcSFim91X7Xu4&usqp=CAU",
    },
  ];

  return (
    <div className="blog-container">
      {blogPosts.map((post, index) => (
        <div className="blog-post" key={index}>
          <img src={post.image} alt={post.title} className="blog-post-image" />
          <div className="blog-post-content">
            <h2 className="blog-post-title gradientText">{post.title}</h2>
            <p className="blog-post-description primaryText">
              {post.description}
            </p>
            <p className="blog-post-date">{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
