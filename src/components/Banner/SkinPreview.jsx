import React, { useState, useEffect } from "react";
import "./SkinPreview.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useSkins from "../../hooks/useBotSkins";
import { calculateDiscount } from "../../utils/utils";


const SkinPreview = ({ title, sortFunc, itemsToShow: initialItemsToShow }) => {
  const skins = useSkins(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow || 5); // Set initial items to show based on prop or default value

  // Use passed sort function
  const sortedSkins = [...skins].sort(sortFunc);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 1300) {
        setItemsToShow(3);
      } else if (width <= 1669) {
        setItemsToShow(4);
      } else {
        setItemsToShow(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSkinClick = (skin) => {
    window.location.href = `/buy`;
  };


  const handleNavigationClick = (direction) => {
    if (direction === "previous" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      direction === "next" &&
      currentIndex < sortedSkins.length - itemsToShow
    ) {
      setCurrentIndex(currentIndex + 1);
    } else if (
      direction === "next" &&
      currentIndex >= sortedSkins.length - itemsToShow
    ) {
      toast.info("There are no more skins to preview", {
        theme: "colored",
      });
      return;
    }
  };

  return (
    <div className="skin-preview-container">
      <h2 className="skin-preview-title">{title}</h2>
      <div className="skins-grid">
        <button
          onClick={() => handleNavigationClick("previous")}
          className="skin-navigation-button"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="skin-navigation-icon"
          />
        </button>
        {sortedSkins
          .slice(currentIndex, currentIndex + itemsToShow)
          .map((skin) => {
            const discountPercentage = calculateDiscount(
              skin.listed_price,
              skin.price,
            );
            return (
              <div key={skin.assetid}>
                <div className="skin-item">
                  <div className="skin-wear ">
                    {skin.item_wear} / {parseFloat(skin.paintwear).toFixed(10)}
                  </div>
                  {discountPercentage > 0 && (
                    <div
                      className={`skin-discount discountColor`}
                    >
                      {discountPercentage}%
                    </div>
                  )}
                  <img
                    src={`https://steamcommunity-a.akamaihd.net/economy/image/${skin.image}`}
                    alt={skin.market_hash_name}
                    className="skin-icon"
                    loading="lazy"
                  />
                  <div className="skin-info">
                    <div className="skin-name primaryTextColor">
                      {skin.market_hash_name
                        .split(" ")
                        .map((word, index) =>
                          word === "StatTrak™" ? (
                            <span className="Stattrak-gradientText">
                              StatTrak™{" "}
                            </span>
                          ) : (
                            word + " "
                          ),
                        )}
                    </div>

                    <div className="price-container">
                    {skin.price !== null && (
                        <div className="skin-price">
                          <FontAwesomeIcon icon={faSteam}  className="mr-1"/>
                          {skin.price}$
                        </div>
                      )}
                      <div className="skin-listedprice gradientText">
                        {skin.listed_price}$
                      </div>
                    </div>
                    <button
                      className="buy-button"
                      onClick={() => handleSkinClick(skin)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          onClick={() => handleNavigationClick("next")}
          className="skin-navigation-button"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="skin-navigation-icon"
          />
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SkinPreview;
