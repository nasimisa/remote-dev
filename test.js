axios
  .get('https://remotive.io/api/remote-jobs')
  .then(function (response) {
    console.log(response.data.jobs[0].description);
    let job = response.data.jobs[0];
    let imgUrl = `https://remotive.io/web/image/hr.job/${job.id}/logo/64x64`;

    document.querySelector('.job-description').innerHTML = `
    <img src="${imgUrl}" alt="">
    `;
  })
  .catch(function (error) {
    console.log(error);
  });
