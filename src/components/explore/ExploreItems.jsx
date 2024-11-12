import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from 'react-countdown';

const ExploreItems = () => {

  const [exploreCollection, setExploreCollection] = useState([]);
  const [fullExploreCollection, setFullExploreCollection] = useState([]);
  const [loading, setLoading] =useState()
  const initialUrl = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
  const [apiUrl, setApiUrl] =  useState(initialUrl)
  const [loadLimit, setLoadLimit] = useState(8)

  async function getExploreCollection() {
    if(exploreCollection.length <=0) {
      setLoading(true);
      const apiData = await axios.get(apiUrl);

      const initialLoad = apiData.data.slice(0,loadLimit)
      
      setExploreCollection(initialLoad)
      setFullExploreCollection(apiData.data)

      setLoading(false);
    }
  }

  function renderCoundown(timer) {
    return(
      <div className="de_countdown"><Countdown daysInHours date={timer} /></div>
    )
  }

  function loadMore() {
    if(exploreCollection.length < fullExploreCollection.length) {
      const prevState = exploreCollection;

      

      let addedData = fullExploreCollection.slice((exploreCollection.length -1), (exploreCollection.length +3))


      let toAdd = prevState.concat(addedData);

      setLoadLimit(addedData.length)


      setExploreCollection(toAdd);
     

    } else {
      const button = document.getElementById('loadmore');

      button.remove()
    }
  }

  function filterContent(filter) {
      if(filter) {
        let newUrl = initialUrl +"?filter="+filter;

        setExploreCollection([])
        setApiUrl(newUrl);
        setLoading(true);
      } else {
        setExploreCollection([])
        setApiUrl(initialUrl);
        setLoading(true);
      }
  }

  useEffect(() => {
  
    getExploreCollection();
    
  }, []);
  
  useEffect(() => {
    
    getExploreCollection();
  }, [loading])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e)=>filterContent(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading && exploreCollection.length > 0 ? exploreCollection.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {item.expiryDate ? renderCoundown(item.expiryDate): ''}

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
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      )): new Array(loadLimit).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp skeleton-box" style={{width: 50, height: 50, borderRadius: "50%", display: "inline-block"}}>
              
            </div>
            

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
      <div className="col-md-12 text-center">
        <Link onClick={loadMore} to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
