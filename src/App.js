import './App.css';
import { Menu,Select,Card ,CardContent,FormControl,MenuItem} from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import sortedData from './util';
import LineGraph from './LineGraph'

function App() {
  
  const [countries,setCountries] =  useState([])
  const [country,setCountry] = useState("worldwide")
  const [countryInfo,setCountryInfo]=useState({})
  const [tableData,setTableData] = useState([])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data)
      console.log("dictionary here",data)
    })
  },[])

  useEffect(()=>{
   const getCountriesData = async () =>{
     await fetch("https://disease.sh/v3/covid-19/countries")
     .then((response)=>response.json())
     .then((data)=>{
        const countries = data.map((country)=>(
         { 
           name:country.country,
           value:country.countryInfo.iso2,
          }
        ));
        const sortData = sortedData(data);
        setTableData(sortData);
        // console.log(data)
        setCountries(countries);
     });
   };
   getCountriesData();
  },[]);

  const onCountryChange=async(event)=>{
    const countryCode = event.target.value
    console.log("this is the event",event)
    setCountry(countryCode)
    
    const url = countryCode==="worldwide" 
                ? "https://disease.sh/v3/covid-19/all"
                :`https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response)=> response.json())
      .then((data)=>{
        setCountry(countryCode);

        setCountryInfo(data);
        console.log("dictionary here " ,data);
      })
      
  };

  console.log(countryInfo)

  return (
    <div className="app">
        <div className="app__left">
          <div className="app_header">
          <h1>covid 19 tracker</h1>
          <FormControl className="app_dropdown"> 
          
            <Select onChange={onCountryChange} variant="outlined" value={country}>
            <MenuItem  value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country)=>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            {/* rather mentuitem i want to loop through all all the countries and then show the dropdown */}

            {/* <MenuItem value="worldwide">WOrldwide</MenuItem>
            <MenuItem value="worldwide">WOrldwide2</MenuItem>
            <MenuItem value="worldwide">WOrldwide3</MenuItem>
            <MenuItem value="worldwide">WOrldwide4</MenuItem> */}

            </Select>
          </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox title="Coronavirus" total={countryInfo.cases} cases={countryInfo.todayCases} />
            <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
            <InfoBox title="Death" total={countryInfo.deaths} cases={countryInfo.todayDeaths }/>
          </div>
          <Map/>
        </div>
        <Card className="app__right">
          {/* {table } */}
          <CardContent>
            <h3>Live Cases by country</h3>
            <Table countries={tableData} />
          </CardContent>
          
          <h2>Worldwide new casesType</h2>
          {/* graph */}
          <LineGraph/>
        </Card>
    </div>
  );
}

export default App;
