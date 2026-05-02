export default {
  async load() {
    const latestRelease = await getLatestRelease();
    return {
      download: latestRelease.download,
      version: latestRelease.version,
      created: latestRelease.created,
      code: latestRelease.code,
    };
  },
};

async function getLatestRelease() {
  const res = await fetch(
    "https://api.github.com/repos/royalfig/share-button/releases/latest"
  );
  const json = await res.json();
  const asset = json.assets.find((a: { name: string }) => a.name === "share-button.umd.js");
  if (!asset) throw new Error(`share-button.umd.js not found in release assets for ${json.name}`);
  const { browser_download_url, url } = asset;

  const res2 = await fetch(url, {
    headers: { accept: "application/octet-stream", "user-agent": "royalfig" },
  });
  const b = await res2.blob();
  const code = await b.text();

  return {
    download: browser_download_url,
    version: json.name,
    created: json.created_at,
    code,
  };
}


