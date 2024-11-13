import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const HotCollections = () => {

  const [hotCollections, setHotCollections] = useState([]);
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

  async function getHotCollections() {
    if(hotCollections.length <= 0) {
      setLoading(true);
    const apiData = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');

    if (loading) {
      setHotCollections(apiData.data);
    }

    setLoading(false);
    }
    

  }

  useEffect(() => {
    getHotCollections();
  }, []);

  useEffect(() =>{
    getHotCollections();
  }, [loading])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <ReactOwlCarousel className="owl-theme hot-collections-carousel" loop nav margin={10} items={4} responsive={state.responsive}>
          {!loading ? hotCollections.map((hotItem) => (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={hotItem.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={"/item-details/"+hotItem.nftId}>
                    <img src={hotItem.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={"/author/" + hotItem.authorId}>
                    <img className="lazy pp-coll" src={hotItem.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{hotItem.title}</h4>
                  </Link>
                  <span>ERC-{hotItem.code}</span>
                </div>
              </div>
            </div>
          )): new Array(6).fill(0).map((_, index) => (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="skeleton-box" style={{width: "100%", height: 200,}}>
                  
                </div>
                <div className="nft_coll_pp">
                  <Link to="/">
                  <div className="skeleton-box" style={{width: 50, height: 50, borderRadius: "50%",}}>

                  </div>
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/">
                    <div className="skeleton-box" style={{width: 100, height: 20,}}>

                    </div>
                  </Link>
                  <br />
                  <div className="skeleton-box" style={{width: 60, height: 20,}}>
                      
                    </div>
                </div>
              </div>
            </div>
          ))}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
