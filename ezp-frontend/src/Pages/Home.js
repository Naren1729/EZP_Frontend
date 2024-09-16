import React from "react";
import Hero from "../Components/Hero";
import Buttons from "../Components/Buttons";
import NavBar from "../Components/NavBar";
import About from "../Components/About";
import Features from "../Components/Features";
import Team from "../Components/Team";
import Footer from "../Components/Footer";

export default function Home() {
  const isLoggedIn = sessionStorage.getItem("username");
  return (
    <>
      <NavBar />
      <section id="home">
        <Hero />
      </section>
      <Buttons />
      

      <section id="about">
        <About />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="team">
        <Team />
      </section>
      <Footer />
    </>
  );
}