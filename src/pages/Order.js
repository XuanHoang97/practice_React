import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, countProduct } from 'redux/actions/cart';

function Order(props) {
    const { order, number, handleDown, handleUp } = props
    const dispatch = useDispatch()

    const addCart = () => {
        if (number > 0) {
            order.count = number
            dispatch(addToCart(order))
            dispatch(countProduct(1))
        }
    }
    
    return (
    <> 
        <div className="numberPro">
            <button onClick={handleDown} type="button" className="btn btn-primary btn-sm">-</button>
            <input type="text" min="1" value={number} />
            <button onClick={handleUp} type="button" className="btn btn-primary btn-sm">+</button>
        </div>

        <button onClick={addCart} type="button" className="btn btn-success">Đặt hàng</button>
    </>
    );
}
export default Order;