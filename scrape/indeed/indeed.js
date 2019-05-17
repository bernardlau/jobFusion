const req_promise = require('request-promise');
const cheerio = require('cheerio');
const maxSearch = 3; // first three pages of each search combinatorics
const cities = ['San+Francisco%2C+CA', 'Palo+Alto%2C+CA', 'San+Jose%2C+CA', 'Sacramento%2C+CA', 'Mountain+View%2C+CA', 'Seattle%2C+WA', 'New+York%2C+NY'];
const searchTerms = ['Full+Stack+Developer', 'React+developer'];
const knex = require('../../database/knex');

var customHeaderRequest = req_promise.defaults({
  headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'}
});
var allJobs = []; // array that contains all jobs for each different combinatoric

var scrapeIndeed = async function() {
  for (let k = 0; k < searchTerms.length; k++) {
    for (let j = 0; j < cities.length; j++) {
      for (let i = 0; i < maxSearch; i++) {
        const pageNum = i * 10;
        const city = cities[j];
        const searchQuery = searchTerms[k];
        const url = `https://www.indeed.com/jobs?q=${searchQuery}&l=${city}&start=${pageNum}&sort=date`;
        await customHeaderRequest(url)
          .then((html) => {
            const jobs = [];
            for (let i = 0; i < cheerio('.title > a', html).length; i++) {
              if (cheerio('.title > a', html)[i].attribs.href.includes('pagead')) {
                continue;
              }
              var jobCard = {};
              jobCard.id = cheerio('.title > a', html)[i].attribs.id;
              jobCard.href = cheerio('.title > a', html)[i].attribs.href;
              jobs.push(jobCard);
            }
            return Promise.all(
              jobs.map( (url) => {
                return jobParse('https://www.indeed.com' + url.href, url.id);
              })
            )
          }).then((jobsDescriptions) => {
            allJobs = allJobs.concat(jobsDescriptions);
          }).catch((err) => {
            console.log('err', err);
          });
      }
    }
  }
}


const jobParse = function(url, id) {
  return customHeaderRequest(url)
    .then((html) => {
      return {
        title: cheerio('.jobsearch-JobInfoHeader-title', html).text().substring(0, 100).replace(/'/g, ""),
        subtitle: cheerio('.jobsearch-JobInfoHeader-subtitle', html).text().substring(0, 100).replace(/'/g, ""),
        metadata: cheerio('.jobsearch-JobMetadataHeader-item', html).text().substring(0, 100).replace(/'/g, ""),
        description: cheerio('#jobDescriptionText', html).text().substring(0, 250).replace(/'/g, ""),
        href: url,
        job_id: id,
        site: 'indeed',
        status: 'new'
      }
    })
    .catch((err) => {
      throw err;
    });
}

scrapeIndeed()
.then(()=> {
  knex.raw(
    `insert into jobs (title, subtitle, metadata, description, href, job_id, site, status)
    select title, subtitle, metadata, description, href, job_id, site, status
    from json_to_recordset('${JSON.stringify(allJobs)}') AS x(title text, subtitle text, metadata text, description text, href text, job_id text, site text, status text)
    on conflict (job_id, site) do nothing;`
  ).then((results) => {
    console.log('done', results);
  })
  .catch((err) => {
    console.log('insert error', err);
  })
  .finally(() => {
    return knex.destroy();
  });
})
