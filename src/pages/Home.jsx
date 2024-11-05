import React from 'react';
import MovieContainerPage from './Movies/MovieContainerPage';
import Header from './Movies/Header';

export default function Home() {
  return (
    <>
      <Header/>
    
       <section className="mt-40 ">
        <MovieContainerPage/>
      </section>
    </>
  
  );
}
