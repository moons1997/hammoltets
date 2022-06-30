import React, { useEffect, useState } from "react";
import { Row, Col, Card, Pagination, Spin, Button, Select, Input } from "antd";
import ShowMoreText from "react-show-more-text";
import { connect } from "react-redux";
import { changeAll } from "../redux/actions/filters";
import { refresh } from "../redux/actions/servicesapi";
import { Link } from "react-router-dom";
import ProductService from "../services/products/product.service";

const { Meta } = Card;
const { Option } = Select;

const Home = ({ values, changeAll, refresh, dataApi }) => {
  const [dataLoading, setDataLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState({
    limit: 5,
    offset: 0,
    name: "",
    category: "",
    page: 1,
  });
  const GetDataList = () => {
    ProductService.GetCategories()
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.log("ERROR Categories", err);
      });
  };

  useEffect(() => {
    refresh(page);
    setPage(values);
    GetDataList();
  }, []);

  useEffect(() => {
    refresh(page);
    changeAll(page);
  }, [page]);

  const changePagination = (curPage, curPageSize) => {
    // pagination
    // pagesize * (page - 1);
    setPage((prevState) => ({
      ...prevState,
      page: curPage,
      offset: curPageSize * (curPage - 1),
    }));
  };

  const showSizeChange = (current, size) => {
    setPage((prevState) => ({
      ...prevState,
      limit: size,
    }));
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
      <section style={{ paddingTop: "20px" }}>
        <div className="container">
          <Row gutter={16}>
            {dataLoading ? (
              <Spin />
            ) : (
              dataApi?.products?.map((item, idx) => (
                <Col span={6} key={idx} style={{ marginBottom: "50px" }}>
                  <Link to={`/product/${item.id}`}>
                    <Card
                      hoverable
                      className="card"
                      cover={<img alt="example" src={item.thumbnail} />}
                    >
                      <Meta
                        title={item.title}
                        description={
                          item.description
                          // <ShowMoreText
                          //   /* Default options */
                          //   lines={2}
                          //   more="Show more"
                          //   less="Show less"
                          //   className="content-css"
                          //   anchorClass="my-anchor-css-class"
                          //   expanded={false}
                          //   width={280}
                          //   truncatedEndingComponent={"... "}
                          // >
                          //   {item.description}
                          // </ShowMoreText>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))
            )}
          </Row>
        </div>
      </section>
      <section style={{ marginBottom: "50px" }}>
        <div className="container">
          <Pagination
            defaultCurrent={1}
            current={page.page}
            total={dataApi?.count}
            pageSize={page.limit}
            onChange={changePagination}
            showSizeChanger
            showTotal={(total) => `Total ${dataApi?.count} items`}
            onShowSizeChange={showSizeChange}
            pageSizeOptions={[5, 10, 15, 30]}
          />
        </div>
      </section>
    </div>
  );
};

// export default Home;

const mapStateToProps = (state) => {
  return {
    values: state.filters,
    dataApi: state.servicesApi,
  };
};

export default connect(mapStateToProps, {
  changeAll,
  refresh,
})(Home);
