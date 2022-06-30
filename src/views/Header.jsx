import React, { useState, useEffect } from "react";
import { Select, Row, Col, Input, Button } from "antd";
import ProductService from "../services/products/product.service";

import { connect } from "react-redux";
import { changeAll } from "../redux/actions/filters";
import { refresh } from "../redux/actions/servicesapi";

const { Option } = Select;
const Header = ({ refresh, changeAll, values }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState({
    limit: 5,
    offset: 0,
    name: "",
    category: "",
    page: 1,
  });

  useEffect(() => {
    refresh(page);
    changeAll(page);
  }, [page]);

  useEffect(() => {
    GetDataList();
    setPage(values);
  }, []);

  const GetDataList = () => {
    ProductService.GetCategories()
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.log("ERROR Categories", err);
      });
  };
  return (
    <div>
      <header>
        <div className="container">
          <Row gutter={16}>
            <Col span={4}>
              <Select
                defaultValue="choose category"
                style={{ width: "100%" }}
                onChange={(value) => {
                  setPage((prevState) => ({
                    ...prevState,
                    category: value,
                  }));
                }}
              >
                {!!categories
                  ? categories.map((item, idx) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))
                  : null}
              </Select>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Basic usage"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={() => {
                  setPage((prevState) => ({
                    ...prevState,
                    name,
                  }));
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </header>
    </div>
  );
};

// export default Header;
const mapStateToProps = (state) => {
  return {
    values: state.filters,
  };
};
export default connect(mapStateToProps, {
  changeAll,
  refresh,
})(Header);
