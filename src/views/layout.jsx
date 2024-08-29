import React from 'react';
import Header from '../components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import ContactUs from './contact_us';
import Privacy from './privacy';
import Terms from './terms';
import Contributors from './app/contributors';

export default function GeneralLayout() {
    return (
        <div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black dark:text-white'>
            <Header />
            <main className='flex-1 flex-grow mx-auto w-full'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contact-us' element={<ContactUs />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path="/contributors" element={<Contributors />} />

                </Routes>
            </main>
        </div>
    );
}
