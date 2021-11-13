import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GithubSearch= () => {
    // const [git, setGithub] = useState([]);
    const [git, setGithub] = useState(JSON.parse(localStorage.getItem('github')) || {});
    const [query, setQuery] = useState('');

    const handleSearch = async() => {
        let res = await axios({
            method: 'GET',
            'url': 'https://api.github.com/search/users',
            "params": {
                'q': query
            }
        })

        if(res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];

            if(raw && raw.length > 0) {
                raw.map((item, index) => {
                    let object = {};
                    object.id = item.id;
                    object.avatar = item.avatar_url;
                    object.username = item.login;
                    object.link = item.html_url;

                    result.push(object);
                });
            }
            setGithub(result);
            localStorage.setItem('github', JSON.stringify(result));
        }
    }

    //press enter
    const handleKeyDown=(e)=>{
        if(e.key=== 'Enter' || e.keyCode=== 13){     
            handleSearch();
        }
    }

    return (
        <div className="container mt-3 col-8" >
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search..." 
                    onKeyDown={(e)=>handleKeyDown(e)}
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />

                <div className="input-group-append">
                    <button onClick={handleSearch}  className="btn btn-success" type="submit"><i className="fas fa-search"></i></button>  
                </div>
            </div>

            <div className="length-result">
                Tìm thấy {git.length} kết quả cho từ khóa <span className = "h6 text-success">"{query}"</span> 
            </div>

            {
                git && git.length > 0
                ? git.map((item, index) => {
                    return(
                        <div className= "git-result d-flex my-3 align-items-center justify-content-between" key={index}>
                            <div className="d-flex">
                                <p className="">#{index + 1}</p>
                                <img src={item.avatar} alt="no display" className=" rounded-circle mx-4" style ={{width: '70px'}}  />

                                <div className="">
                                    <div className="font-weight-bold text-success"> {item.username} </div>
                                    <a href={item.link} target="__blank" className="text-primary">
                                        Github Link
                                    </a>
                                </div>
                            </div>
                            <button className="btn-sm btn btn-primary">
                                <Link to={`/detail/${item.username}`} className="text-white"> Detail </Link>
                            </button>
                        </div>
                    )
                }) : <span className="text-danger"> 'Khong tim thay user nao, vui long thu lai !'</span>
            }

        </div>
    );
}

export default GithubSearch;