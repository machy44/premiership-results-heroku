import * as React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { selectRound } from '../actions/roundActions';
import { defineRounds } from '../selectors/roundDropdownSelectors';
import { ISelected, IStoreState } from '../types';
import './RoundDropdown.css';


interface IState {
  isDefaultValue: boolean,
  selectedState: any,
}

class RoundDropdown extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDefaultValue: true,// only for setup default value of Select component 
      selectedState: '' // need for rerender Select component cause I had a problem with updating select input
    }
  }

  public componentDidUpdate() {
    const { rounds } = this.props;
    const { isDefaultValue } = this.state;
    // I needed this part of code cause Select Component didnt't set defaultValue if selected is not part of RoundDropdown component state.
    // For some reason Select component didn't rerender if selected Value is only put in redux store. I don't know why.
    if (rounds && isDefaultValue) {
      // set default value last round only after first render
      this.handleChange(rounds[rounds.length - 1])
      this.setState({
        isDefaultValue: false,
        selectedState: rounds[rounds.length - 1],
      })
    }
  }

  public shouldComponentUpdate(nextProps: any, nextState: IState) {
    // if same round is selected don't rerender
    if (this.state.selectedState && nextState.selectedState.id === this.state.selectedState.id) {
      return false;
    }
    return true;
  }

  public handleChange = (selectedRound: ISelected) => {
    // I needed this part of code cause Select Component didnt't set defaultValue if selected is not part of RoundDropdown component state.
    // For some reason Select component didn't rerender if selected Value is only put in redux store. I don't know why.
    this.setState({ selectedState: selectedRound });
    this.props.selectRound(selectedRound);
  }
  public render() {
    const { rounds, children } = this.props;
    const { selectedState } = this.state
    return (
      <Row className="button-group-wrapper">
        <h4 className="select-round-title">{children}</h4>
        <Select
          className="select-round-field"
          isSearchable={true}
          value={selectedState}
          onChange={this.handleChange}
          options={rounds}
        />
      </Row>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  const { data, selected } = state;
  const rounds: ISelected[] = defineRounds(data);
  return { rounds, selected };
}

const mapDisptachToProps = (dispatch: any) => {
  return {
    selectRound: (selectedRound: ISelected) => { dispatch(selectRound(selectedRound)) }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(RoundDropdown);
