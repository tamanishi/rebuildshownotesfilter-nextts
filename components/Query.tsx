import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

interface Props {
    setQuery: (query: string) => void
}

const Query = (props: Props) => {
    const [, render] = useState<boolean>(true)

    return (
        <Row><Col xs="3"><Form.Control type='text' placeholder='query' onChange={e => { render(true); props.setQuery(e.target.value); }} /></Col></Row>
    );
}

export default Query
