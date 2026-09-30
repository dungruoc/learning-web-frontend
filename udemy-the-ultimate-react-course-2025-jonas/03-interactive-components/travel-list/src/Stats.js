export default function Stats({ items }) {
  const nItems = items.length;
  const nPacked = items.filter(it => it.packed).length;
  const packedPct = (100 * nPacked / nItems);

  return (
    <em className="stats">
      {nItems > 0 && nPacked === nItems ? "You got all packed." : `Your have already ${nItems} items on your list, and you already packed ${nPacked} (${packedPct.toFixed(2)}%)`}
    </em>
  );
}
