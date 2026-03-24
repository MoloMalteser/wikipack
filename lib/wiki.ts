export async function fetchRandomWikiCard() {
  // 1. Zufälligen Artikel holen
  const res = await fetch("https://de.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*");
  const data = await res.json();
  const page = data.query.random[0];

  // 2. Details für diesen Artikel holen (Textlänge für Stats)
  const detailRes = await fetch(`https://de.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&titles=${encodeURIComponent(page.title)}&format=json&origin=*&pithumbsize=400`);
  const detailData = await detailRes.json();
  const pageDetails = Object.values(detailData.query.pages)[0] as any;

  return {
    wiki_id: page.id.toString(),
    title: page.title,
    image_url: pageDetails.thumbnail?.source || null,
    power: Math.min(100, Math.floor(pageDetails.extract.length / 50)), // Power nach Textlänge
    defense: Math.floor(Math.random() * 100),
  };
}
