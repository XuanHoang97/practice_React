import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import './pagination.scss';

const Github= () => {
    const [git, setGithub] = useState(JSON.parse(localStorage.getItem('github')) || {});
    const [query, setQuery] = useState('');

    const [pageNumber, setPageNumber] = useState(0);
    const gitPerPage = 4;
    const pagesVisited = pageNumber * gitPerPage;

    const displayGit = git
    .slice(pagesVisited, pagesVisited + gitPerPage)
    .map((item, index) => {
      return (
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
      );
    });

    const pageCount = Math.ceil(git.length / gitPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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

            {displayGit}
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
}

export default Github;