import React,{useState,useEffect} from 'react';
import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//import "~slick-carousel/slick/slick-theme.css";
import Card from '../UI/Card';
import './ThumbnailSlider.module.css';


const ThumbnailSlider = () =>{
	const [suggestion, setSuggestion] = useState([]);

	useEffect(() =>{
		fetch('https://jsonplaceholder.typicode.com/users').then(res=>res.json()).then(data => {
			setSuggestion(data);
		})
	}, [])

	let settings = {
		lazyLoad:true,
		infinite: false,
		speed:1000,
		arrows:true,
		slidesToShow:4,
		slidesToScroll: 4,
		initialSlide:0,
		responsive:[
			{
				breakpoint:1024,
				settings:{
					slidesToShow:3,
					slidesToScroll:3,
				}
			},
			{
				breakpoint:600,
				settings:{
					slidesToShow:3,
					slidesToScroll:3,
				}	
			},
			{
				breakpoint:400,
				settings:{
					slidesToShow:2,
					slidesToScroll:2,
				}
			}


		]
	};
	let styles = {

	}
		return (
			<div className="Container" style={{margin:'1em',textAlign:'center',padding:'2em'}}>
				<h1>Thumbnail Slider</h1>

				<Slider {...settings}>
				<Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/1`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ug
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
				   <Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/3`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ugy
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
				   <Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/6`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ugyj
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
				    <Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/4`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ugyjnj
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
				    <Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/5`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ugyjn
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
				   <Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/6`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ug
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
				   <Card> 
			 	    <div style={{textAlign:'center'}}>
			 	 	  <img className="edgeContent" src={`https://source.unsplash.com/random/7`} width={100} height={150} />
			 	 	  <p>
			 	 	  uyygyggfyii8ugyj
			 	 	  </p>
			 	 	  <button>ADD</button>
			 	    </div>
				   </Card>
		
				 </Slider>
			</div>
		);
	}

export default ThumbnailSlider;