import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../../Styles/stories.css";  

function Stories() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Our Happy Stories</h2>
      <Row>
        <Col xs={12} sm={6} md={4}>
          <Card className="story-card">
            <Card.Img variant="top" src="/images/card1.webp" />
            <Card.Body className="text-center">
              <Card.Title>Bride & Groom</Card.Title>
              <Card.Text>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab repudiandae nostrum optio, aspernatur doloribus aliquid porro ad suscipit voluptatum fugiat laborum, quisquam ea veritatis voluptatibus magnam at architecto tempora temporibus!
              </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="story-card">
            <Card.Img variant="top" src="/images/card4.jpeg" />
            <Card.Body className="text-center">
              <Card.Title>Bride & Groom</Card.Title>
              <Card.Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus ut iusto doloribus sint dolore cupiditate in tenetur at dolores placeat. Temporibus odio doloremque reprehenderit placeat suscipit minima pariatur! Sit, aspernatur.
              </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="story-card">
            <Card.Img variant="top" src="/images/card3.jpg" />
            <Card.Body className="text-center">
              <Card.Title>Bride & Groom</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum id eos quibusdam odit modi. Facilis, corporis alias. Dolores nulla expedita, corrupti error voluptas voluptatibus delectus corporis. Unde velit reiciendis fugit?
              </Card.Text>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: "20px"}}>
      <Col xs={12} sm={6} md={4}>
          <Card className="story-card">
            <Card.Img variant="top" src="/images/card2.jpg" />
            <Card.Body className="text-center">
              <Card.Title>Bride & Groom</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur omnis alias, voluptates dolores est, praesentium nostrum hic aut quia tenetur, explicabo blanditiis autem deleniti voluptate esse quis neque? Ex, dolor.
              </Card.Text>  
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="story-card">
            <Card.Img variant="top" src="/images/card5.jpg" />
            <Card.Body className="text-center">
              <Card.Title>Bride & Groom</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias illo aliquid sit, officia reiciendis odio quod itaque quidem quis impedit nostrum omnis quae obcaecati consequatur. Quo ipsa placeat voluptate quos!
              </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="story-card">
            <Card.Img variant="top" src="/images/card6.webp" />
            <Card.Body className="text-center">
              <Card.Title>Bride & Groom</Card.Title>
              <Card.Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex nihil pariatur neque maxime architecto inventore totam molestiae at incidunt corporis deleniti voluptatibus, aut atque ipsa natus ducimus nostrum eos. Quam!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Stories;
