import type { NextPage } from 'next'
import type { Shownote as ShownoteType, Episode as EpisodeType, Props } from '../types/index'
import Head from 'next/head'
import Script from 'next/script'
import { GetStaticProps } from 'next'
import Episode from '../components/Episode'
import Header from '../components/Header'
import Query from '../components/Query'
import { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { escape } from 'html-escaper'

const getEpisodes = async () => {
    const endpoint = `https://raw.githubusercontent.com/tamanishi/rebuild_feed_to_json_go/master/episodes.json`
    // const endpoint = `https://rebuild-shownotes-json.tamanishi.workers.dev/`
    const res = await fetch(endpoint)
    const json = await res.json()
    return json.episodes
}

export const getStaticProps: GetStaticProps = async () => {
    const episodes = await getEpisodes()
    const props: Props = {
        fullEpisodes: episodes,
    }
    return {
        props: props
    }
}

const Index: NextPage<Props> = (props: Props) => {
    const [filteredEpisodes, setFilteredEpisodes] = useState(props.fullEpisodes)
    const [query, setQuery] = useState<string>("")
    const intervalRef = useRef<ReturnType<typeof setTimeout>>(null!)

    useEffect(
        () => {
            intervalRef.current = setTimeout(() => {
                if (query) {
                    const filteredByShownote = props.fullEpisodes.map((episode: EpisodeType) => ({
                        ...episode,
                        shownotes: episode.shownotes
                            .filter((shownote: ShownoteType) => shownote.title.toLowerCase().includes(escape(query.toLowerCase())))
                    }))
                        .filter((episode: EpisodeType) => episode.shownotes.length > 0)

                    const filteredByTitle = props.fullEpisodes.map((episode: EpisodeType) => ({
                        ...episode,
                        shownotes: episode.shownotes
                            .filter((shownote: ShownoteType) => shownote.title.toLowerCase().includes(escape(query.toLowerCase())))
                    }))
                        .filter((episode: EpisodeType) => episode.shownotes.length == 0)
                        .filter((episode: EpisodeType) => (episode.title.toLowerCase().includes(escape(query.toLowerCase()))))

                    const filtered = [...filteredByShownote, ...filteredByTitle]
                        .sort((a, b) => {
                            return a.publicationDate > b.publicationDate ? -1 : 1
                        })

                    setFilteredEpisodes(filtered)
                } else {
                    setFilteredEpisodes(props.fullEpisodes)
                }
            },
                300)
            return () => clearTimeout(intervalRef.current)
        },
        [query, props.fullEpisodes]
    )

    return (
        <>
            <Head>
                <title>Rebuild Shownotes Filter</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Header />
                <Query setQuery={setQuery} />
                {filteredEpisodes.map((episode: EpisodeType, i: number) => <Episode episode={episode} query={query} key={i} />)}
            </Container>
            { /* Cloudflare Web Analytics */}
            <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "34dc3c5f1435491fb76024f7e2f2e5b4"}' />
            { /* End Cloudflare Web Analytics */}
        </>
    )
}

export default Index
