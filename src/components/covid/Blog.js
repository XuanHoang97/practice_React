import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../customize/Fetch';
import Modal from 'react-bootstrap/Modal';
import AddBlog from './AddBlog';

const Blog = () => {
    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState([]);
    const handleClose=()=> { setShow(false); }
    const handleShow=()=> { setShow(true); }

    const {data: dataBlogs, loading, error} = useFetch(`https://jsonplaceholder.typicode.com/posts`, false);

    useEffect(() => {
        if(dataBlogs && dataBlogs.length > 0) {
            let data = dataBlogs.slice(0, 3);
            setNewData(data);
        }
    }, [dataBlogs]);

    const handleAddNew = (blog) => {
        let data = newData;
        data.unshift(blog);

        setShow(false);
        setNewData(data);
    }

    const deletePost = (id) => {
        let data = newData;
        data = data.filter(item => item.id !== id);
        setNewData(data);
    }

    return (
        <>
            <button onClick={handleShow} className="btn-sm my-2 btn btn-success" >Add new blog</button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Blog</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddBlog handleAddNew={handleAddNew}  />
                </Modal.Body>
            </Modal>

            <div className="d-flex">
                {
                    loading===false && newData && newData.length > 0 && newData.map(item => (
                        <div key={item.id} className="col-3 border border-primary mx-2 justify-content-between d-flex flex-column p-2">
                            <div className="content">
                                <h5>{item.title}</h5>
                                <p>{item.content}</p>
                            </div>

                            <div className="control">
                                <button type="button" className="btn btn-primary  w-50 btn-sm"> <Link to={`/blog/${item.id}`}className="text-white" > View detail</Link></button>
                                <button onClick = {()=> deletePost(item.id)}  type="button" className="btn btn-danger  w-50 btn-sm"> Delete</button>
                            </div>
                        </div>
                    ))
                }

                {
                    loading ===true &&
                    <div>Loading data ...</div>
                }
            </div>
        </>
    );
}

export default Blog;