import React, { Fragment, useState } from 'react';
import Header from '../../components/header';
import Loader from '../../components/_loader';
import PageDetails from '../../components/_page_details';

export default function ViewPoll() {
    const [loading, setLoading] = useState(false)
    const [poll, setPoll] = useState(null)

    const ManageTheme = ({ colors }) => {
        if (colors) {
            document.body.style.backgroundColor = colors.pollContainerBackgroundColor;
            document.getElementById('poll-container').style.backgroundColor = colors.pollContainerBackgroundColor;
        }
    }
    return (
        <Fragment>
            <Header />
            <div className="min-h-screen bg-gray-900 p-0 p-12">
                {loading && <Loader />}
                {!loading && poll && (
                    <>
                        <PageDetails title={'poll'} />
                        <ManageTheme colors={() => { }} />
                    </>
                )}
            </div>
        </Fragment>
    );
}
