import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { numberFormat, totalMoney } from '../contants/NumberFormat';
import { cartState$ } from 'redux/selectors';
import { deleteItemCart } from 'redux/actions/cart';

function Menu(props) {
    const productsCart = useSelector(cartState$)
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(deleteItemCart(id))
    }

    const ProdAdded=()=>{
        return productsCart.map((item, key)=> {
                return(
                    <div className='d-flex justify-content-between align-items-start'>
                        <img src={item.img} alt={item.name} className="w-25"/>
                        <h6 className='small text-danger m-0'>{numberFormat(item.price)}</h6>
                        <span className='small m-0'> x{item.count}</span>
                        <div onClick={() => handleDelete(item.id)} className="text-danger small mt-2">Xóa</div>
                    </div>
                )
            }
        )
    }

    return (
        <div> 
            <div className="header d-flex">
                <div className="cart col-md-3 mb-3">
                    <span>Giỏ hàng</span>
                    <span className="badge badge-success ml-2">{productsCart.length}</span>
                </div>
                {
                   productsCart.length > 0 ? (
                       <div>
                            {ProdAdded()}
                            <h6>Tổng: 
                                <span className='ml-3 font-weight-bold text-danger'>
                                    {numberFormat(totalMoney(productsCart))}
                                </span>
                            </h6>
                            <Link to='/gio-hang'><button className='btn btn-success btn-sm w-100 mt-2 font-weight-bold'>Xem</button></Link>
                       </div>
                   )
                   : ( <p>Chưa có sản phẩm</p> )  
                }
            </div>
        </div>
    );
}
export default Menu;