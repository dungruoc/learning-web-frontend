export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"  

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (res.ok)
      return await res.json();
  } catch (err) {
    console.error(err.message);
    throw err;
  }

  return null;
}

export async function fetchCities(user) {
  const data = await fetchJson('http://localhost:5174/cities');
  console.log(data, user);
  return data.filter(c => c.user === user);
}

export async function fetchCityDetails(cityId) {
  return await fetchJson(`http://localhost:5174/cities/${cityId}`);
}

export async function fetchCityCode(lat, lng) {
  return await fetchJson(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
}

export async function postNewCity(newCity) {
  const res = await fetch(`http://localhost:5174/cities`, {
    method: "POST",
    body: JSON.stringify(newCity),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;
}

export async function deleteCity(id) {
  await fetch(`http://localhost:5174/cities/${id}`, {
    method: "DELETE"
  });
}