// Dáta pre kvíz – stavba bunky (obsahuje vstavané vektorové obrázky, funguje okamžite bez externých súborov)
window.QUIZ_DATA = {
  prokaryot: {
    title: 'Prokaryotická bunka',
    w: 960,
    h: 580,
    file: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 580" width="960" height="580">
        <rect width="960" height="580" fill="#ffffff"/>
        <!-- Capsule -->
        <rect x="255" y="165" width="420" height="240" rx="120" fill="#d9ead3" stroke="#6aa84f" stroke-width="8"/>
        <!-- Cell wall -->
        <rect x="270" y="180" width="390" height="210" rx="105" fill="#fff2cc" stroke="#d6b656" stroke-width="6"/>
        <!-- Plasma membrane -->
        <rect x="283" y="193" width="364" height="184" rx="92" fill="#e8f4fd" stroke="#3d85c6" stroke-width="4"/>
        <!-- Pili -->
        <g stroke="#6aa84f" stroke-width="3" stroke-linecap="round">
          <line x1="330" y1="165" x2="315" y2="138"/><line x1="390" y1="165" x2="385" y2="135"/>
          <line x1="465" y1="165" x2="465" y2="134"/><line x1="540" y1="165" x2="548" y2="135"/>
          <line x1="600" y1="165" x2="615" y2="138"/><line x1="330" y1="405" x2="315" y2="432"/>
          <line x1="400" y1="405" x2="395" y2="435"/><line x1="480" y1="405" x2="480" y2="435"/>
          <line x1="560" y1="405" x2="568" y2="432"/>
        </g>
        <!-- Flagellum -->
        <path d="M 675 285 Q 735 235, 795 285 T 915 285" fill="none" stroke="#6aa84f" stroke-width="7" stroke-linecap="round"/>
        <!-- Nucleoid -->
        <path d="M 380 265 C 360 230, 440 220, 455 255 C 470 290, 405 315, 435 335 C 465 355, 535 320, 515 280 C 495 240, 550 235, 540 275 C 530 315, 460 285, 420 275 Z" fill="none" stroke="#8e7cc3" stroke-width="5" stroke-linecap="round"/>
        <!-- Plasmid -->
        <circle cx="585" cy="255" r="18" fill="none" stroke="#cc0000" stroke-width="4"/>
        <!-- Ribosomes -->
        <g fill="#333333">
          <circle cx="335" cy="250" r="4"/><circle cx="350" cy="310" r="4"/><circle cx="395" cy="340" r="4"/>
          <circle cx="485" cy="225" r="4"/><circle cx="570" cy="325" r="4"/><circle cx="605" cy="295" r="4"/>
        </g>
        <!-- Pointer lines -->
        <g stroke="#334155" stroke-width="2">
          <line x1="205" y1="95" x2="315" y2="145"/>
          <line x1="205" y1="185" x2="262" y2="215"/>
          <line x1="205" y1="280" x2="274" y2="280"/>
          <line x1="205" y1="375" x2="286" y2="335"/>
          <line x1="205" y1="470" x2="335" y2="312"/>
          <line x1="745" y1="95" x2="475" y2="245"/>
          <line x1="745" y1="185" x2="585" y2="242"/>
          <line x1="745" y1="385" x2="545" y2="335"/>
          <line x1="745" y1="475" x2="795" y2="285"/>
        </g>
      </svg>
    `),
    items: [
      { id: 'p_fimbrie', text: 'Fimbrie (pili)', alias: ['fimbrie', 'pili'], x: 25, y: 75, w: 180, h: 36 },
      { id: 'p_puzdro', text: 'Puzdro (kapsula)', alias: ['puzdro', 'kapsula', 'slizove puzdro'], x: 25, y: 165, w: 180, h: 36 },
      { id: 'p_stena', text: 'Bunková stena', alias: ['stena'], x: 25, y: 260, w: 180, h: 36 },
      { id: 'p_membrana', text: 'Cytoplazmatická membrána', alias: ['plazmaticka membrana', 'membrana'], x: 25, y: 355, w: 180, h: 42 },
      { id: 'p_ribozomy', text: 'Ribozómy', alias: ['ribozom'], x: 25, y: 452, w: 180, h: 36 },
      { id: 'p_nukleoid', text: 'Nukleoid', alias: ['jadra', 'kruhova dna', 'bakterialny chromozom'], x: 745, y: 75, w: 190, h: 36 },
      { id: 'p_plazmid', text: 'Plazmid', alias: ['plazmidy'], x: 745, y: 165, w: 190, h: 36 },
      { id: 'p_cytoplazma', text: 'Cytoplazma', alias: ['cytozol'], x: 745, y: 365, w: 190, h: 36 },
      { id: 'p_bicik', text: 'Bičík', alias: ['flagellum'], x: 745, y: 455, w: 190, h: 36 },
    ],
  },

  rastlinna: {
    title: 'Rastlinná bunka',
    w: 960,
    h: 620,
    file: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 620" width="960" height="620">
        <rect width="960" height="620" fill="#ffffff"/>
        <!-- Cell wall -->
        <polygon points="310,95 650,95 725,210 725,410 650,525 310,525 235,410 235,210" fill="#b6d7a8" stroke="#38761d" stroke-width="8"/>
        <!-- Plasma membrane -->
        <polygon points="318,108 642,108 712,216 712,404 642,512 318,512 248,404 248,216" fill="#edf7ed" stroke="#6aa84f" stroke-width="4"/>
        <!-- Central vacuole -->
        <path d="M 430 230 C 490 215, 635 235, 645 315 C 655 395, 575 455, 495 445 C 425 435, 405 310, 430 230 Z" fill="#cfe2f3" stroke="#3d85c6" stroke-width="3"/>
        <!-- Nucleus -->
        <circle cx="345" cy="245" r="56" fill="#e8dff5" stroke="#674ea7" stroke-width="4"/>
        <circle cx="345" cy="245" r="20" fill="#8e7cc3"/>
        <!-- ER -->
        <path d="M 285 195 Q 345 160, 405 195 M 280 180 Q 345 142, 410 180" fill="none" stroke="#a64d79" stroke-width="4" stroke-linecap="round"/>
        <!-- Chloroplasts -->
        <ellipse cx="320" cy="395" rx="38" ry="20" transform="rotate(-20 320 395)" fill="#6aa84f" stroke="#274e13" stroke-width="3"/>
        <ellipse cx="620" cy="180" rx="36" ry="19" transform="rotate(25 620 180)" fill="#6aa84f" stroke="#274e13" stroke-width="3"/>
        <!-- Mitochondrion -->
        <ellipse cx="420" cy="465" rx="34" ry="17" fill="#f6b26b" stroke="#b45f06" stroke-width="3"/>
        <!-- Golgi -->
        <path d="M 540 155 Q 570 145, 600 155 M 535 168 Q 570 158, 605 168 M 542 181 Q 570 171, 598 181" fill="none" stroke="#e69138" stroke-width="4" stroke-linecap="round"/>
        <!-- Pointer lines -->
        <g stroke="#334155" stroke-width="2">
          <line x1="205" y1="80" x2="295" y2="115"/>
          <line x1="205" y1="165" x2="262" y2="195"/>
          <line x1="205" y1="255" x2="325" y2="245"/>
          <line x1="205" y1="345" x2="305" y2="180"/>
          <line x1="205" y1="435" x2="310" y2="395"/>
          <line x1="205" y1="525" x2="395" y2="465"/>
          <line x1="755" y1="110" x2="595" y2="160"/>
          <line x1="755" y1="240" x2="625" y2="185"/>
          <line x1="755" y1="370" x2="585" y2="345"/>
          <line x1="755" y1="500" x2="665" y2="430"/>
        </g>
      </svg>
    `),
    items: [
      { id: 'r_stena', text: 'Bunková stena', alias: ['stena'], x: 20, y: 60, w: 185, h: 36 },
      { id: 'r_membrana', text: 'Cytoplazmatická membrána', alias: ['plazmaticka membrana', 'membrana'], x: 20, y: 145, w: 185, h: 42 },
      { id: 'r_jadro', text: 'Jadro (s jadierkom)', alias: ['jadro', 'nukleus'], x: 20, y: 235, w: 185, h: 36 },
      { id: 'r_er', text: 'Endoplazmatické retikulum', alias: ['er'], x: 20, y: 325, w: 185, h: 42 },
      { id: 'r_chloroplast', text: 'Chloroplast', alias: ['chloroplasty', 'plastid'], x: 20, y: 415, w: 185, h: 36 },
      { id: 'r_mitochondria', text: 'Mitochondria', alias: ['mitochondrie'], x: 20, y: 505, w: 185, h: 36 },
      { id: 'r_golgi', text: 'Golgiho aparát', alias: ['golgiho komplex'], x: 755, y: 90, w: 185, h: 36 },
      { id: 'r_ribozomy', text: 'Ribozómy', alias: ['ribozom'], x: 755, y: 220, w: 185, h: 36 },
      { id: 'r_vakuola', text: 'Vakuola', alias: ['centralna vakuola'], x: 755, y: 350, w: 185, h: 36 },
      { id: 'r_cytoplazma', text: 'Cytoplazma', alias: ['cytozol'], x: 755, y: 480, w: 185, h: 36 },
    ],
  },

  zivocisna: {
    title: 'Živočíšna bunka',
    w: 960,
    h: 620,
    file: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 620" width="960" height="620">
        <rect width="960" height="620" fill="#ffffff"/>
        <!-- Plasma membrane -->
        <path d="M 320 135 C 440 85, 620 105, 690 215 C 750 310, 710 475, 585 515 C 460 555, 295 510, 255 395 C 215 280, 235 170, 320 135 Z" fill="#fef4ec" stroke="#e06666" stroke-width="6"/>
        <!-- Nucleus -->
        <circle cx="475" cy="300" r="72" fill="#e8dff5" stroke="#674ea7" stroke-width="5"/>
        <circle cx="475" cy="300" r="24" fill="#8e7cc3"/>
        <!-- ER -->
        <path d="M 395 255 Q 375 300, 395 345 M 378 245 Q 355 300, 378 355 M 555 255 Q 575 300, 555 345" fill="none" stroke="#a64d79" stroke-width="4" stroke-linecap="round"/>
        <!-- Mitochondria -->
        <ellipse cx="345" cy="420" rx="40" ry="20" transform="rotate(25 345 420)" fill="#f6b26b" stroke="#b45f06" stroke-width="3"/>
        <ellipse cx="615" cy="390" rx="38" ry="19" transform="rotate(-30 615 390)" fill="#f6b26b" stroke="#b45f06" stroke-width="3"/>
        <!-- Golgi -->
        <path d="M 520 165 Q 560 150, 600 165 M 515 180 Q 560 165, 605 180 M 522 195 Q 560 180, 598 195" fill="none" stroke="#e69138" stroke-width="4" stroke-linecap="round"/>
        <!-- Lysosome -->
        <circle cx="330" cy="210" r="18" fill="#ffd966" stroke="#bf9000" stroke-width="3"/>
        <!-- Centrosome -->
        <g fill="#3d85c6">
          <rect x="575" y="245" width="22" height="8" rx="2"/>
          <rect x="582" y="238" width="8" height="22" rx="2"/>
        </g>
        <!-- Pointer lines -->
        <g stroke="#334155" stroke-width="2">
          <line x1="205" y1="95" x2="290" y2="155"/>
          <line x1="205" y1="195" x2="330" y2="210"/>
          <line x1="205" y1="295" x2="375" y2="295"/>
          <line x1="205" y1="395" x2="345" y2="420"/>
          <line x1="205" y1="495" x2="440" y2="470"/>
          <line x1="755" y1="115" x2="585" y2="175"/>
          <line x1="755" y1="225" x2="595" y2="250"/>
          <line x1="755" y1="335" x2="520" y2="300"/>
          <line x1="755" y1="455" x2="645" y2="430"/>
        </g>
      </svg>
    `),
    items: [
      { id: 'z_membrana', text: 'Cytoplazmatická membrána', alias: ['plazmaticka membrana', 'membrana'], x: 20, y: 75, w: 185, h: 42 },
      { id: 'z_lyzozom', text: 'Lyzozóm', alias: ['lyzozomy'], x: 20, y: 175, w: 185, h: 36 },
      { id: 'z_er', text: 'Endoplazmatické retikulum', alias: ['er'], x: 20, y: 275, w: 185, h: 42 },
      { id: 'z_mitochondria', text: 'Mitochondria', alias: ['mitochondrie'], x: 20, y: 375, w: 185, h: 36 },
      { id: 'z_ribozomy', text: 'Ribozómy', alias: ['ribozom'], x: 20, y: 475, w: 185, h: 36 },
      { id: 'z_golgi', text: 'Golgiho aparát', alias: ['golgiho komplex'], x: 755, y: 95, w: 185, h: 36 },
      { id: 'z_centrozom', text: 'Centrozóm', alias: ['centrioly'], x: 755, y: 205, w: 185, h: 36 },
      { id: 'z_jadro', text: 'Jadro (s jadierkom)', alias: ['jadro', 'nukleus'], x: 755, y: 315, w: 185, h: 36 },
      { id: 'z_cytoplazma', text: 'Cytoplazma', alias: ['cytozol'], x: 755, y: 435, w: 185, h: 36 },
    ],
  },
};
