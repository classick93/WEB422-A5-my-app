import React from "react";
import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  } else {
    if (!data) {
      return null;
    } else {
      return (
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
                  <strong>Date: </strong>
                  {data.objectDate}
                </p>
              ) : (
                <p>N/A</p>
              )}
              {data.classification ? (
                <p>
                  <strong>Classification:</strong>
                  {data.classification}
                </p>
              ) : (
                <p>N/A</p>
              )}
              {data.medium ? (
                <p>
                  <strong>Medium: </strong>
                  {data.medium}
                </p>
              ) : (
                <p>N/A</p>
              )}
              <br />
              <br />
              {data.artistDisplayName ? (
                <span>
                  <p>
                    <strong>Artist: </strong>
                    {data.artistDisplayName}
                  </p>
                  <p>
                    <a
                      href={data.artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>
                  </p>
                </span>
              ) : (
                <p>N/A</p>
              )}
              {data.creditLine ? (
                <p>
                  <strong>Credit Line: </strong>
                  {data.creditLine}
                </p>
              ) : (
                <p>N/A</p>
              )}
              {data.dimensions ? (
                <p>
                  <strong>Dimensions: </strong>
                  {data.dimensions}
                </p>
              ) : (
                <p>N/A</p>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }
}
