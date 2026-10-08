import { Link } from "react-router-dom";

const facts = [
  {
    accent: "coral",
    title: "The world’s largest burger filled the stomachs of 8000 people!",
    text: "The heaviest burger ever measured was 3,591 pounds.",
  },
  {
    accent: "sky",
    title: "Sushi rice was once considered trash",
    text: "The rice was wrapped around the fish in order to give it a unique flavour, extend its life and protect it from insects. Once it was time to eat the fish, the rice was discarded.",
  },
  {
    accent: "teal",
    title: "The biggest taco ever was huge!",
    text: "The biggest taco ever made was constructed on November 20th, 2011 in Queretaro, Mexico. It was 246 feet long and was made with carnitas as the filling.",
  },
];

const HomePage = () => {
  return (
    <>
      <section className="home-header">
        <h1 className="headline">
          “Food is our common ground, a universal experience.”
        </h1>
        <h2 className="head-author">– James Beard</h2>
        <Link to="/explore" className="btn-cta">
          Start exploring <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="home-body">
        <h2 className="section-title">Tasty facts</h2>
        <div className="facts">
          {facts.map((fact) => (
            <article className={`fact fact-${fact.accent}`} key={fact.title}>
              <span></span>
              <span></span>
              <span></span>
              <div className="content">
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <h2>Hungry for more?</h2>
        <p>Browse the top 10 foods in the world and build a list of your own.</p>
        <Link to="/explore" className="btn-cta">
          Explore foods <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
};
export default HomePage;
