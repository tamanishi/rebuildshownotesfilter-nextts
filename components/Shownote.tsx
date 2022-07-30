import type { Shownote as ShownoteType } from '../types/index'
import Highlighter from 'react-highlight-words'
import { unescape } from 'html-escaper';
import escapeStringRegexp from 'escape-string-regexp'

const Shownote = (props: { shownote: ShownoteType, query: string }) => {
    return (
        <li className='shownote'><a href={props.shownote.url} target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={[escapeStringRegexp(props.query)]} textToHighlight={unescape(props.shownote.title).replace(/&nbsp;/g, ' ')} /></a></li>
    );
}

export default Shownote
