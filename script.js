const table = document.querySelector('.table');
const classes = [
  [['ru', 'ld'], ['rd', 'lu']],
  [['ru2' ,'ld2'], ['rd2', 'lu2']]
]

// switchPlaces(0, 1);

table.onclick = handleClick;

async function handleClick(e) {
  const thimble = e.target.closest('.thimble');

  if (!thimble || table.matches('.busy')) return;

  thimble.classList.toggle('selected');

  const indices = [];

  for (let i = 0; i < table.children.length; i++) {
    if (table.children[i].matches('.selected')) {
      indices.push(i);
    }
  }

  if (indices.length === 2) {
    table.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

    table.classList.add('busy');

    await switchPlaces(...indices);

    table.classList.remove('busy');
  }
}

async function switchPlaces(i1, i2) {
  [i1, i2] = [i1, i2].sort();

  const shift = i2 - i1 - 1;
  const path = rnd(2);
  const [class1, class2] = classes[shift][path];
  const thimble1 = table.children[i1];
  const thimble2 = table.children[i2];

  thimble1.classList.add(class1);
  thimble2.classList.add(class2);

  return new Promise(resolve => {
    thimble1.onanimationend = () => {
      thimble1.classList.remove(class1);
      thimble2.classList.remove(class2);

      const div = document.createElement('div');

      thimble1.replaceWith(div);
      thimble2.replaceWith(thimble1);
      div.replaceWith(thimble2);

      resolve();
    }
  });
}

function rnd(max) {
  return Math.floor(Math.random() * max);
}


