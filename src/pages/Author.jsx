import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";


const Author = () => {

  const id = useParams();
  const [loading, setLoading] = useState();
  const [authorInfo, setAuthorInfo] = useState([]);
  const authorBaseApiUrl = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author='

  const [nftCollections, setNftCollections] = useState([]);
  const [pImage, setPImage] = useState('')

  async function getAuthorInfo() {
    setLoading(true);

    if(id) {
      const apiData = await axios.get(authorBaseApiUrl +id.authorid);
      setAuthorInfo(apiData.data)

      setNftCollections(apiData.data.nftCollection)
      setPImage(apiData.data.authorImage);
      setLoading(false)
    }


  }

  function follow() {
    const followers = document.getElementById('follower-count');
    const btn = document.getElementById('follow-btn');

    if(btn.classList.contains('follow')) {
      followers.innerHTML = parseInt(followers.innerHTML) + 1;

      btn.classList.remove("follow");
      btn.innerHTML = "Unfollow"
    } else {
      followers.innerHTML = parseInt(followers.innerHTML) - 1;

      btn.classList.add("follow");
      btn.innerHTML = "Follow"
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorInfo(authorInfo.nftCollection);
  }, [])


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {
                !loading ? (<div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorInfo.authorImage} alt="" />
  
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorInfo.authorName}
                            <span className="profile_username">@{authorInfo.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorInfo.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower"><span id="follower-count">{authorInfo.followers}</span> followers</div>
                        <Link to="#" onClick={() =>follow()} className="btn-main follow" id="follow-btn">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>): (
                  <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar skeleton-box" style={{width: 150, height:150, borderRadius:100}}>
                        
  
                        <i className="fa fa-check"></i>
                        <div className="profile_name skeleton-box" style={{width:200, height: 150}}>
                          <h4>
                            
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">??? followers</div>
                        <Link to="#" className="btn-main follow" id="follow-btn">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                )
              }

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftcollection={nftCollections} authImage={pImage} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
