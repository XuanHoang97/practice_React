import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from 'redux/actions/cart';
import { mobilesState$ } from 'redux/selectors';
import * as actions from '../redux/actions';
import Menu from './Menu';

function Mobile(mobile) {
    const dispatch = useDispatch()
    const listMobile = useSelector(mobilesState$)

    useEffect(() => {
        dispatch(actions.getDataMobile.getDataMobileRequest())
    }, [dispatch]);

    const handleMobile = (e) => {
        dispatch(addProduct(e))
    }
    let dem=1;

    return (
        <>
            <Menu />
            <div className="mobile d-flex">
                {
                    listMobile.map((mb, key) => {
                        if(dem<=6){
                            dem++;
                            return(
                                <div className="col-md-1 item--prod" key={key}>
                                    <div onClick={() => handleMobile(mb)}>
                                        <Link to={`/chi-tiet-san-pham/` + mb.name + "." + mb.id + ".html"}>
                                            <img src={mb.img} alt="" />
                                            <p>{mb.name}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
    );
}
export default Mobile;