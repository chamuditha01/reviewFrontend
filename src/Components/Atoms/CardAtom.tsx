// CardAtom.tsx
import React from "react";
import { IconType } from "react-icons";

interface CardAtomProps {
  title: string;
  onClick: () => void;
  IconComponent: IconType;
  IconComponent1: IconType;
}

const CardAtom: React.FC<CardAtomProps> = ({ title, onClick, IconComponent, IconComponent1 }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <a href="#" className="h3" onClick={onClick}>
          {title} <IconComponent1 className="card_icon" />
        </a>
        <IconComponent className="card_icon" />
      </div>
    </div>
  );
};

export default CardAtom;
