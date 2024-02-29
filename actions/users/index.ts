"use server";

export default async function getApps() {
  const data: AppleApi = await fetch(
    "https://rss.applemarketingtools.com/api/v2/us/apps/top-free/10/apps.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((d) => d.json());

  return data;
}

export interface AppleApi {
  feed: Feed;
}

export interface Feed {
  title: string;
  id: string;
  author: Author;
  copyright: string;
  country: string;
  icon: string;
  updated: string;
  results: App[];
}

export interface Author {
  name: string;
  url: string;
}

export interface App {
  artistName: string;
  id: string;
  name: string;
  releaseDate: string;
  kind: string;
  artworkUrl100: string;
  genres: any[];
  url: string;
}
