"use client"
import React, { useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Progress, Button, Spinner} from "@nextui-org/react";
import ReactStars from "react-rating-stars-component";
import { FaPencilAlt } from "react-icons/fa";
import Modal from './Modal';
import CreateRating from './CreateRating';
import { useQuery } from 'react-query';
import getTotalRatings from './apiRating';

export default function RatingStats() {
    const [totalRating,setTotalRating] = useState([]);
    const {isLoading, isError, data, error}= useQuery({
        queryKey:"rating",
        queryFn: () => getTotalRatings(),
        onSuccess:(data)=>{
            setTotalRating(data);
        }
    })
    const calculatePercentage = (starCount) => {
        if (!data || data.length === 0) return 0;
        const count = data.filter(rate => rate.rating === starCount).length;
        return ((count / data.length) * 100).toFixed(0);
    };
    const averageRating = () => {
        if (!data || data.length === 0) return 0;
        const totalStars = data.reduce((sum, rate) => sum + rate.rating, 0); // Initial sum set to 0
        return (totalStars / data.length).toFixed(1);
    };
    if (isLoading) return <div><Spinner/></div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div>
            <Card className="max-w-[500px] px-8 py-5 max-[320px]:px-3" shadow="md"  >
            <CardHeader className=" flex flex-row items-center gap-1 p-0">
            <ReactStars
                count={1}
                value={1}
                size={30}
                isHalf={false}
                fullIcon={<i className="fa fa-star"></i>}
                color="#ffd700"
                edit={false}
                />
                <h1 className=' text-xl font-bold'>{averageRating ()}</h1>
                <h2 className=' text-xl text-default-500'>•</h2>
                <h3 className='text-default-500 text-lg'>{`(Basée sur ${totalRating.length} témoignages)`}</h3>
            </CardHeader>
            <CardBody className=' flec flec-col gap-3 py-4 px-0'>
                {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className=' flex flex-col gap-1'>
                    <div className=' flex flex-row justify-between'>
                        <h2>{star} étoile</h2>
                        <h1>{calculatePercentage(star)}%</h1>
                    </div>
                    <Progress aria-label="Loading..." value={calculatePercentage(star)} className="max-w-md"/>
                </div>
                ))}
                
            </CardBody>
            <CardFooter className="flex flex-col gap-3 justify-center "> 
                <Modal>
                    <Modal.Open opens="rating">
                        <Button className=' w-full rounded-full' variant='bordered'>
                            <FaPencilAlt />
                            <p>Ecrire Votre Témoingage</p>
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="rating"> 
                        <CreateRating />
                    </Modal.Window>
                </Modal>

                <h2 className=' text-default-500'> Partager Votre Exprience avec nous</h2>
            </CardFooter>
            </Card>
        </div>
    )
}
