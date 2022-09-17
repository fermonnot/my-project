import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Products = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div>
				<h1>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto earum et mollitia quo minima sunt vitae, nemo voluptatem modi commodi. Ad vitae itaque natus nihil tempore officiis eum inventore ea.hello again Frontend
				</h1>
			</div>
			<div id="carouselExampleCaptions" className="carousel slide p-3 mb-2 bg-light text-dark" data-bs-ride="false">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>

				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://picsum.photos/id/237/200/300" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>First slide label</h5>
							<p>Some representative placeholder content for the first slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://picsum.photos/200/300" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Second slide label</h5>
							<p>Some representative placeholder content for the second slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://picsum.photos/200/200" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Third slide label</h5>
							<p>Some representative placeholder content for the third slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://picsum.photos/200/200" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Third slide label</h5>
							<p>Some representative placeholder content for the third slide.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://picsum.photos/200/200" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5>Third slide label</h5>
							<p>Some representative placeholder content for the third slide.</p>
						</div>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
			<div className="container row my-3  d-flex justify-content-center">
				{store.products.map((products,index) => {
					return (
						<div key={index} className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 mx-1 my-2">

							<img src="https://picsum.photos/id/237/200/300" className="card-img-top" alt="..." />
							<div className="card-body">
								<h5 className="card-title">{products.description}</h5>
								<p className="card-text"><b>Precio:</b> {products.price} Bs</p>
								<a href="#" className="btn btn-primary">Click para Comprar</a>
							</div>
						</div>

					);
				})}
			</div>
				


		</div>
	);
};
