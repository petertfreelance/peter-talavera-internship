import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const [topSellersCollection, setTopsellersCollection] = useState([]);
  const [loading, setLoading] =useState();


  async function getTopSellers() {

    if(topSellersCollection.length <= 0) {
      setLoading(true);
      const apiData = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');

      setTopsellersCollection(apiData.data)

      setLoading(false);
    }

  }

  useEffect(() => {
    getTopSellers();
  },[]);

  useEffect(() => {
  
    getTopSellers();
  },[loading]);


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {!loading ? topSellersCollection.map((seller)=>(
                <li key={seller.id}>
                <div className="author_list_pp">
                  <Link to={"/author/" + seller.authorId}>
                    <img
                      className="lazy pp-author"
                      src={seller.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to={"/author/" + seller.authorId}>{seller.authorName}</Link>
                  <span>{seller.price} ETH</span>
                </div>
              </li>
              )):new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp skeleton-box" style={{width: 50, height: 50, borderRadius: "50%", display: "inline-block"}}>
                    
                  </div>
                  <div className="author_list_info" style={{display:"inline-block", paddingLeft: 10}}>
                  <div className="skeleton-box" style={{width: 100, height: 20,}}></div>
                  <br />
                  <div className="skeleton-box" style={{width: 50, height: 20,}}></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
