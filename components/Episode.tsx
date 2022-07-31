import type { Shownote as ShownoteType, Episode as EpisodeType } from '../types/index'
import Shownote from './Shownote'
import { useState, useEffect } from 'react'
import Moment from 'react-moment'
import Highlighter from 'react-highlight-words'
import { unescape } from 'html-escaper';
import escapeStringRegexp from 'escape-string-regexp'

const Episode = (props: { episode: EpisodeType, query: string }) => {
    // see https://github.com/vercel/next.js/discussions/38263
    // see https://zenn.dev/noonworks/scraps/2114c8bab9a66e
    const [isClient, setIsClient] = useState<boolean>(false)
    useEffect(() => setIsClient(true), [])

    return (
        <div className='episode'>
            <span className='epititle'><a href={props.episode.mediaUrl} target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={[escapeStringRegexp(props.query)]} textToHighlight={unescape(props.episode.title).replace(/&nbsp;/g, ' ')} /></a></span> <span className='pubdate'>({isClient ? <Moment format='YYYY/MM/DD'>{props.episode.publicationDate}</Moment> : '1970/01/01'})</span>
            <ul>{props.episode.shownotes.map((shownote: ShownoteType, i: number) => <Shownote shownote={shownote} query={props.query} key={i} />)}</ul>
        </div>
    );
}

export default Episode
