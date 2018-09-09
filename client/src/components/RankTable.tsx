import * as React from 'react';
import { Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  arrangeDataToSelectedRound,
  defineClubsPosition,
  defineClubStatProps,
  defineClubsWithAttrs,
} from '../selectors/rankTableSelectors';
import { ISelected, IStoreState } from '../types';
import './RankTable.css'

export interface IStatAttributes {
  'position': number,
  // tslint:disable-next-line:object-literal-sort-keys
  'club name': string,
  'played': number,
  'w': number,
  'd': number,
  'l': number,
  'gf': number,
  'ga': number,
  'gd': number,
  'points': number,
  'form': string,
}

// blueprint of stats which will be collected for every club for calucations
const statAttributes = {
  'position': 0,
  // tslint:disable-next-line:object-literal-sort-keys
  'club name': '',
  'played': 0,
  'w': 0,
  'd': 0,
  'l': 0,
  'gf': 0,
  'ga': 0,
  'gd': 0,
  'points': 0,
  'form': '',
};

interface ITableHeaderProps {
  tableHeaders: IStatAttributes;
}

const TableHeader: React.SFC<ITableHeaderProps> = ({ tableHeaders }) => {
  return (
    <thead>
      <tr>
        {Object.keys(tableHeaders).map((element, index) => <th key={index} className="text-uppercase">{element}</th>)}
      </tr>
    </thead>
  )
}

interface ITableBodyProps {
  tableData: IStatAttributes[];
}

const TableBody: React.SFC<ITableBodyProps> = ({ tableData }) => {
  return (
    <tbody>
      {tableData.map((element: IStatAttributes, index: number) => {
        const dataRow: any = Object.keys(element).map((key) => {
          if (key === 'position') {
            return <td key={key}>{index + 1}</td>
          }
          return <td key={key}>{element[key]}</td>;
        })
        return <tr key={index}>{dataRow}</tr>
      })
      }
    </tbody>
  )
}

interface IRankTableProps {
  children: string,
  clubs: IStatAttributes[],
  selected: ISelected,
}

class RankTable extends React.Component<any, IRankTableProps> {

  // same as in the RoundDropdown component -> don-t rerender if the same round is selected
  public shouldComponentUpdate(nextProps: IRankTableProps) {
    if (this.props.selected && this.props.selected.id === nextProps.selected.id) {
      return false;
    }
    return true;
  }

  public render() {
    const { clubs, children } = this.props;
    return (
      <Row>
        <h4 className="table-title">{children}</h4>
        <Table responsive={true} hover={true}>
          <TableHeader
            tableHeaders={statAttributes}
          />
          {clubs && clubs.length
            ? <TableBody
              tableData={clubs} />
            : <TableBody
              tableData={[]}
            />
          }
        </Table>
      </Row>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  const { data, selected } = state;
  // on first render there is no data
  if (!data.length) { return {} };
  const dataToSelectedRound = arrangeDataToSelectedRound(data, selected.id);
  const clubs: IStatAttributes[] = defineClubsWithAttrs(data, statAttributes);
  defineClubStatProps(dataToSelectedRound, clubs);
  defineClubsPosition(clubs);
  return {
    clubs,
    selected,
  }
}

export default connect(mapStateToProps, null)(RankTable);
