import React from 'react';
import CreatorSidebar from '../../components/creator/sidebar';
import CreatorHeader from './header';
import { Route, Routes } from 'react-router-dom';
import CreatePoll from './poll/create';
import CreateTheme from './themes/create';
import Dashboard from './dashboard';
import PollList from './poll/list';
import EditPoll from './poll/edit';
export default function CreatorLayout() {
    return (
        <div x-data="setup()">
            <CreatorSidebar />
            <div className="h-full ml-14 md:ml-64">
                <CreatorHeader />
                <div className="px-4 py-8 md:px-8">
                    <Routes>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/polls/create' element={<CreatePoll />} />
                        <Route path='/edit-poll/:pollId' element={<EditPoll />} />
                        <Route path='/polls' element={<PollList />} />


                        
                        <Route path='/themes/create' element={<CreateTheme />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
