import React, {useEffect, useState} from 'react';
import { numberFormat, totalMoney } from 'contants/NumberFormat';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { cartState$ } from 'redux/selectors';
import { deleteItemCart } from 'redux/actions/cart';

function CartSuccess(props) {
    const [count, setCount] = useState(0)
    const productsCart = useSelector(cartState$)
    const dispatch = useDispatch()

    const handleCountDown = (e) => {
        setCount(e)
    }
    const handleCountUp = (e) => {
        setCount(e)
    }

    useEffect(() => {
        localStorage.setItem('dataCart', JSON.stringify(productsCart))
    }, [productsCart, count])

    const deleteCart = (id) => {
        dispatch(deleteItemCart(id))
    }

    return (
        <div>
            <div>Gio hang <span>{productsCart.length} san pham</span></div>
            {
                productsCart.map(item=>{
                    return(
                        <div>
                            <div key={item.id}>
                                <img src={item.img} alt="" style={{width: '15%'}} />
                                <span>{item.name}</span>
                            </div>

                            <button onClick={() => deleteCart(item.id)} className="btn btn-danger">Xoa</button>

                            <div>
                                <button onClick={(e) => (item.count > 1 && --item.count, handleCountDown(item.count))}>-</button>
                                <input type="text" value={item.count} />
                                <button onClick={(e) => (++item.count, handleCountUp(item.count))}>+</button>
                                <span>{item.price}</span>
                            </div>
                        </div>
                    )
                })
            }

            <span>Tong cong {numberFormat(totalMoney(productsCart))}</span>
            <Link to="/thanh-toan"><button className="btn btn-success">Dat mua</button></Link>
        </div>
    );
}
export default CartSuccess;