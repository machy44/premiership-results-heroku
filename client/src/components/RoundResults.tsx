import * as React from 'react';
import { ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { giveRoundsTillSelected } from '../selectors/roundResultsSelectors';
import { IStoreState } from '../types';
import './RoundResults.css'

const resultDisplay = (match: object) => {
  const teams: any = [];
  const result: any = [];
  for (const key in match) {
    if (match.hasOwnProperty(key)) {
      teams.push(<span>{key}</span>);
      result.push(<span>{match[key]}</span>);
    }
  }
  return (<div>
    <span style={{ display: "inline-block", width: '40%', textAlign: "right", marginLeft: 10 }}>{teams[0]}</span>
    <span style={{ display: "inline-block", width: '10%' }}>{result[0]}<span style={{ padding: '0 10%' }}>&#45;</span>{result[1]}</span>
    <span style={{ display: "inline-block", width: '40%', textAlign: "left", marginRight: 10 }}>{teams[1]}</span>
  </div>)
}

interface IMatches {
  matches: object[],
}

interface IProps {
  roundResults: IMatches,
  children: string
}

const RoundResults: React.SFC<IProps> = ({ roundResults, children }) => {
  return (
    <Row >
      <h4 className="result-list-title">{children}</h4>
      <ListGroup className="list-group-wrapper" style={{ textAlign: 'center' }}>
        {roundResults
          ? roundResults.matches.map((element: object, index: number) => {
            return <ListGroupItem key={index}>{resultDisplay(element)}</ListGroupItem>
          })
          : null
        }
      </ListGroup>
    </Row>
  )
};

const mapStateToProps = (state: IStoreState) => {
  const { data, selected } = state;
  const roundResults: any = giveRoundsTillSelected(data, selected);
  return { roundResults };
}

export default connect(mapStateToProps, null)(RoundResults);