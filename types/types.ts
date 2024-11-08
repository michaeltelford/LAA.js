
export type Source = {
    name: string,
    url: string,
};

export type Jump = {
    source: string,
    name: string,
    height: number,
    date?: string,
    location?: string,
    gender?: string,
    country?: string,
    imageURL?: string,
};

export type SurfrJump = {
    value: number, // jump height
    user: {
        countryIOC:	string, // country
        name:	string, // rider name
    },
};

export type WooJump = {
    name: string, // rider first name
    lastname: string, // rider last name
    score: number, // jump height
    _pictures: {
        url: string,
        type: string, // "user" is what we want
    }[],
};
