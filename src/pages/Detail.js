import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct,downCount, upCount} from "redux/actions/cart";
import { detailState$, countState$ } from "redux/selectors";
import { numberFormat} from 'contants/NumberFormat';
import Order from './Order'

const Detail = ({ match }) =>{
    const [data, setData] = useState([]);
    const prodDetail = useSelector(detailState$)
    const dispatch = useDispatch()

    let number = useSelector(countState$)
    
    const handleUp = () => {
      dispatch(upCount())
    }
    const handleDown = () => {
      if (number > 1)
        dispatch(downCount())
    }

    useEffect(() => {
        data.length > 0 && dispatch(addProduct(data[0]))
    }, [data, dispatch])

    useEffect(() => {
        const fetchProduct = () => {
          axios.get(`https://61275b59c2e8920017bc0c43.mockapi.io/api/product_mobile/?id=${match.params.id}`)
            .then((res) => { setData(res.data); })
            .catch((err) => console.log(err));
        };
        fetchProduct();
    }, []);

    return (
        <div>
            {
                [prodDetail].map((prod, key)=>{
                    return (
                        <div key={prod.id}>
                            <img src={prod.img} alt="" style={{width: '15%'}} />
                            <span>{prod.name}</span>
                            <span className="text-danger ml-3">{numberFormat(prod.price)}</span>
                        </div>
                    )
                })
            }
            <Order order={prodDetail}
                handleUp={handleUp}
                handleDown={handleDown}
                number={number}
            />
        </div>
    );
}
export default Detail;