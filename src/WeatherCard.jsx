import Card from "react-bootstrap/Card";
import "./WeatherCard.css";
import ListGroup from "react-bootstrap/ListGroup";

function WeatherCard({
  generalInfo,
  temperature,
  getImage,
  feelsLike,
  windSpeed,
}) {
  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-2">
        <Card.Header>
          {generalInfo}
          {getImage && <img src={getImage} />}
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>{temperature}</ListGroup.Item>
            <ListGroup.Item>{feelsLike}</ListGroup.Item>
            <ListGroup.Item>{windSpeed}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default WeatherCard;
