
export type Source = {
    name: string,
    url: string,
};

export type Jump = {
    source: string,
    position: string,
    name: string,
    height: string,
    date: string,
    location?: string,
    gender?: string,
    country?: string,
    imageURL?: string,
};
