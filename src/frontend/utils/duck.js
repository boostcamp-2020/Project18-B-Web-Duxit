const Duck = ({ color = '#efff00', width = '50' }) => {
  let stroke = '5px';
  if (width > 200) stroke = '3px';
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 297.02" width=${width}>
        <defs>
            <style>.cls-2{fill:#212121;}.cls-3{fill:#efefef;}.cls-4{fill:#ff6700;}.cls-5{fill:none;stroke:#111;}</style>
        </defs>
        <g id="레이어_2" data-name="레이어 2">
            <g id="레이어_1-2" data-name="레이어 1">
            <path class="cls-1" style="fill:${color};stroke:#121212;stroke-miterlimit:10;stroke-width:${stroke};" d="M247,199c-4.59-19.27-17.65-42.82-27-41.53a95,95,0,0,0-31.71-29.94c14.1-13.44,22.71-31.33,22.71-51,0-41.7-38.73-75.5-86.5-75.5s-86.5,33.8-86.5,75.5c0,19.67,8.62,37.58,22.74,51a99.18,99.18,0,0,0-32.11,29.94c-9.33-.39-22,22.66-26.51,41.57-2.85,12,.46,25.17,5.62,34.09,3.07,48.61,46.88,63.47,117.26,62.89,74.74-.61,108.78-14.26,113.53-58.66C245.13,228.81,250.31,213.07,247,199Z"/>
            <ellipse class="cls-2" cx="175.56" cy="62.31" rx="11.04" ry="14.31" transform="translate(-9.78 43.48) rotate(-13.74)"/>
            <ellipse class="cls-3" cx="172.43" cy="58.5" rx="3" ry="4"/><ellipse class="cls-2" cx="78.56" cy="61.31" rx="14.31" ry="11.04" transform="translate(0.34 123.06) rotate(-76.26)"/>
            <ellipse class="cls-3" cx="81.69" cy="57.5" rx="3" ry="4"/><path class="cls-4" d="M123.43,76.5c-7.32-.25-14.5,7.75-21,15-2,2.17-3.66,4.35-7,6-5.3,2.62-9.25,1.22-10,3-1,2.36,4.66,7.81,11,11,5.84,3,11,3.3,21,4a97.2,97.2,0,0,0,17,0c10.55-1,16.59-3.42,18-4,1.26-.53,11.57-4.8,11-8-.3-1.65-3.39-2.54-5-3-3.81-1.09-5.33.08-8-1-2.15-.86-3-2.35-5-5a99.51,99.51,0,0,0-9-10C132.35,80.55,128.35,76.67,123.43,76.5Z"/>
            <path class="cls-5" style="stroke-miterlimit:10;stroke-width:${stroke};" d="M12.43,236.5c38.61-7.49,18.88-74.1,20-71"/>
            <path class="cls-5" style="stroke-miterlimit:10;stroke-width:${stroke};" d="M231.48,236.5c-38.61-7.49-18.87-74.1-20-71"/>
            </g>
        </g>
    </svg>
    `;
};

export default Duck;
