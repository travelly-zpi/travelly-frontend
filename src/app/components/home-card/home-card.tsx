import "./home-card.scss";

import { Typography } from "antd";
const { Text } = Typography;

interface HomeCardProps {
  imgSrc: string;
  title: string;
  subTitle: string;
}

const HomeCard = ({ imgSrc, title, subTitle }: HomeCardProps) => {
  return (
    <div className="home-card">
      <img src={imgSrc} alt={title} />
      <div className="home-card-text">
        <Text>{title}</Text>
        <Text type="secondary">{subTitle}</Text>
      </div>
    </div>
  );
};

export default HomeCard;
