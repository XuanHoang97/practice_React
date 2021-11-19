import React from "react";

export default function Filter({ sorts, sorting}) {
  return (
    <>
        <div className="col-2">
            <div className="form-group">
                <label for="">Lọc giá</label>
                <select className="form-control" value={sorts} onChange={sorting}>
                    <option value="all" >Tất cả</option>
                    <option value="low" >Giá thấp đến cao</option>
                    <option value="high" >Giá cao xuống thấp</option>
                </select>
            </div>
        </div>

        <div className="col-2">
            <div class="form-group">
            <label for="">Lọc loại sp</label>
            <select class="form-control" name="" id="">
                <option>Phổ biến</option>
                <option>Bán chạy </option>
                <option>Hàng mới</option>
            </select>
            </div>
        </div>
    </>
  );
}
