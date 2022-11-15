import React from "react";
import IconCard from "../../components/cards/IconCard";
import GlideComponent from "../../components/carousel/GlideComponent";

const IconCardsCarousel = ({className="icon-cards-row", data}) => {
  return (
    <div className={className}>
      <GlideComponent settings={
        {
          gap: 5,
          perView: 5,
          // type: "carousel",
          breakpoints: {
            200: { perView: 1 },
            400: { perView: 2 },
            600: { perView: 3 },
            800: { perView: 4 },
            1000: { perView: 5 },
          },
          hideNav: data.length <= 5,
          rewind: false,
          bound: true
        }
      }>
      {data.map((item, index) => {
        return (
          <div key={`icon_card_${index}`}>
            <IconCard {...item} className="mb-4"/>
          </div>
        );
      })}
      </GlideComponent>


    </div>
  );
};
export default IconCardsCarousel;
