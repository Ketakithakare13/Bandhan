import React from "react";
import { Container, Button, Carousel, CarouselCaption } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img-fluid"
                        src="/images/nav1.avif"
                    />
                    <Carousel.Caption>
                        <div className="d-flex justify-content-center my-3">
                            <div className="container1">
                                <div className="form-item">
                                    <p>I'm looking for</p>
                                    <select className="form-select mx-2">
                                        <option value="male">Men</option>
                                        <option value="male">Man</option>
                                        <option value="female">Woman</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>aged</p>
                                    <select className="form-select mx-3">
                                    {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>to</div>
                                <div className="form-item"> 
                                <select className="form-select mx-3">
                                        {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>of religion</p>
                                    <select className="form-select mx-3">
                                        <option value="religion">Religion</option>
                                        <option value="hindu">Hindu</option>
                                        <option value="muslim">Muslim</option>
                                    </select>
                                </div>
                                <Link to="/login">
                                <Button variant="success" className="mx-5">
                                    Let's Begin
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/nav1.webp"
                    />
                   <Carousel.Caption>
                        <div className="d-flex justify-content-center my-3">
                            <div className="container1">
                                <div className="form-item">
                                    <p>I'm looking for</p>
                                    <select className="form-select mx-2">
                                        <option value="male">Men</option>
                                        <option value="male">Man</option>
                                        <option value="female">Woman</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>aged</p>
                                    <select className="form-select mx-3">
                                    {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>to</div>
                                <div className="form-item"> 
                                <select className="form-select mx-3">
                                        {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>of religion</p>
                                    <select className="form-select mx-3">
                                        <option value="religion">Religion</option>
                                        <option value="hindu">Hindu</option>
                                        <option value="muslim">Muslim</option>
                                    </select>
                                </div>
                                <Link to="/login">
                                <Button variant="success" className="mx-5">
                                    Let's Begin
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/nav3.avif"
                    />
                    <Carousel.Caption>
                        <div className="d-flex justify-content-center my-3">
                            <div className="container1">
                                <div className="form-item">
                                    <p>I'm looking for</p>
                                    <select className="form-select mx-2">
                                        <option value="male">Men</option>
                                        <option value="male">Man</option>
                                        <option value="female">Woman</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>aged</p>
                                    <select className="form-select mx-3">
                                    {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>to</div>
                                <div className="form-item"> 
                                <select className="form-select mx-3">
                                        {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>of religion</p>
                                    <select className="form-select mx-3">
                                        <option value="religion">Religion</option>
                                        <option value="hindu">Hindu</option>
                                        <option value="muslim">Muslim</option>
                                    </select>
                                </div>
                                <Link to="/login">
                                <Button variant="success" className="mx-5">
                                    Let's Begin
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="images/nav4.avif"
                    />
                    <Carousel.Caption>
                        <div className="d-flex justify-content-center my-3">
                            <div className="container1">
                                <div className="form-item">
                                    <p>I'm looking for</p>
                                    <select className="form-select mx-2">
                                        <option value="male">Men</option>
                                        <option value="male">Man</option>
                                        <option value="female">Woman</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>aged</p>
                                    <select className="form-select mx-3">
                                    {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>to</div>
                                <div className="form-item"> 
                                <select className="form-select mx-3">
                                        {[...Array(30)].map((_, index) => (
                                            <option key={index} value={index + 21}>
                                                {index + 21}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-item">
                                    <p>of religion</p>
                                    <select className="form-select mx-3">
                                        <option value="religion">Religion</option>
                                        <option value="hindu">Hindu</option>
                                        <option value="muslim">Muslim</option>
                                    </select>
                                </div>
                                <Link to="/login">
                                <Button variant="success" className="mx-5">
                                    Let's Begin
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Home;
