import { useEffect, useState } from "react";

const Test = ({ items }) => {
  return (
    <div>
      {items.map((item, i) => (
        <h1 key={i}>{item.name}</h1>
      ))}
    </div>
  );
};

const getAllCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonData = await response.json();
  return jsonData.results;
};

export const getServerSideProps = async () => {
  const data = await getAllCharacters();
  return {
    props: {
      items: data,
    },
  };
};

export default Test;
