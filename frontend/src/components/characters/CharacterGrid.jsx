import CharacterCard from './CharacterCard.jsx'

export default function CharacterGrid({ characters }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <CharacterCard key={character.slug} character={character} />
      ))}
    </ul>
  )
}
