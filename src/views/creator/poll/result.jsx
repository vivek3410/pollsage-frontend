import React, { useEffect, useState } from 'react';
import PageDetails from '../../../components/_page_details';
import { useParams } from 'react-router-dom';
import { getPollResult } from '../../../services/creator/poll.service';
import Loader from '../../../components/_loader';
import { formattedDateFromNow } from '../../../helpers/common';

export default function PollResults() {
    const [poll, setPoll] = useState(null);
    const [pollUrl, setPollUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const { pollId } = useParams()

    useEffect(() => {

    }, [])

    const loadData = async () => {
        try {
            let res = await getPollResult(pollId);
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    const optionText = (id, options) => {
        return options.find((option) => option._id === id)?.text;
    }
    return (
        <>
            <PageDetails title="Poll Result - PollSage" description="Poll result" />
            {loading && <Loader />}
            {!loading && (
                <div className="mt-4 mx-4">
                    <h1 className="text-xl my-4">Poll list</h1>
                    <div className="w-full overflow-hidden rounded-sm shadow-xs">
                        <div className="w-full overflow-x-auto">
                            <table className="items-center w-full bg-gray-800 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Options
                                        </th>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Votes
                                        </th>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!loading &&
                                        poll.poll.options.map((option, index) => (
                                            <tr
                                                className="text-gray-100 dark:text-gray-100"
                                                key={index}
                                            >
                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {option.text}
                                                </th>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {option.votes}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">
                                                            {(
                                                                (Number(option.votes) /
                                                                    Number(poll.totalVotes)) *
                                                                100
                                                            ).toFixed(2)}
                                                            %
                                                        </span>
                                                        <div className="relative w-full">
                                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                                <div
                                                                    style={{
                                                                        width: `${(Number(option.votes) /
                                                                            Number(poll.totalVotes)) *
                                                                            100
                                                                            }%`,
                                                                    }}
                                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                            <span className="flex items-center col-span-3">
                                {" "}
                                Total votes{" "}
                            </span>
                            <span className="col-span-2"></span>
                            {/* <!-- Pagination --> */}
                            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                {!loading && <p>{poll.totalVotes}</p>}
                            </span>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden rounded-sm shadow-xs mt-10">
                        <div className="w-full overflow-x-auto">
                            <table className="items-center w-full bg-gray-800 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Options
                                        </th>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">State</th>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Country</th>
                                        <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!loading &&
                                        poll.pollResponses.map((response, index) => (
                                            <tr
                                                className="text-gray-100 dark:text-gray-100"
                                                key={index}
                                            >
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {optionText(response?.optionId, poll.poll.options)}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {response?.geo_location.city +
                                                        ", " +
                                                        response?.geo_location.regionName}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {response?.geo_location?.country}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {formattedDateFromNow(response?.createdAt)}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                            <span className="flex items-center col-span-3">
                                {" "}
                                Total votes{" "}
                            </span>
                            <span className="col-span-2"></span>
                            {/* <!-- Pagination --> */}
                            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                {!loading && <p>{poll.totalVotes}</p>}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
