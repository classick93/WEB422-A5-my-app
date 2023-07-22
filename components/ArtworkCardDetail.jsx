import React, { useState } from "react";
import useSWR from "swr";
import { Button, Card } from "react-bootstrap";
import Error from "next/error";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(
    favouritesList.includes(objectID) ? true : false
  );
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList((favouritesList) =>
        favouritesList.filter((fav) => fav != objectID)
      );
      setShowAdded(false);
    } else {
      setFavouritesList((favouritesList) => [...favouritesList, objectID]);
      setShowAdded(true);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  } else {
    if (!data) {
      return null;
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "40rem" }}>
            {data.primaryImageSmall && (
              <Card.Img variant="top" src={data.primaryImage} />
            )}
            <Card.Body>
              {data.title ? (
                <Card.Title>{data.title}</Card.Title>
              ) : (
                <Card.Title>N/A</Card.Title>
              )}
              <Card.Text>
                {data.objectDate ? (
                  <p>
                    <b>Date: </b>
                    {data.objectDate}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                {data.classification ? (
                  <p>
                    <b>Classification: </b>
                    {data.classification}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                {data.medium ? (
                  <p>
                    <b>Medium: </b>
                    {data.medium}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                {data.artistDisplayName ? (
                  <span>
                    <p>
                      <b>Artist: </b>
                      {data.artistDisplayName}{" "}
                      <a
                        href={data.artistWikidata_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        (wiki)
                      </a>
                    </p>
                  </span>
                ) : (
                  <p>N/A</p>
                )}
                {data.creditLine ? (
                  <p>
                    <b>Credit Line: </b>
                    {data.creditLine}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                {data.dimensions ? (
                  <p>
                    <b>Dimensions: </b>
                    {data.dimensions}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                {showAdded ? (
                  <Button onClick={favouritesClicked} variant="primary">
                    + Favourite (added)
                  </Button>
                ) : (
                  <Button onClick={favouritesClicked} variant="outline-primary">
                    + Favourite
                  </Button>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
}
