import {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment'

const useFetch = (url, isCovidData) =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        try {
            async function fetchData() {
                let res = await axios.get(url);
                let data = (res && res.data) ? res.data : [];
                if(data && data.length > 0 && isCovidData === true) {
                    data.map(item => {
                        item.Date = moment(item.Date).format('DD/MM/YYYY');
                        return item;
                    })
                    data = data.reverse();
                }
                setData(data);
                setLoading(false);
                setError(false);
            }
            
            fetchData();
        }
        catch(e) {
            setError(true);
            setLoading(false);
        }
        
    }, [url]);

    return {
        data,
        loading,
        error
    }
}

export default useFetch;