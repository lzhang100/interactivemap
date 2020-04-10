import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'black',
    background: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
}));

export default function Searchbar2(props) {
  const handleChange = (event, values) => {
    var value = event.target.innerHTML;
    if (event.target.innerText === undefined) {
      value = '';
      event.target.value = '';
    }
    if (value === '') {
      const inputAcro = event.target.value.toLowerCase();
      if (props.buildings.filter((b) => b.acro.toLowerCase() === inputAcro).length !== 0) {
        const building = props.buildings.filter((b) => b.acro.toLowerCase() === inputAcro)[0];
        event.target.innerHTML = building.name;
        props.onSearchClicked(building.center);
        props.clickPolygon(building.name);
        return;
      }
      return;
    }

    const building = props.buildings.filter((b) => b.name === value)[0];
    event.target.innerHTML = building.name;
    props.onSearchClicked(building.center);
    props.clickPolygon(building.name);
  };

  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        color='primary'
        classes={classes}
        options={props.buildings.map((b) => b.name).sort()}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label='Search...' margin='normal' variant='outlined' />
        )}
      />
    </div>
  );
}

// export class Searchbar2 extends Component {
//   constructor(props) {
//     super(props);
//     this.buildings = buildingsJSON;
//     this.state = {
//       suggestions: [],
//       text: ''
//     };
//   }

//   handleChange = (event, values) => {
//     const value = event.target.innerHTML;
//     if (value === '') {
//       const inputAcro = event.target.value.toLowerCase();
//       if (
//         this.buildings.filter(b => b.acro.toLowerCase() === inputAcro)
//           .length !== 0
//       ) {
//         const building = this.buildings.filter(
//           b => b.acro.toLowerCase() === inputAcro
//         )[0];
//         event.target.innerHTML = building.desc;
//         this.props.onSearchClicked(building.center);
//         this.props.clickPolygon(building.desc);
//         return;
//       }
//       return;
//     }

//     const building = this.buildings.filter(b => b.desc === value)[0];
//     this.props.onSearchClicked(building.center);
//     this.props.clickPolygon(building.desc);
//   };

//   render() {
//     const { text } = this.state;
//     const classes = useStyles();
//     return (
//       <div style={{ width: '100%' }}>
//         <Autocomplete
//           id='free-solo-demo'
//           freeSolo
//           classes={classes}
//           options={this.buildings.map(b => b.desc)}
//           onChange={this.handleChange}
//           renderInput={params => (
//             <TextField
//               {...params}
//               label='Search...'
//               margin='normal'
//               variant='outlined'
//             />
//           )}
//         />
//       </div>
//     );
//   }
// }

// export default Searchbar2;
