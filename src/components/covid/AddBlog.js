import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddBlog(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddBlog = async() => {
        if(!title || !content) {
            alert('Please fill all the fields');
            return;
        }

        let data = {
            title: title,
            content: content,
            userId: 1
        }

        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
        if(res && res.data){
            let newBlog = res.data;
            props.handleAddNew(newBlog);
        }
        console.log(res);
    }

    return (
        <div>
            <form>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>Title</label>
                        <input value={title} onChange = {(e) => setTitle(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Content</label>
                        <input value={content} onChange = {(e) => setContent(e.target.value)} type="text" className="form-control" />
                    </div>
                </div>
            </form>
            <Modal.Footer>
                <button onClick = {handleAddBlog} className="btn btn-success px-3">Add new</button>
                <button className="btn btn-secondary px-3">Cancel</button>
            </Modal.Footer>
        </div>
    );
}

export default AddBlog;