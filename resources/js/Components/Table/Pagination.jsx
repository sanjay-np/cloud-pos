import { Link } from '@inertiajs/react';
import React from 'react'


/**
 * Renders a pagination component given a set of links.
 *
 * @param {Array.<Object>} links An array of objects containing the
 *     pagination links, with the following properties:
 *     - `url`: The URL of the link.
 *     - `label`: The HTML content of the link.
 *     - `active`: A boolean indicating if the link is active.
 * @param {number} total The total number of records.
 * @param {number} from The first record number.
 * @param {number} to The last record number.
 *
 * @returns {React.ReactElement}
 */
const Pagination = ({ links, total, from, to }) => {

    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";

        }
    }

    return (

        links.length > 3 && (
            <div className="my-4 flex items-center justify-between px-4">
                <div>{`Showing ${from} - ${to} / ${total}`}</div>
                <div className="flex flex-wrap">
                    {links.map((link, index) => (
                        link.url === null ?
                            <div key={index} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </div>
                            :
                            <Link key={index} className={getClassName(link.active)} href={link.url}>
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                    ))}
                </div>
            </div>

        )
    );
}
export default Pagination
