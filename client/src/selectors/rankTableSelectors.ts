import { IStatAttributes } from '../components/RankTable';
import { IData } from '../types';
/* tslint:disable:no-string-literal */

export const defineClubsWithAttrs = (data: IData[], statAttributes: IStatAttributes) => {
  const clubs: IStatAttributes[] = []
  data[0].matches.forEach((element: IData) => {
    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        // all attributes where stats gonna be kept
        clubs.push({ ...statAttributes, 'club name': key });
      }
    }
  });
  return clubs;
}

export const arrangeDataToSelectedRound = (data: IData[], id: number) => {
  return data.filter((element: IData) => element.round <= id);
}

export const defineClubsPosition = (clubs: IStatAttributes[]) => {
  return clubs.sort((a: IStatAttributes, b: IStatAttributes) => {
    switch (true) {
      case (a['points'] > b['points']):
        return -1;
      case (b['points'] > a['points']):
        return 1;
      case (a['gd'] > b['gd']):
        return -1;
      case (b['gd'] > a['gd']):
        return 1;
      case (a['gf'] > b['gf']):
        return -1;
      case (b['gf'] > a['gf']):
        return 1;
      default:
        return 0;
    }
  })
}

const defineStats = (firstTeam: any, secondTeam: any, clubs: IStatAttributes[]) => {

  const extractClubs: any = (team: any) => {
    return clubs.filter((object: any) => {
      return object['club name'] === team;
    })[0]; // filter will return array although there is only one element and I dont want an array
  }
  const firstTeamValues = extractClubs(firstTeam[0]);
  const secondTeamValues = extractClubs(secondTeam[0]);

  // neutral stats
  firstTeamValues['played'] += 1;
  firstTeamValues['gf'] += firstTeam[1];
  firstTeamValues['ga'] += secondTeam[1];
  firstTeamValues['gd'] = firstTeamValues['gf'] - firstTeamValues['ga'];

  secondTeamValues['played'] += 1;
  secondTeamValues['gf'] += secondTeam[1];
  secondTeamValues['ga'] += firstTeam[1];
  secondTeamValues['gd'] = secondTeamValues['gf'] - secondTeamValues['ga'];

  const removefirstCharacter = (teamForm: any) => {
    if (teamForm.length === 5) {
      return teamForm.substr(1); // remove first character if form has more than five values
    }
    return teamForm;
  }

  firstTeamValues['form'] = removefirstCharacter(firstTeamValues['form']);
  secondTeamValues['form'] = removefirstCharacter(secondTeamValues['form']);

  if (firstTeam[1] > secondTeam[1]) {
    firstTeamValues['w'] += 1;
    secondTeamValues['l'] += 1;
    // round form
    firstTeamValues['form'] += 'w';
    secondTeamValues['form'] += 'l';
    // points
    firstTeamValues['points'] += 3;
  } else if (secondTeam[1] > firstTeam[1]) {
    secondTeamValues['w'] += 1;
    firstTeamValues['l'] += 1;
    // round form
    secondTeamValues['form'] += 'w';
    firstTeamValues['form'] += 'l';
    // points
    secondTeamValues['points'] += 3;
  } else {
    secondTeamValues['d'] += 1;
    firstTeamValues['d'] += 1;
    // round form
    secondTeamValues['form'] += 'd';
    firstTeamValues['form'] += 'd';
    // points
    firstTeamValues['points'] += 1;
    secondTeamValues['points'] += 1;
  }
}

export const defineClubStatProps = (data: IData[], clubs: IStatAttributes[]) => {
  data.map((roundObject: IData) => {
    roundObject.matches.map((element: object) => {
      // this is an arrays in which will be stored name of the club and number of goals used for comparison in defineStats()
      const firstTeam: any = [];
      const secondTeam: any = [];
      let count = 0;
      Object.keys(element).map(key => {
        if (count === 0) {
          firstTeam.push(key, element[key]);
          count += 1;
        } else {
          secondTeam.push(key, element[key]);
        }
      })
      defineStats(firstTeam, secondTeam, clubs);
    })
  })
}