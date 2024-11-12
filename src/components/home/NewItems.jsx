import React, {useState, useEffect} from "react";
import ReactOwlCarousel from "react-owl-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from 'react-countdown';

const NewItems = () => {

  const [newItemsCollection, setNewItemsCollection] = useState([]);
  const [loading, setLoading] =useState()

  const state= {
    responsive:{
        0: {
            items: 1,
        },
        450: { 
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 4,
        },
    },
}

async function getNewItemsCollection() {
  if(newItemsCollection.length <= 0) {
    setLoading(true);
  const apiData = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')

  setNewItemsCollection(apiData.data);

  setLoading(false);
  }
}

function renderCoundown(timer) {
  return(
    <div className="de_countdown"><Countdown daysInHours date={timer} /></div>
  )
}



useEffect(() => {
  
  getNewItemsCollection();
  
}, []);

useEffect(() => {
  getNewItemsCollection();
}, [loading])

  return (
    <>
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <ReactOwlCarousel className="owl-theme hot-collections-carousel" loop nav margin={10} items={4} responsive={state.responsive}>
          {!loading ? newItemsCollection.map((newItem) =>(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={newItem.id}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link 
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={'Creator: '+ newItem.authorId}
                >
                  <img className="lazy" src={newItem.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {newItem.expiryDate ? renderCoundown(newItem.expiryDate): ''}
              

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to="/item-details">
                  <img
                    src={newItem.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{newItem.title}</h4>
                </Link>
                <div className="nft__item_price">{newItem.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{newItem.likes}</span>
                </div>
              </div>
            </div>
          </div>
          )):new Array(6).fill(0).map((_, index) => (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp skeleton-box" style={{width: 50, height: 50, borderRadius: "50%", display: "inline-block"}}>
                  
                </div>
                <div className="de_countdown"></div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="skeleton-box" style={{width: 200, height: 200}}></div>
                </div>
                <div className="nft__item_info">
                <div className="skeleton-box" style={{width: 100, height: 20,}}></div>
                  <div className="nft__item_price"> ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </ReactOwlCarousel>
          
        </div>
      </div>
    </section>
    </>
  );
};

export default NewItems;
