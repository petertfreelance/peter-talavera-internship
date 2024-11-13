import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {

  const id = useParams();
  const [loading, setLoading] = useState();

  const [itemdetails, setItemDetails] = useState([]);

  const itemBaseApiUrl ='https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=';

  async function getItemDetails() {
    setLoading(true);
    const apiData = await axios.get(itemBaseApiUrl + id.itemid);

    setItemDetails(apiData.data);

    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetails()
  }, []);
  

  return (
    <div id="wrapper">
      {
        !loading ? (
          <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemdetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemdetails.title} #{itemdetails.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemdetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemdetails.likes}
                    </div>
                  </div>
                  <p>
                    {itemdetails.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={"/author/" + itemdetails.ownerId}>
                            <img className="lazy" src={itemdetails.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={"/author/" + itemdetails.ownerId}>{itemdetails.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={"/author/" + itemdetails.creatorId}>
                            <img className="lazy" src={itemdetails.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={"/author/" + itemdetails.creatorId}>{itemdetails.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemdetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        ): (
          <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center skeleton-box" style={{height: "100%"}}>
                <img
                  src={nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  style={{visibility: "hidden"}}
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2 className="skeleton-box" ><span style={{visibility: "hidden"}}>Loading...</span></h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      ???
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      ???
                    </div>
                  </div>
                  <div className="skeleton-box" style={{minHeight: 78}}>
                  <p style={{visibility: "hidden"}}>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp skelton-box" style={{width: 50, height: 50, borderRadius: 100}}>
                          
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Loading...</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp skeleton-box" style={{width: 50, height: 50, borderRadius: 100}}>
                          
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Loading...</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        )
      }
    </div>
  );
};

export default ItemDetails;
