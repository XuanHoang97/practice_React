import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FacebookSearch(props) {
    const [fb, setFb] = useState(JSON.parse(localStorage.getItem('facebook')) || {});
    const [query, setQuery] = useState('');

    const handleSearch = async() => {
        let res = await axios({
            method: 'GET',
            'url': 'https://graph.facebook.com/search',
            "params": {
                'q': query,
            }
        })

        if(res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];

            console.log(raw);

            if(raw && raw.length > 0) {
                raw.map((item, index) => {
                    let object = {};
                    object.id = item.id;
                    object.name = item.name;
                    object.link = item.link;

                    result.push(object);
                });
            }
            setFb(result);
            localStorage.setItem('facebook', JSON.stringify(result));
        }
    }

    return (
        <div className="container mt-3 col-8">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search..." 
                    // onKeyDown={(e)=>handleKeyDown(e)}
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />

                <div className="input-group-append">
                    <button onClick={handleSearch}  className="btn btn-success" type="submit"><i className="fas fa-search"></i></button>  
                </div>
            </div>

            {
                fb && fb.length > 0
                ? fb.map((item, index) => {
                    return(
                        <div className= "git-result d-flex my-3 align-items-center justify-content-between" key={index}>
                            {item.name}
                            <Link to={`/facebook/${item.id}`} className="btn btn-primary">View</Link>
                            {item.link}
                        </div>
                    )
                }) : <span className="text-danger"> 'Khong tim thay user nao, vui long thu lai !'</span>
            }
        </div>
    );
}

export default FacebookSearch;