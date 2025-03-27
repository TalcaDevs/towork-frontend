import React from "react";
import { CardSectionProps } from "../../interfaces/cards.interface";
import Cards from "../Cards";
import Title from "../Title";

const CardSection: React.FC<CardSectionProps> = ({ title, cards }) => {
  return (
    <section className="bg-[#f6f7f9] py-8">
      <div className="container mx-auto px-20">
        <Title title={title} />
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {cards.map((card) => (
              <Cards key={card.id} {...card} className="w-80 flex-shrink-0 p-6 rounded-xl bg-[#f6f7f9] border-10 border-white bg-opacity-10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
