import {useState, useEffect} from 'react';
import useFetch from '../customize/Fetch';
import moment from 'moment'


const Covid = () => {
    const today = moment().startOf('day').toISOString(true);
    const priorDate = moment().startOf('day').subtract(31, 'days').toISOString(true);

    const {data: dataCovid, loading, error} 
    = useFetch(`https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${today}`, true);
    
    return (
        <>
            <h3>Covid 19 tracking in Vietnam</h3>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Active</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {error===false &&  loading===false &&  dataCovid && dataCovid.length > 0 &&
                        dataCovid.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.Date}</td>
                                    <td>{item.Confirmed}</td>
                                    <td>{item.Active}</td>
                                    <td>{item.Recovered}</td>
                                    <td>{item.Deaths}</td>
                                </tr>
                            )
                        }
                    )}

                    {
                        loading===true &&
                        <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    }

                    {
                        error===true &&
                        <tr>
                            <td colSpan="5" className="text-center">Something wrong</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default Covid;