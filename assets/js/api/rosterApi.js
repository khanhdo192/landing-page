const rosterStart = document.querySelector('.mc-modal-roster__list');
const rosterSub = document.querySelector('.mc-modal-roster__bench');
const rosterApi = 'http://localhost:3000/startingRoster';

const runApi = () => {
  getRoster(renderRoster);
};

const getRoster = async (callback) => {
  try {
    const res = await axios.get(rosterApi);
    return callback(res.data);
  } catch (error) {
    // console.error(error);
    rosterStart.innerHTML = '<p class="mc-modal-roster__player">Starting not update</p>';
  }
};

const renderRoster = (rosters) => {
  //   console.log(rosters);
  if (rosters.length < 0) {
    return (rosterStart.innerHTML = '<p class="mc-modal-roster__player">Starting not update</p>');
  }
  const startList = rosters.filter((roster) => roster.starting === 1).slice(0, 11);
  const subList = rosters.filter((roster) => roster.starting === 0);
  //   console.log(startList, subList);

  const htmlStartList = startList.map((start) => {
    return `<p class="mc-modal-roster__player">
                <span class="mc-modal-roster__number">${start.number}.</span>${start.name}
            </p>`;
  });
  rosterStart.innerHTML = htmlStartList.join('');

  const htmlSubList = subList.map((sub) => {
    return sub.name;
  });
  rosterSub.innerHTML = htmlSubList.join(', ');
};

runApi();
