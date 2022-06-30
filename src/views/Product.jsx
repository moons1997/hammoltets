import React, { useEffect, useState } from "react";
import { Button, Col, Row, Image, Rate } from "antd";
import { Link } from "react-router-dom";
import ProductService from "../services/products/product.service";

const Product = ({ match }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

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
    setLoading(true);
    ProductService.GetOneProduct(match.params.id)
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR product", err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <section>
          <div className="container product-item">
            <h1>Product {match.params.id}</h1>
            <Row gutter={16}>
              <Col span={6}>
                <Image
                  preview={{
                    visible: false,
                  }}
                  width={200}
                  src={!!data.images ? data?.images[0] : ""}
                  onClick={() => setVisible(true)}
                />
                <div
                  style={{
                    display: "none",
                  }}
                >
                  <Image.PreviewGroup
                    preview={{
                      visible,
                      onVisibleChange: (vis) => setVisible(vis),
                    }}
                  >
                    {!!data.images
                      ? data?.images.map((item, idx) => (
                          <Image src={item} key={idx} />
                        ))
                      : ""}
                  </Image.PreviewGroup>
                </div>
              </Col>
              <Col span={18}>
                <h1>{data?.title}</h1>
                <div>
                  <Row>
                    <Col span={6}>
                      <Rate
                        allowHalf
                        defaultValue={data.rating}
                        onChange={(e) => console.log("AAA", e)}
                      />
                    </Col>
                    <Col span={4}>
                      <div>
                        <h2>{data.price} $</h2>
                      </div>
                    </Col>
                  </Row>

                  <div>
                    <b>category : </b>
                    {data.category}
                    <b style={{ marginLeft: "10px" }}>brand : </b>
                    {data.brand}
                  </div>
                </div>
                <p>{data.description}</p>
              </Col>
              <Col span={24}>
                <Link to="/">
                  <Button style={{ marginTop: "50px" }}>back</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </section>
      )}
    </div>
  );
};

export default Product;
