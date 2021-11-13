import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../customize/Fetch';

const BlogDetail = () => {
    let {id} = useParams();
    let history = useHistory();

    const handleBackData = () => {
        history.goBack();
    }

    const {data: dataDetailBlog, loading, error} 
    = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false);

    return (
        <div>
            <button onClick={()=> handleBackData()} type="button" className="btn btn-primary">Back</button>
            {
                dataDetailBlog &&
                <>
                    <h5>{dataDetailBlog.title}</h5>
                    <p>{dataDetailBlog.body}</p>
                </>
            }
        </div>
    );
}

export default BlogDetail;