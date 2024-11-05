import React from 'react';
import SecondaryCard from './SecondaryCard';
import VideoCard from './VideoCard';
import RealTimeCard from './RealTimeCard';
import {useGetTopMoviesQuery,useGetAllMoviesQuery}from '../../../../redux/api/movie';
import { useGetUsersQuery } from '../../../../redux/api/user';



export default function Main() {
    const{data:topMovies}=useGetTopMoviesQuery();
    console.log(topMovies);
    const {data:visitors}=useGetUsersQuery();
    const {data:allMovies}=useGetAllMoviesQuery();


    const totalCommentsLength=allMovies?.map((m)=>m.numReviews);
    const sumOfCommentsLength=totalCommentsLength?.reduce(
        (acc,length)=>acc + length,
        0
    )

    return (
        <div>
          <section className="flex justify-around">
            <div className="ml-[14rem] mt-10">
              <div className="-translate-x-4 flex">
                <SecondaryCard
                  pill="Users"
                  content={visitors?.length}
                  info="20.2k more then usual"
                  gradient="from-teal-500 to-lime-400"
                />
                <SecondaryCard
                  pill="Comments"
                  content={sumOfCommentsLength}
                  info="742.8 more then usual"
                  gradient="from-[#CCC514] to-[#CDCB8E]"
                />
                <SecondaryCard
                  pill="Movies"
                  content={allMovies?.length}
                  info="372+ more then usual"
                  gradient="from-green-500 to-lime-400"
                />
              </div>
              <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
                <p>Top Content</p>
                <p>Comments</p>
              </div>
    
              {topMovies?.map((movie) => (
                <VideoCard
                  key={movie._id}
                  image={movie.image}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                />
              ))}
            </div>
    
            <div>
              <RealTimeCard />
            </div>
          </section>
        </div>
      );
    };
