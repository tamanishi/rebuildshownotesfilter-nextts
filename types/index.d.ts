export type Shownote = {
    title: string
    url: string
}

export type Episode = {
    title: string
    mediaUrl: string
    publicationDate: string
    shownotes: Shownote[]
}

export type Props = {
    fullEpisodes: EpisodeType[]
}
