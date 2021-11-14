import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactPaginate from "react-paginate";
import './pagination.scss';

const YoutubeSearch = () => {
    const [video, setVideo] = useState(JSON.parse(localStorage.getItem('youtube')) || {});
    const [query, setQuery] = useState('')
    ;

    const [pageNumber, setPageNumber] = useState(0);
    const videoPerPage = 2;
    const pagesVisited = pageNumber * videoPerPage;

    const displayVideo = video
    .slice(pagesVisited, pagesVisited + videoPerPage)
    .map((item, index) => {
      return (
        <div className= "yt-result d-flex my-3" key={index} >
            <div className="left mr-3">    
                <iframe width="260" height="130" 
                    src={`https://www.youtube.com/embed/${item.id}`} 
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>

            <div className="right">
                <div className="title"> <h6>{item.title}</h6>  </div>
                <div className="created-at small"> Created at: {moment(item.createdAt).format('DD-MM-YYYY, HH:mm:ss A')} </div>
                <div className="author text-success font-weight-600"> {item.author} </div>
                <div className="description small"> {item.description} </div>
            </div>
        </div>
      );
    });

    const pageCount = Math.ceil(video.length / videoPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleSearchYoutube = async() => {
        let res = await axios({
            method: 'GET',
            'url': 'https://www.googleapis.com/youtube/v3/search',
            "params": {
                "part": "snippet",
                "maxResults": 5,
                'key': 'AIzaSyDzCgKYN5e99Y_ata3nEWRcSpYW1apxIK8',
                'type': 'video',
                'q': query
            }
        })

        if(res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];

            if(raw && raw.length > 0) {
                raw.map((item, index) => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = moment(item.snippet.publishedAt).format('DD-MM-YYYY, hh:mm:ss a');
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object);
                });
            }
            setVideo(result);
            localStorage.setItem('youtube', JSON.stringify(result));
        }
    }

    //press enter
    const handleKeyDown=(e)=>{
        if(e.key=== 'Enter' || e.keyCode=== 13){     
            handleSearchYoutube();
        }
    }

    return (
        <div className="container mt-3 col-8">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search..." 
                    onKeyDown={(e)=>handleKeyDown(e)}
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />

                <div className="input-group-append">
                    <button onClick = {handleSearchYoutube}  className="btn btn-success" type="submit"><i className="fas fa-search"></i></button>  
                </div>
            </div>

            <div className="length-result">
                Tìm thấy {video.length} kết quả cho từ khóa <span className = "h6 text-success">"{query}"</span> 
            </div>

            {displayVideo}
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

export default YoutubeSearch;