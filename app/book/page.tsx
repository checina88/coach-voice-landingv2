'use client';

import React from 'react';
import Navbar from '../../components/coach/Navbar';
import BookForm from '../../components/coach/BookForm';

export default function BookPage() {
    return (
        <main className="min-h-screen bg-[#e0e0e0] font-sans selection:bg-[#a0d4c1] selection:text-[#1a1d21]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row min-h-screen pt-24 pb-12 items-center gap-12 lg:gap-24">

                {/* Left Side - Transformational Copy */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1d21] leading-tight mb-8 tracking-tight">
                            A quieter way to understand your impact.
                        </h1>

                        <div className="space-y-6 text-lg md:text-xl text-[#475569] font-light leading-relaxed">
                            <p>
                                Coaching happens in real time.
                                Words are spoken, moments pass, and meaning is often felt before it is understood.
                            </p>
                            <p>
                                You are not being sold to — you are being invited to reflect.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Card */}
                <div className="w-full lg:w-1/2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    <BookForm />
                </div>
            </div>
        </main>
    );
}
