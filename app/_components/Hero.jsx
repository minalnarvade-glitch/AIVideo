"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

function Hero() {

    const handleGetStarted = () => {
        window.location.href = "/login";
    };

    return (
        <div className='p-10 flex flex-col items-center justify-center
        mt-24 md:px-20 lg:px-36 xl:px-48'>

            <h2 className='font-bold text-6xl text-center'>
                Turn Ideas into Viral Videos in Seconds
            </h2>

            <p className="mt-6 text-2xl text-gray-600 text-center max-w-2xl">
                Generate, edit, and schedule high-quality short videos using AI — no editing
                skills required.
            </p>

            <div className='mt-7 gap-8 flex'>

                <Button
                    size="lg"
                    variant="secondary"
                    className="px-8 py-6 text-lg rounded-xl"
                >
                    Explore
                </Button>

                <Button
                    size='lg'
                    className="px-8 py-6 text-lg rounded-xl"
                    onClick={handleGetStarted}
                >
                    Get Started
                </Button>

            </div>

        </div>
    );
}

export default Hero;