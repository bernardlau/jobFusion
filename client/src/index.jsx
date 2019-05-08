import React from 'react';
import JobCards from './components/JobCards.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        view: 'jobs',
        jobsList: [
          {
            "title": "Full Stack .NET Developer",
            "subTitle": "CyberCoders37 reviews-Sacramento, CA 95811",
            "metadataHeader": "$80,000 - $110,000 a year",
            "description": "Full Stack .NET Developer\nWe have 30+ years of experience and expertise in retail, brand building, driving sales and increasing profitability. A deep understanding of the entire supply chain; manufacturing, distribution, influencers and showroom, tra",
            "href": "https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0CpFJQzrgRR8WqXWK1qKKEqALWJw739KlKqr2H-MSI4epZMf2rqWy1NftZuaZ6NfN0QKEX51Apj0Re9vWgXhToRfK0-ke40H0-XdPP5bEPwiaqu5_U4Rzf5NOv9aZjqw2zq39zDtpfDokdxhyYdeKR2wFyDYhNCxp-U-wxSfMYCJRv5y7SlFLVsfPb3G3R456g721ZxmXzAYbEmvapdXfRm1QTjiYobfuMID3qTP8qo1GpGqkXWEwVSLJ44SWWruhpgnTsOyZvSfjVwIC4HsAVcTCwW3ZBO4Ax2XecK6J7Sp9Y-5WswCwvL8IJAHoovprMGjizB03v_smq9hJORChuwkrVZFxh4gvAS7gZ3XP7I-pUtGgIzTOtgneYBqhuEviEboS_EBCrXmJyeJ94hC7Ddn7eznJNTXy7hCv8GTJHf9NYewRqNpHxtvv650gfrVu7wM3vrEkLRLKl3aN-E_Ae-KRrNmgR4tXBCWH1uE8aRvI5FwMRdHlXCEIvy7i-e_578aPxmcapOR771kOhAaRb4L2AJO3Fc4opYxBK_7Oi0veA1gk1fdtfm4ypf6SQ24RQGAtAnJ0_YRMWDLKsYsiJ5xkx3iWUYbWj5fqQ7PjJK9YN9IBjU8Il9-VdrV1KcfKYUdZZ1khzpG7KicaWJtxaQEHikLD4UVU8l4Sf9-upJiWYxed-Z11Vdc1kWvKeX6kQhOpkYYvUfnKOgrweib3kIKb1xCZpyo0T7FAk9_tSHsob7Xex9WE4Z4zPZNyzpDG99HT9q48SK6nB-12RcfjYPC08W6jo6uS0v0kUtoSsKh2w9XAQ3MDQRoaOGXMx_gtqmVxDXxQimDI1qFMhoGBY0rck5PH9XMQ8OR3lAQiJnm3Rt36vY15ko5VhDs8TvbV2RNLbkVIIvsQ==&vjs=3&p=0&fvj=0",
            "id": "sja0"
          },
          {
            "title": "Remote Position - Full Stack Developer",
            "subTitle": "Revival Point-United States",
            "metadataHeader": "$50,000 - $65,000 a year",
            "description": "Hey! Fast growing supplement company is looking for a full-time, full stack developer with 4 - 6 years experience to help with API integrations, sales funnel creation and front-end work for e-commerce pages and wordpress sites.BENEFITS OF THIS POSITI",
            "href": "https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0BF2nME8HEAYutTNJ2ixZHGeU5MbM7d103zVLoVaWYLp-lEb71z0AzRgs76KtpA-_qahWniFDqyz3OPiXYuVVejLp1DE3YYxWVZzf1MQEG5Qb0lvLvrVHtEDz-i54-OFNPmjoqfTImBdJGmi_j52i8iDZFxlE-ztz6DBfG7lNyXKsH1ZvzZvmNVDbe3U4RhRqEtyQHhL9F2xUsn9JvRgNs-AlNGq3HaTan46kkFK5aGzkbwdMKDxFMaZqIjOLp1FHVW3d30aziISjGEGaHrr2Rm2aUARgbuaxvIEK5orXaojzPYbDuJZU3cYhAiKJlXnxdENd-Ef8ZLhJiIiJEuxQx4BhpSjHapA6Tze6_U6Hx1c1O7lwoz23pv9OWHTlaY_cNOEgVVBAh5AmdZni1-v1RQqBK38Bbg-2cP_Wa478i-bXbKT9PNPlaUwhoK4zrwwUnFabt6fLovQs3Ck5Pyq4sQ6VYUdsej9WA=&vjs=3&p=1&fvj=1",
            "id": "sja1"
          },
          {
            "title": "Sr. Software Engineer (Backend/Cloud/Full Stack)",
            "subTitle": "Keep Security-El Dorado Hills, CA",
            "metadataHeader": "",
            "description": "Keeper Security is transforming the way businesses and individuals protect their passwords and sensitive digital assets to significantly reduce cyber theft. As the leading password security platform, Keeper helps millions of people and thousands of b",
            "href": "https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0AOYHvoLvwy_q5fyq5i7wVxEO11w3x-IAabnJO8E9QLALWwLihp99hk4w7Q54t-JTCIvrFovQQxROeEVYTZZQeuNN8wZHixKWJuITA0pixVOWqgco_Se4SY7Crt9GxQAdkkrBB0eguuo3e5h1TsJ4ttV3rCDfYd59QMzyIv5x7gV27GEew0-N-Dt_FPxNo8DD5bYaQFkp6PCfY3Mp9_5bcptyRiL_k_474sJaSMj7XrgXKHhHb2CSGBmOK-Wq71y_-MOkB-kvcL-YwOjhOzgboXRo6vvrY_9klxg3D8J9HdXIy3AvXkDl8l-50ueFR0VU61GFMs5aYUZRSFUE1QCoXtCbfgE5duNyEEJhgKuOXkp3OPFXGeVjUgmyVyUl25nba7F2bOqNdCm_Qwy3vprAGMAnq_Qutr6iTgqmKW6i9rAmQ35kOV-o8M2bxHeCO0vF-yltD4AfWfcH6mlnrdLlwlFy81-oJHehmDOQvzdiDka9UoylsWdtUVaAzw76UqHVr0FIZ268Bdfci3L0Noo6V8Sq1QGPKwIZzgK2vpxwpZFg==&vjs=3&p=2&fvj=0",
            "id": "sja2"
          }
        ]
      }
      this.changeView = this.changeView.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  render() {
    return (
      <div>
        <div className='nav'>
          <span 
            className={this.state.view === 'jobs' ? 'nav-selected' : 'nav-unselected'}
            onClick={() => this.changeView('jobs')}>
            Jobs
          </span>
          <span 
            className={this.state.view === 'applied' ? 'nav-selected' : 'nav-unselected'}
            onClick={() => this.changeView('applied')}>
            Applied
          </span>
          <span 
            className={this.state.view === 'aboutMe' ? 'nav-selected' : 'nav-unselected'}
            onClick={() => this.changeView('aboutMe')}>
            About Me
          </span>
        </div>

        <div className="main">
          {this.state.view === 'jobs'
            ? <JobCards jobsList={this.state.jobsList}/>
            : this.state.view ==='applied' 
            ? <Applied/>
            : <AboutMe/>
          }
        </div>
      </div>
    )
  }
}

export default App;
