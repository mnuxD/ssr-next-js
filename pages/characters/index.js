import Link from "next/link";
import Layout from "./layout";
const CharatersPage = ({ characters }) => {
  console.log("EN componente...", characters);
  return (
    <Layout>
      {characters?.map((item, i) => (
        <div key={i}>
          <Link
            href={`/characters/details/id`}
            as={`/characters/details/${item.id}`}
          >
            <a>Character: {item.name}</a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

const getAllCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonData = await response.json();
  return jsonData.results;
};

export const getStaticProps = async () => {
  const data = await getAllCharacters();
  return {
    props: {
      characters: data,
    }, // will be passed to the page component as props
  };
};

export default CharatersPage;
