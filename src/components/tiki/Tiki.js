import React, {useState} from 'react';
// import axios from 'axios';
import {Data} from '../../APIs/MockData';
import Filter from './Filter';
import Products from './Products';

const Tiki = () => {
    const [products, setProducts] = useState(Data);
    const [sort, setSort] = useState('');

     //sorting
    const sorting = (e) => {
        const sorting = e.target.value;

        const sortRes = products.sort((a, b) => {
        if (sorting === "all") {
            return a.id > b.id ? 1 : -1;
        }

        if (sorting === "low") {
            return a.price > b.price ? 1 : -1;
        }

        if (sorting === "high") {
            return a.price < b.price ? 1 : -1;
        }
        });

        setSort(sorting);
        setProducts(sortRes);
    };

    return (
        <>
            <div className="container col-12 d-flex mt-3">
                <div className="col-8">
                    <label for="">Tìm kiếm sp</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit"><i className="fas fa-search"></i></button>  
                        </div>
                    </div>
                </div>

                <Filter
                    sorting={sorting}
                    sorts={sort}
                />
            </div>
            <Products products={products}/>
        </>
    );
}

export default Tiki;