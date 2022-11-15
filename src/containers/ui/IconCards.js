import React from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IconCard from "../../components/cards/IconCard";

const IconCards = ({data}) => {
  return (
    <Row>
      <Colxx xxs="12">
        <Row className="icon-cards-row mb-2">
          {data.map((item, index) => {
            return (
              <Colxx xxs="6" sm="4" md="3" lg="2" key={`icon_card_${index}`}>
                <IconCard {...item} className="mb-4" />
              </Colxx>
            );
          })}
        </Row>
      </Colxx>
    </Row>
  );
};

export default IconCards;
