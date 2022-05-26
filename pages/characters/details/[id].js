import { useRouter } from "next/router";
import Image from "next/image";

const Details = ({ character }) => {
  const router = useRouter();
  console.log("ROUTER", router);
  if (router.isFallback) return <div>loading...</div>;
  else
    return (
      <div>
        DETAILS BY ID: {character?.name}
        <Image
          src={character?.image}
          alt={character?.name}
          width={500}
          height={500}
        />
      </div>
    );
};

const getAllCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonData = await response.json();
  return jsonData.results.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });
};

const getCharacterById = async (id) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export const getStaticPaths = async () => {
  const data = await getAllCharacters();

  return {
    paths: data,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  console.log("params", params);
  const { id } = params;
  console.log(id);
  const data = await getCharacterById(id);
  return {
    props: {
      character: data,
    }, // will be passed to the page component as props
  };
};

export default Details;
